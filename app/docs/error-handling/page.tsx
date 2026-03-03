import React from "react";
import CodeBlock from "@/components/docs/CodeBlock";
import { Heading, Callout, Table } from "@/components/docs/DocsComponents";

export const metadata = {
  title: "Error Handling — AuthHero Docs",
};

export default function ErrorHandlingPage() {
  return (
    <>
      <Heading id="error-handling" level={1}>
        Error Handling
      </Heading>
      <p>
        AuthHero uses a structured error system with machine-readable error
        codes. This allows frontend applications to programmatically handle
        specific errors without parsing human-readable messages.
      </p>

      <hr />

      <Heading id="error-format" level={2}>
        Error Response Format
      </Heading>
      <p>All error responses follow the same JSON structure:</p>
      <CodeBlock language="json" filename="Error Response">
        {`{
  "success": false,
  "message": "Human-readable error description",
  "errorCode": "MACHINE_READABLE_CODE"
}`}
      </CodeBlock>
      <p>
        The <code>errorCode</code> field is only present for known operational
        errors. Unknown/unexpected errors return a generic 500 response without
        an error code.
      </p>

      <hr />

      <Heading id="error-codes" level={2}>
        Error Codes Reference
      </Heading>
      <Table
        headers={["Error Code", "HTTP Status", "When It Occurs"]}
        rows={[
          [
            "INVALID_CREDENTIALS",
            "401",
            "Email/password combination is wrong, or user doesn't exist",
          ],
          [
            "EMAIL_NOT_VERIFIED",
            "403",
            "User tries to login but hasn't verified their email yet",
          ],
          [
            "EMAIL_ALREADY_EXISTS",
            "409",
            "Registration attempted with an email that's already registered",
          ],
          [
            "TOKEN_EXPIRED",
            "401",
            "Access token, email verification, or password reset token has expired",
          ],
          [
            "TOKEN_INVALID",
            "401",
            "Token is malformed, tampered with, or doesn't exist in the database",
          ],
          [
            "TOKEN_ALREADY_USED",
            "400",
            "Email verification or password reset token has already been consumed",
          ],
          [
            "SESSION_REVOKED",
            "401",
            "Session was revoked (logout, password change, or refresh token reuse detected)",
          ],
          [
            "SESSION_EXPIRED",
            "401",
            "Refresh token session has passed its 30-day expiry",
          ],
          [
            "RATE_LIMIT_EXCEEDED",
            "429",
            "Too many requests from this IP — retry after the cooldown",
          ],
          [
            "MFA_REQUIRED",
            "403",
            "Action requires MFA verification but user hasn't completed it",
          ],
          [
            "MFA_INVALID_CODE",
            "401",
            "The TOTP code or backup code is incorrect",
          ],
          [
            "MFA_NOT_SETUP",
            "400",
            "Trying to verify/challenge MFA but it hasn't been set up yet",
          ],
          [
            "VALIDATION_FAILED",
            "400",
            "Request body failed Zod validation (missing or invalid fields)",
          ],
        ]}
      />

      <hr />

      <Heading id="how-it-works" level={2}>
        How Error Handling Works
      </Heading>

      <Heading id="app-error-class" level={3}>
        The AppError Class
      </Heading>
      <p>
        All operational errors are thrown as <code>AppError</code> instances,
        which carry a status code, message, and optional error code:
      </p>
      <CodeBlock language="typescript" filename="src/lib/AppError.ts">
        {`export class AppError extends Error {
  public readonly statusCode: httpStatusCode;
  public readonly errorCode?: AppErrorCode;

  constructor(
    statusCode: httpStatusCode,
    message: string,
    errorCode?: AppErrorCode,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}`}
      </CodeBlock>

      <Heading id="global-handler" level={3}>
        Global Error Middleware
      </Heading>
      <p>
        Express catches all errors in a centralized middleware at the end of the
        middleware chain. It distinguishes between known operational errors and
        unexpected crashes:
      </p>
      <CodeBlock
        language="typescript"
        filename="src/middlewares/error.middleware.ts"
      >
        {`export const errorMiddleware = (err, _req, res, _next) => {
  // Known operational errors
  if (err instanceof AppError) {
    // 4xx → debug log, 5xx → error log
    if (err.statusCode >= 500) {
      logger.error({ err, statusCode: err.statusCode }, err.message);
    } else {
      logger.debug({ statusCode: err.statusCode }, err.message);
    }

    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.errorCode && { errorCode: err.errorCode }),
    });
  }

  // Unknown errors — generic 500, details logged internally
  logger.error({ err }, "Unhandled error");
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};`}
      </CodeBlock>
      <Callout type="info" title="Security: no stack traces in responses">
        <p>
          Unknown errors never leak stack traces, database details, or internal
          information to the client. Full error details are logged with pino for
          debugging.
        </p>
      </Callout>

      <Heading id="async-handler" level={3}>
        Async Error Wrapping
      </Heading>
      <p>
        Every route handler is wrapped with <code>asyncHandler</code>, which
        automatically catches promise rejections and forwards them to the error
        middleware:
      </p>
      <CodeBlock language="typescript" filename="src/lib/asyncHandler.ts">
        {`export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);`}
      </CodeBlock>
      <p>
        This means you can throw <code>AppError</code> anywhere in a service
        function and it will be caught, formatted, and sent to the client
        automatically.
      </p>

      <hr />

      <Heading id="validation-errors" level={2}>
        Validation Errors
      </Heading>
      <p>
        When a request body fails Zod validation, the error middleware returns a
        structured response with the error code <code>VALIDATION_FAILED</code>
        and a clear list of invalid fields:
      </p>
      <CodeBlock language="json" filename="Response 400">
        {`{
  "success": false,
  "message": "Validation failed",
  "errorCode": "VALIDATION_FAILED",
  "errors": [
    {
      "field": "password",
      "message": "Password must be at least 8 characters"
    },
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}`}
      </CodeBlock>

      <hr />

      <Heading id="frontend-handling" level={2}>
        Handling Errors in the Frontend
      </Heading>
      <p>
        The frontend Axios instance includes an error interceptor that reads the
        structured error response. Example pattern:
      </p>
      <CodeBlock language="typescript" filename="Frontend error handling">
        {`import { AxiosError } from "axios";

try {
  await api.post("/auth/login", { email, password });
} catch (err) {
  if (err instanceof AxiosError && err.response?.data) {
    const { errorCode, message } = err.response.data;

    switch (errorCode) {
      case "EMAIL_NOT_VERIFIED":
        toast.error("Please verify your email first.");
        // Show resend verification UI
        break;

      case "INVALID_CREDENTIALS":
        toast.error("Wrong email or password.");
        break;

      case "MFA_REQUIRED":
        // Redirect to MFA challenge page
        break;

      case "RATE_LIMIT_EXCEEDED":
        toast.error("Too many attempts. Try again later.");
        break;

      default:
        toast.error(message || "Something went wrong");
    }
  }
}`}
      </CodeBlock>

      <Callout type="tip" title="Error codes are stable API contracts">
        <p>
          Use <code>errorCode</code> for programmatic branching, not the
          <code>message</code> string. Messages may be rephrased in future
          versions; error codes are permanent.
        </p>
      </Callout>
    </>
  );
}

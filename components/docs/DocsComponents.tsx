import React from "react";

interface TableProps {
  headers: string[];
  rows: string[][];
}

export function Table({ headers, rows }: TableProps) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {rows.map((row, i) => (
            <tr
              key={i}
              className="bg-white dark:bg-zinc-950"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-3 text-zinc-600 dark:text-zinc-400"
                >
                  {j === 0 ? (
                    <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                      {cell}
                    </code>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface CalloutProps {
  type?: "info" | "warning" | "danger" | "tip";
  title?: string;
  children: React.ReactNode;
}

const calloutStyles = {
  info: {
    border: "border-blue-200 dark:border-blue-900",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    icon: "💡",
    title: "border-blue-300 text-blue-800 dark:text-blue-400",
  },
  warning: {
    border: "border-amber-200 dark:border-amber-900",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    icon: "⚠️",
    title: "border-amber-300 text-amber-800 dark:text-amber-400",
  },
  danger: {
    border: "border-red-200 dark:border-red-900",
    bg: "bg-red-50 dark:bg-red-950/40",
    icon: "🚨",
    title: "border-red-300 text-red-800 dark:text-red-400",
  },
  tip: {
    border: "border-emerald-200 dark:border-emerald-900",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    icon: "✅",
    title: "border-emerald-300 text-emerald-800 dark:text-emerald-400",
  },
};

export function Callout({
  type = "info",
  title,
  children,
}: CalloutProps) {
  const style = calloutStyles[type];
  return (
    <div
      className={`my-6 rounded-lg border ${style.border} ${style.bg} p-4`}
    >
      {title && (
        <div className={`mb-2 flex items-center gap-2 font-semibold ${style.title}`}>
          <span>{style.icon}</span>
          <span>{title}</span>
        </div>
      )}
      <div className="text-sm text-zinc-700 dark:text-zinc-300">{children}</div>
    </div>
  );
}

export function Heading({
  id,
  level,
  children,
}: {
  id: string;
  level: 1 | 2 | 3 | 4;
  children: React.ReactNode;
}) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const sizes = {
    1: "text-4xl font-bold mt-0 mb-6",
    2: "text-2xl font-bold mt-12 mb-4",
    3: "text-xl font-semibold mt-8 mb-3",
    4: "text-lg font-semibold mt-6 mb-2",
  };

  return (
    <Tag
      id={id}
      className={`${sizes[level]} scroll-mt-20 text-zinc-900 dark:text-zinc-100`}
    >
      <a
        href={`#${id}`}
        className="group"
      >
        {children}
        <span className="ml-2 text-zinc-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-600">
          #
        </span>
      </a>
    </Tag>
  );
}

export function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-6 flex gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
        {number}
      </div>
      <div className="flex-1">
        <h4 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h4>
        <div className="text-zinc-600 dark:text-zinc-400">{children}</div>
      </div>
    </div>
  );
}

export function Badge({ children, color = "blue" }: { children: React.ReactNode; color?: "blue" | "green" | "amber" | "red" | "zinc" }) {
  const colors = {
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    green: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    amber: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    zinc: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
}

export function EndpointCard({
  method,
  path,
  auth,
  description,
  children,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  auth?: boolean;
  description: string;
  children?: React.ReactNode;
}) {
  const methodColors = {
    GET: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    POST: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    PUT: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    DELETE: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    PATCH: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  };

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <span
          className={`rounded px-2 py-0.5 text-xs font-bold ${methodColors[method]}`}
        >
          {method}
        </span>
        <code className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {path}
        </code>
        {auth && (
          <span className="ml-auto rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-300">
            Auth Required
          </span>
        )}
      </div>
      <div className="px-4 py-3">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
        {children}
      </div>
    </div>
  );
}

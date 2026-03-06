import React from "react";

interface TableProps {
  headers: string[];
  rows: string[][];
}

export function Table({ headers, rows }: TableProps) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-white/[0.06] not-prose">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-white/[0.06] bg-white/[0.02]">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-300"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04]">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-white/[0.02] transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-zinc-400 text-[13px]">
                  {j === 0 ? (
                    <code className="rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[12px] font-medium text-[#3ECF8E]">
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
    border: "border-blue-500/20",
    bg: "bg-blue-500/[0.05]",
    icon: "💡",
    title: "text-blue-400",
    iconBg: "bg-blue-500/10",
  },
  warning: {
    border: "border-amber-500/20",
    bg: "bg-amber-500/[0.05]",
    icon: "⚠️",
    title: "text-amber-400",
    iconBg: "bg-amber-500/10",
  },
  danger: {
    border: "border-red-500/20",
    bg: "bg-red-500/[0.05]",
    icon: "🚨",
    title: "text-red-400",
    iconBg: "bg-red-500/10",
  },
  tip: {
    border: "border-[#3ECF8E]/20",
    bg: "bg-[#3ECF8E]/[0.05]",
    icon: "✅",
    title: "text-[#3ECF8E]",
    iconBg: "bg-[#3ECF8E]/10",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const style = calloutStyles[type];
  return (
    <div
      className={`my-6 rounded-xl border ${style.border} ${style.bg} p-4 not-prose`}
    >
      {title && (
        <div
          className={`mb-2 flex items-center gap-2 text-sm font-semibold ${style.title}`}
        >
          <span>{style.icon}</span>
          <span>{title}</span>
        </div>
      )}
      <div className="text-[13px] text-zinc-300 leading-relaxed">
        {children}
      </div>
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
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  const sizes = {
    1: "text-4xl font-bold mt-0 mb-6",
    2: "text-2xl font-bold mt-12 mb-4",
    3: "text-xl font-semibold mt-8 mb-3",
    4: "text-lg font-semibold mt-6 mb-2",
  };

  return (
    <Tag id={id} className={`${sizes[level]} scroll-mt-20 text-white`}>
      <a href={`#${id}`} className="group no-underline">
        {children}
        <span className="ml-2 text-zinc-600 opacity-0 transition-opacity group-hover:opacity-100">
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
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3ECF8E]/10 border border-[#3ECF8E]/20 text-sm font-bold text-[#3ECF8E]">
        {number}
      </div>
      <div className="flex-1">
        <h4 className="mb-2 text-lg font-semibold text-white">{title}</h4>
        <div className="text-zinc-400">{children}</div>
      </div>
    </div>
  );
}

export function Badge({
  children,
  color = "blue",
}: {
  children: React.ReactNode;
  color?: "blue" | "green" | "amber" | "red" | "zinc";
}) {
  const colors = {
    blue: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    green: "bg-[#3ECF8E]/10 text-[#3ECF8E] border border-[#3ECF8E]/20",
    amber: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    red: "bg-red-500/10 text-red-400 border border-red-500/20",
    zinc: "bg-white/[0.06] text-zinc-300 border border-white/[0.08]",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[color]}`}
    >
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
  description?: string;
  children?: React.ReactNode;
}) {
  const methodColors = {
    GET: "bg-[#3ECF8E]/10 text-[#3ECF8E] border border-[#3ECF8E]/20",
    POST: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    PUT: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    DELETE: "bg-red-500/10 text-red-400 border border-red-500/20",
    PATCH: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  };

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-white/[0.06] not-prose">
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <span
          className={`rounded-md px-2 py-0.5 text-xs font-bold ${methodColors[method]}`}
        >
          {method}
        </span>
        <code className="text-sm font-semibold text-white font-mono">
          {path}
        </code>
        {auth && (
          <span className="ml-auto rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-400">
            Auth Required
          </span>
        )}
      </div>
      <div className="px-4 py-3">
        {description && (
          <p className="text-[13px] text-zinc-400">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}

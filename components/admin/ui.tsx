import type { ReactNode } from "react";

export const inputClass =
  "block w-full rounded-xl border border-brand-200 bg-white px-3.5 py-2.5 text-[15px] text-brand-950 shadow-sm outline-none transition placeholder:text-brand-900/35 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-500/15";

type FieldProps = {
  label: string;
  name: string;
  hint?: ReactNode;
  errors?: string[];
  children: ReactNode;
  className?: string;
};

export function Field({ label, name, hint, errors, children, className }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-brand-900">
        {label}
      </label>
      {children}
      {errors?.length ? (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-red-600">
          {errors[0]}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-brand-900/55">{hint}</p>
      ) : null}
    </div>
  );
}

export function Card({ title, description, children, actions }: {
  title?: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white p-5 ring-1 ring-brand-100 sm:p-6">
      {(title || actions) && (
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && <h2 className="text-lg font-semibold text-brand-950">{title}</h2>}
            {description && <p className="mt-0.5 text-sm text-brand-900/60">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function PageHeader({ title, description, actions }: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-brand-950">{title}</h1>
        {description && <p className="mt-1 text-brand-900/60">{description}</p>}
      </div>
      {actions}
    </div>
  );
}

export function Notice({ tone = "success", children }: { tone?: "success" | "error"; children: ReactNode }) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={`mb-5 rounded-xl px-4 py-3 text-sm font-medium ${
        tone === "error" ? "bg-red-50 text-red-700 ring-1 ring-red-200" : "bg-brand-50 text-brand-800 ring-1 ring-brand-200"
      }`}
    >
      {children}
    </p>
  );
}

export function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        active ? "bg-brand-50 text-brand-700" : "bg-gray-100 text-gray-500"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-brand-500" : "bg-gray-400"}`} />
      {active ? "แสดง" : "ซ่อน"}
    </span>
  );
}

export const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60";

export const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand-800 transition hover:bg-brand-50";

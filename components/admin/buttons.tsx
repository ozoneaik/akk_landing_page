"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { LuLoaderCircle, LuTrash2 } from "react-icons/lu";
import { primaryButtonClass } from "./ui";

export function SubmitButton({ children, pendingText = "กำลังบันทึก…" }: { children: ReactNode; pendingText?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={primaryButtonClass}>
      {pending && <LuLoaderCircle className="h-4 w-4 animate-spin" aria-hidden />}
      {pending ? pendingText : children}
    </button>
  );
}

// ปุ่มลบพร้อมยืนยัน — action ถูก bind id มาจากฝั่ง server แล้ว
export function DeleteButton({ action, label, compact = false }: {
  action: () => Promise<void>;
  label: string;
  compact?: boolean;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`ยืนยันการลบ "${label}"? ลบแล้วกู้คืนไม่ได้`)) e.preventDefault();
      }}
    >
      <DeleteSubmit compact={compact} label={label} />
    </form>
  );
}

function DeleteSubmit({ compact, label }: { compact: boolean; label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-label={`ลบ ${label}`}
      className={
        compact
          ? "grid h-9 w-9 place-items-center rounded-lg text-red-600 transition hover:bg-red-50 disabled:opacity-50"
          : "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
      }
    >
      {pending ? <LuLoaderCircle className="h-4 w-4 animate-spin" aria-hidden /> : <LuTrash2 className="h-4 w-4" aria-hidden />}
      {!compact && "ลบ"}
    </button>
  );
}

// สลับแสดง/ซ่อน
export function ToggleButton({ action, active }: { action: () => Promise<void>; active: boolean }) {
  return (
    <form action={action}>
      <ToggleSubmit active={active} />
    </form>
  );
}

function ToggleSubmit({ active }: { active: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      role="switch"
      aria-checked={active}
      aria-label={active ? "กำลังแสดง — กดเพื่อซ่อน" : "ซ่อนอยู่ — กดเพื่อแสดง"}
      disabled={pending}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-60 ${
        active ? "bg-brand-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
          active ? "translate-x-5.5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

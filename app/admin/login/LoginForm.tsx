"use client";

import { useActionState } from "react";
import { login } from "../actions";
import { initialFormState } from "@/lib/admin/form";
import { Field, Notice, inputClass } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/buttons";

export default function LoginForm() {
  const [state, action] = useActionState(login, initialFormState);

  return (
    <form action={action} className="mt-6 space-y-4">
      {state.message && <Notice tone="error">{state.message}</Notice>}
      <Field label="ชื่อผู้ใช้" name="username">
        <input
          id="username"
          name="username"
          autoComplete="username"
          required
          defaultValue={state.values?.username}
          className={inputClass}
        />
      </Field>
      <Field label="รหัสผ่าน" name="password">
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </Field>
      <div className="pt-2 [&>button]:w-full">
        <SubmitButton pendingText="กำลังเข้าสู่ระบบ…">เข้าสู่ระบบ</SubmitButton>
      </div>
    </form>
  );
}

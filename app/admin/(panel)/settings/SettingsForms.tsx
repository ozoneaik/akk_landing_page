"use client";

import { useActionState } from "react";
import { Card, Field, Notice, inputClass } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/buttons";
import { initialFormState } from "@/lib/admin/form";
import type { SiteInfo } from "@/lib/site";
import { changePassword, saveSiteSettings } from "./actions";

export function SiteSettingsForm({ defaults }: { defaults: SiteInfo }) {
  const [state, action] = useActionState(saveSiteSettings, initialFormState);
  const v = (name: keyof SiteInfo) => state.values?.[name] ?? defaults[name];
  const err = (name: string) => state.errors?.[name];
  const aria = (name: string) => ({
    "aria-invalid": err(name) ? true : undefined,
    "aria-describedby": err(name) ? `${name}-error` : undefined,
  });

  return (
    <form action={action}>
      <Card title="ข้อมูลร้าน" description="แสดงบนเมนู ท้ายเว็บ และใช้ในผลการค้นหา Google">
        {state.message && <Notice tone={state.ok ? "success" : "error"}>{state.message}</Notice>}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="ชื่อร้าน *" name="name" errors={err("name")}>
            <input id="name" name="name" required defaultValue={v("name")} className={inputClass} {...aria("name")} />
          </Field>
          <Field label="เบอร์โทร *" name="phone" errors={err("phone")} hint="ปุ่ม “โทรสั่งซื้อ” จะโทรเบอร์นี้">
            <input id="phone" name="phone" type="tel" required defaultValue={v("phone")} className={inputClass} {...aria("phone")} />
          </Field>
          <Field label="สโลแกน *" name="tagline" errors={err("tagline")} className="sm:col-span-2">
            <input id="tagline" name="tagline" required defaultValue={v("tagline")} className={inputClass} {...aria("tagline")} />
          </Field>
          <Field
            label="คำอธิบายร้าน (SEO) *"
            name="description"
            errors={err("description")}
            hint="แสดงใต้ชื่อเว็บในผลค้นหา Google ควรยาว 120–160 ตัวอักษร"
            className="sm:col-span-2"
          >
            <textarea id="description" name="description" rows={3} required defaultValue={v("description")} className={inputClass} {...aria("description")} />
          </Field>
          <Field label="ที่อยู่ *" name="address" errors={err("address")} className="sm:col-span-2">
            <textarea id="address" name="address" rows={2} required defaultValue={v("address")} className={inputClass} {...aria("address")} />
          </Field>
          <Field label="เวลาเปิด-ปิด *" name="hours" errors={err("hours")} className="sm:col-span-2">
            <input id="hours" name="hours" required defaultValue={v("hours")} className={inputClass} {...aria("hours")} />
          </Field>
        </div>
        <div className="mt-6 flex justify-end">
          <SubmitButton>บันทึกข้อมูลร้าน</SubmitButton>
        </div>
      </Card>
    </form>
  );
}

export function PasswordForm() {
  const [state, action] = useActionState(changePassword, initialFormState);
  const err = (name: string) => state.errors?.[name];

  return (
    <form action={action}>
      <Card title="เปลี่ยนรหัสผ่าน">
        {state.message && <Notice tone={state.ok ? "success" : "error"}>{state.message}</Notice>}
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="รหัสผ่านปัจจุบัน" name="currentPassword" errors={err("currentPassword")}>
            <input id="currentPassword" name="currentPassword" type="password" autoComplete="current-password" required className={inputClass} />
          </Field>
          <Field label="รหัสผ่านใหม่" name="newPassword" errors={err("newPassword")} hint="อย่างน้อย 8 ตัวอักษร">
            <input id="newPassword" name="newPassword" type="password" autoComplete="new-password" minLength={8} required className={inputClass} />
          </Field>
          <Field label="ยืนยันรหัสผ่านใหม่" name="confirmPassword" errors={err("confirmPassword")}>
            <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required className={inputClass} />
          </Field>
        </div>
        <div className="mt-6 flex justify-end">
          <SubmitButton>เปลี่ยนรหัสผ่าน</SubmitButton>
        </div>
      </Card>
    </form>
  );
}

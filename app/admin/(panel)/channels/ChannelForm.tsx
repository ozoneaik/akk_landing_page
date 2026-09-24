"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { Card, Field, Notice, inputClass, secondaryButtonClass } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/buttons";
import { initialFormState, type FormState } from "@/lib/admin/form";
import { PLATFORMS, PLATFORM_IDS, type PlatformId } from "@/lib/platforms";

export type ChannelFormDefaults = {
  platform: PlatformId;
  name: string;
  label: string;
  detail: string;
  href: string;
  badge: string;
  sortOrder: string;
  isActive: boolean;
};

type Props = {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  defaults: ChannelFormDefaults;
};

export default function ChannelForm({ action, defaults }: Props) {
  const [state, formAction] = useActionState(action, initialFormState);
  const v = (name: keyof ChannelFormDefaults) => state.values?.[name] ?? String(defaults[name] ?? "");
  const err = (name: string) => state.errors?.[name];
  const aria = (name: string) => ({
    "aria-invalid": err(name) ? true : undefined,
    "aria-describedby": err(name) ? `${name}-error` : undefined,
  });
  const [platform, setPlatform] = useState<PlatformId>(defaults.platform);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {state.message && <Notice tone="error">{state.message}</Notice>}

      <Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="แพลตฟอร์ม *" name="platform" errors={err("platform")} className="sm:col-span-2">
            <div className="flex items-center gap-3">
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white"
                style={{ backgroundColor: PLATFORMS[platform].color }}
              >
                <BrandIcon id={platform} className="h-5 w-5" />
              </span>
              <select
                id="platform"
                name="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value as PlatformId)}
                className={inputClass}
              >
                {PLATFORM_IDS.map((id) => (
                  <option key={id} value={id}>
                    {PLATFORMS[id].name}
                  </option>
                ))}
              </select>
            </div>
          </Field>
          <Field label="ลิงก์ *" name="href" errors={err("href")} hint="ลิงก์ร้าน/เพจ เช่น https://shopee.co.th/ชื่อร้าน" className="sm:col-span-2">
            <input id="href" name="href" type="text" inputMode="url" required placeholder="https://" defaultValue={v("href")} className={inputClass} {...aria("href")} />
          </Field>
          <Field label="ชื่อที่แสดง *" name="name" errors={err("name")}>
            <input id="name" name="name" required defaultValue={v("name")} className={inputClass} {...aria("name")} />
          </Field>
          <Field label="ป้ายกำกับ" name="badge" errors={err("badge")} hint="เช่น LIVE (เว้นว่างได้)">
            <input id="badge" name="badge" defaultValue={v("badge")} className={inputClass} {...aria("badge")} />
          </Field>
          <Field label="ข้อความปุ่ม *" name="label" errors={err("label")} hint="อ่านโดยโปรแกรมอ่านหน้าจอ" className="sm:col-span-2">
            <input id="label" name="label" required defaultValue={v("label")} className={inputClass} {...aria("label")} />
          </Field>
          <Field label="คำอธิบาย *" name="detail" errors={err("detail")} className="sm:col-span-2">
            <input id="detail" name="detail" required defaultValue={v("detail")} className={inputClass} {...aria("detail")} />
          </Field>
          <Field label="ลำดับการแสดง" name="sortOrder" errors={err("sortOrder")} hint="เลขน้อยแสดงก่อน">
            <input id="sortOrder" name="sortOrder" type="number" min={0} step={1} defaultValue={v("sortOrder")} className={inputClass} {...aria("sortOrder")} />
          </Field>
          <label className="flex items-center gap-3 self-end pb-2.5">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={state.values ? state.values.isActive === "on" : defaults.isActive}
              className="h-5 w-5 accent-brand-600"
            />
            <span className="font-medium text-brand-950">แสดงบนหน้าเว็บ</span>
          </label>
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        <Link href="/admin/channels" className={secondaryButtonClass}>
          ยกเลิก
        </Link>
        <SubmitButton>บันทึก</SubmitButton>
      </div>
    </form>
  );
}

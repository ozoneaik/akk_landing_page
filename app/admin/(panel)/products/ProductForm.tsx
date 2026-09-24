"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { Card, Field, Notice, inputClass, secondaryButtonClass } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/buttons";
import { initialFormState, type FormState } from "@/lib/admin/form";
import { PRODUCT_THEMES, PRODUCT_THEME_IDS, type ProductTheme } from "@/lib/platforms";

export type ProductFormDefaults = {
  name: string;
  category: string;
  description: string;
  price: string;
  unit: string;
  tag: string;
  theme: ProductTheme;
  imageUrl: string;
  orderUrl: string;
  detailUrl: string;
  sortOrder: string;
  isActive: boolean;
  currentImage: string | null; // รูปที่อัปโหลดไว้แล้ว
};

type Props = {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  defaults: ProductFormDefaults;
};

export default function ProductForm({ action, defaults }: Props) {
  const [state, formAction] = useActionState(action, initialFormState);
  const v = (name: keyof ProductFormDefaults) => state.values?.[name] ?? String(defaults[name] ?? "");
  const err = (name: string) => state.errors?.[name];
  const aria = (name: string) => ({
    "aria-invalid": err(name) ? true : undefined,
    "aria-describedby": err(name) ? `${name}-error` : undefined,
  });

  // พรีวิวรูปก่อนบันทึก
  const [preview, setPreview] = useState<string | null>(null);
  const [theme, setTheme] = useState<ProductTheme>(defaults.theme);
  const [removeImage, setRemoveImage] = useState(false);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const shownImage = preview ?? (removeImage ? null : defaults.currentImage);

  return (
    <form action={formAction} className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        {state.message && <Notice tone="error">{state.message}</Notice>}

        <Card title="ข้อมูลสินค้า">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="ชื่อสินค้า *" name="name" errors={err("name")} className="sm:col-span-2">
              <input id="name" name="name" required defaultValue={v("name")} className={inputClass} {...aria("name")} />
            </Field>
            <Field label="หมวดหมู่ *" name="category" errors={err("category")} hint="แสดงเหนือชื่อสินค้า" className="sm:col-span-2">
              <input id="category" name="category" required defaultValue={v("category")} className={inputClass} {...aria("category")} />
            </Field>
            <Field label="รายละเอียด *" name="description" errors={err("description")} className="sm:col-span-2">
              <textarea id="description" name="description" rows={4} required defaultValue={v("description")} className={inputClass} {...aria("description")} />
            </Field>
            <Field label="ราคาเริ่มต้น (บาท) *" name="price" errors={err("price")}>
              <input id="price" name="price" type="number" min={0} step={1} inputMode="numeric" required defaultValue={v("price")} className={inputClass} {...aria("price")} />
            </Field>
            <Field label="หน่วย *" name="unit" errors={err("unit")} hint="เช่น ขวด ถุง ชิ้น">
              <input id="unit" name="unit" required defaultValue={v("unit")} className={inputClass} {...aria("unit")} />
            </Field>
            <Field label="ป้ายกำกับ" name="tag" errors={err("tag")} hint="เช่น ขายดี แนะนำ (เว้นว่างได้)">
              <input id="tag" name="tag" defaultValue={v("tag")} className={inputClass} {...aria("tag")} />
            </Field>
            <Field label="ลำดับการแสดง" name="sortOrder" errors={err("sortOrder")} hint="เลขน้อยแสดงก่อน">
              <input id="sortOrder" name="sortOrder" type="number" min={0} step={1} defaultValue={v("sortOrder")} className={inputClass} {...aria("sortOrder")} />
            </Field>
          </div>
        </Card>

        <Card title="ลิงก์ปุ่ม" description="เว้นว่างเพื่อใช้ลิงก์ Shopee และ LINE ของร้านจากหน้า ช่องทางติดต่อ">
          <div className="grid gap-4">
            <Field label="ลิงก์ปุ่ม “สั่งซื้อ”" name="orderUrl" errors={err("orderUrl")}>
              <input id="orderUrl" name="orderUrl" type="url" placeholder="https://shopee.co.th/..." defaultValue={v("orderUrl")} className={inputClass} {...aria("orderUrl")} />
            </Field>
            <Field label="ลิงก์ปุ่ม “ดูรายละเอียด”" name="detailUrl" errors={err("detailUrl")}>
              <input id="detailUrl" name="detailUrl" type="url" placeholder="https://line.me/..." defaultValue={v("detailUrl")} className={inputClass} {...aria("detailUrl")} />
            </Field>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card title="รูปสินค้า">
          <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-brand-100">
            {shownImage ? (
              // eslint-disable-next-line @next/next/no-img-element -- พรีวิวจาก blob: ใช้ next/image ไม่ได้
              <img src={shownImage} alt="พรีวิวรูปสินค้า" className="h-full w-full object-cover" />
            ) : (
              <ProductImage theme={theme} label="ภาพจำลอง" />
            )}
          </div>
          <div className="space-y-4">
            <Field label="อัปโหลดรูป" name="image" errors={err("image")} hint="JPG, PNG, WEBP ไม่เกิน 5MB">
              <input
                id="image"
                name="image"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setPreview(file ? URL.createObjectURL(file) : null);
                }}
                className="block w-full text-sm text-brand-900/70 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-brand-700 hover:file:bg-brand-100"
              />
            </Field>
            {defaults.currentImage && !preview && (
              <label className="flex items-center gap-2 text-sm text-brand-900/80">
                <input type="checkbox" name="removeImage" checked={removeImage} onChange={(e) => setRemoveImage(e.target.checked)} className="h-4 w-4 accent-brand-600" />
                ลบรูปที่อัปโหลดไว้
              </label>
            )}
            <Field label="หรือใช้ลิงก์รูปภายนอก" name="imageUrl" errors={err("imageUrl")} hint="ใช้เมื่อไม่ได้อัปโหลดรูป">
              <input id="imageUrl" name="imageUrl" type="url" placeholder="https://..." defaultValue={v("imageUrl")} className={inputClass} {...aria("imageUrl")} />
            </Field>
            <Field label="ภาพจำลอง (เมื่อไม่มีรูป)" name="theme" errors={err("theme")}>
              <select id="theme" name="theme" value={theme} onChange={(e) => setTheme(e.target.value as ProductTheme)} className={inputClass}>
                {PRODUCT_THEME_IDS.map((id) => (
                  <option key={id} value={id}>
                    {PRODUCT_THEMES[id]}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </Card>

        <Card>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={state.values ? state.values.isActive === "on" : defaults.isActive}
              className="mt-0.5 h-5 w-5 accent-brand-600"
            />
            <span>
              <span className="block font-medium text-brand-950">แสดงบนหน้าเว็บ</span>
              <span className="text-sm text-brand-900/60">ไม่ติ๊ก = ซ่อนไว้ก่อน</span>
            </span>
          </label>
          <div className="mt-5 flex gap-3 [&>*]:flex-1">
            <Link href="/admin/products" className={secondaryButtonClass}>
              ยกเลิก
            </Link>
            <SubmitButton>บันทึก</SubmitButton>
          </div>
        </Card>
      </div>
    </form>
  );
}

import { z } from "zod";

// state ที่ server action ส่งกลับให้ฟอร์ม (useActionState)
export type FormState = {
  ok?: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
  values?: Record<string, string>;
};

export const initialFormState: FormState = {};

// เก็บค่าที่กรอกไว้ เพื่อแสดงกลับในฟอร์มเมื่อบันทึกไม่ผ่าน
export function formValues(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && !key.startsWith("$")) values[key] = value;
  }
  return values;
}

export function invalid(error: z.ZodError, formData: FormData): FormState {
  return {
    ok: false,
    message: "กรุณาตรวจสอบข้อมูลที่กรอก",
    errors: z.flattenError(error).fieldErrors as FormState["errors"],
    values: formValues(formData),
  };
}

// ── ตัวช่วยสร้าง schema ────────────────────────────────────

export const requiredText = (label: string, max = 200) =>
  z
    .string()
    .trim()
    .min(1, `กรุณากรอก${label}`)
    .max(max, `${label}ยาวเกิน ${max} ตัวอักษร`);

export const optionalText = (max = 200) =>
  z
    .string()
    .trim()
    .max(max, `ยาวเกิน ${max} ตัวอักษร`)
    .transform((v) => v || null);

// อนุญาตเฉพาะลิงก์ที่ปลอดภัย (กัน javascript: ฯลฯ)
const SAFE_LINK = /^(https?:\/\/|tel:|mailto:)/i;

export const requiredLink = z
  .string()
  .trim()
  .min(1, "กรุณากรอกลิงก์")
  .max(500, "ลิงก์ยาวเกินไป")
  .refine((v) => SAFE_LINK.test(v), "ลิงก์ต้องขึ้นต้นด้วย https://, tel: หรือ mailto:");

export const optionalLink = z
  .string()
  .trim()
  .max(500, "ลิงก์ยาวเกินไป")
  .refine((v) => v === "" || SAFE_LINK.test(v), "ลิงก์ต้องขึ้นต้นด้วย https://, tel: หรือ mailto:")
  .transform((v) => v || null);

export const sortOrder = z.coerce
  .number({ message: "ต้องเป็นตัวเลข" })
  .int("ต้องเป็นจำนวนเต็ม")
  .min(0, "ต้องไม่ติดลบ")
  .max(9999, "มากเกินไป");

// checkbox ส่งค่า "on" เมื่อถูกติ๊ก และไม่ส่งอะไรเลยเมื่อไม่ติ๊ก
export const checkbox = z
  .string()
  .optional()
  .transform((v) => v === "on");

export const idSchema = z.coerce.number().int().positive();

"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { formValues, invalid, requiredText, type FormState } from "@/lib/admin/form";

const siteSchema = z.object({
  name: requiredText("ชื่อร้าน", 60),
  tagline: requiredText("สโลแกน", 120),
  description: requiredText("คำอธิบายร้าน", 400),
  phone: requiredText("เบอร์โทร", 30).regex(/^[\d\s+\-()]+$/, "เบอร์โทรใส่ได้เฉพาะตัวเลข - + ( )"),
  address: requiredText("ที่อยู่", 300),
  hours: requiredText("เวลาเปิด-ปิด", 80),
});

export async function saveSiteSettings(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const parsed = siteSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error, formData);

  await db.siteSetting.upsert({
    where: { id: 1 },
    update: parsed.data,
    create: { id: 1, ...parsed.data },
  });

  revalidatePath("/");
  revalidatePath("/admin", "layout");
  return { ok: true, message: "บันทึกข้อมูลร้านเรียบร้อยแล้ว", values: formValues(formData) };
}

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "กรุณากรอกรหัสผ่านปัจจุบัน"),
    newPassword: z.string().min(8, "รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร").max(200),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "รหัสผ่านใหม่ทั้งสองช่องไม่ตรงกัน",
  });

export async function changePassword(_prev: FormState, formData: FormData): Promise<FormState> {
  const admin = await requireAdmin();

  const parsed = passwordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    // ไม่ส่งรหัสผ่านกลับไปที่ฟอร์ม
    return { ...invalid(parsed.error, formData), values: undefined };
  }

  const user = await db.adminUser.findUniqueOrThrow({ where: { id: admin.id } });
  if (!(await bcrypt.compare(parsed.data.currentPassword, user.passwordHash))) {
    return { ok: false, message: "รหัสผ่านปัจจุบันไม่ถูกต้อง", errors: { currentPassword: ["รหัสผ่านปัจจุบันไม่ถูกต้อง"] } };
  }

  await db.adminUser.update({
    where: { id: user.id },
    data: { passwordHash: await bcrypt.hash(parsed.data.newPassword, 12) },
  });
  return { ok: true, message: "เปลี่ยนรหัสผ่านเรียบร้อยแล้ว" };
}

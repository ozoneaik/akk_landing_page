"use server";

import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { createSession, destroySession } from "@/lib/auth";
import { clearFailures, isLocked, recordFailure } from "@/lib/admin/rate-limit";
import type { FormState } from "@/lib/admin/form";

const loginSchema = z.object({
  username: z.string().trim().min(1, "กรุณากรอกชื่อผู้ใช้").max(100),
  password: z.string().min(1, "กรุณากรอกรหัสผ่าน").max(200),
});

// hash หลอกไว้เทียบเมื่อไม่พบผู้ใช้ ให้เวลาตอบสนองเท่ากัน (กันเดาชื่อผู้ใช้)
let dummyHash: string | undefined;
const getDummyHash = () => (dummyHash ??= bcrypt.hashSync("not-a-real-password", 12));

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, message: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน", values: { username: String(formData.get("username") ?? "") } };
  }
  const { username, password } = parsed.data;

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const key = `${ip}:${username.toLowerCase()}`;
  if (isLocked(key)) {
    return { ok: false, message: "ล็อกอินผิดหลายครั้งเกินไป กรุณารอ 15 นาทีแล้วลองใหม่", values: { username } };
  }

  const user = await db.adminUser.findUnique({ where: { username } });
  const valid = await bcrypt.compare(password, user?.passwordHash ?? getDummyHash());
  if (!user || !valid) {
    recordFailure(key);
    return { ok: false, message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง", values: { username } };
  }

  clearFailures(key);
  await createSession(user.id, user.username);
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

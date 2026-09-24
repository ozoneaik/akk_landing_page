"use server";

import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { createSession, destroySession } from "@/lib/auth";
import { clearFailures, isLocked, recordFailure, type LimitKey } from "@/lib/admin/rate-limit";
import type { FormState } from "@/lib/admin/form";

const loginSchema = z.object({
  username: z.string().trim().min(1, "กรุณากรอกชื่อผู้ใช้").max(100),
  password: z.string().min(1, "กรุณากรอกรหัสผ่าน").max(200),
});

// hash หลอกไว้เทียบเมื่อไม่พบผู้ใช้ ให้เวลาตอบสนองเท่ากัน (กันเดาชื่อผู้ใช้)
let dummyHash: string | undefined;
const getDummyHash = () => (dummyHash ??= bcrypt.hashSync("not-a-real-password", 12));

// นับครั้งที่ผิดต่อชื่อผู้ใช้เสมอ (ปลอมไม่ได้ ต่างจาก IP) และต่อ IP เมื่ออยู่หลัง reverse proxy ที่เชื่อถือได้
// x-forwarded-for ฝั่งผู้ใช้ส่งมาเองได้ — อ่านเฉพาะเมื่อตั้ง TRUST_PROXY=true (proxy เขียนทับ header นี้ให้)
async function loginLimits(username: string): Promise<LimitKey[]> {
  const limits: LimitKey[] = [{ key: `user:${username.toLowerCase()}`, max: 10 }];
  if (process.env.TRUST_PROXY === "true") {
    const ip = (await headers()).get("x-forwarded-for")?.split(",").at(-1)?.trim();
    if (ip) limits.push({ key: `ip:${ip}`, max: 20 });
  }
  return limits;
}

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, message: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน", values: { username: String(formData.get("username") ?? "") } };
  }
  const { username, password } = parsed.data;

  const limits = await loginLimits(username);
  if (isLocked(limits)) {
    return { ok: false, message: "ล็อกอินผิดหลายครั้งเกินไป กรุณารอ 15 นาทีแล้วลองใหม่", values: { username } };
  }

  const user = await db.adminUser.findUnique({ where: { username } });
  const valid = await bcrypt.compare(password, user?.passwordHash ?? getDummyHash());
  if (!user || !valid) {
    recordFailure(limits);
    return { ok: false, message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง", values: { username } };
  }

  clearFailures(limits);
  await createSession(user.id, user.username, user.sessionVersion);
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

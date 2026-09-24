import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "./db";
import { SESSION_COOKIE, SESSION_MAX_AGE, signSession, verifySession } from "./session";

export async function createSession(userId: number, username: string, version: number) {
  const token = await signSession({ userId, username, version });
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

// ตรวจ session + ยืนยันว่าผู้ใช้ยังอยู่ในฐานข้อมูลและ session ยังไม่ถูกยกเลิก — เรียกในทุกหน้าและทุก server action ของหลังบ้าน
export async function requireAdmin() {
  const jar = await cookies();
  const session = await verifySession(jar.get(SESSION_COOKIE)?.value);
  if (!session) redirect("/admin/login");

  const user = await db.adminUser.findUnique({
    where: { id: session.userId },
    select: { id: true, username: true, sessionVersion: true },
  });
  // ไม่พบผู้ใช้ หรือเปลี่ยนรหัสผ่านไปแล้วหลังจาก session นี้ถูกสร้าง
  if (!user || user.sessionVersion !== session.version) redirect("/admin/login");

  return { id: user.id, username: user.username };
}

import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "./db";
import { SESSION_COOKIE, SESSION_MAX_AGE, signSession, verifySession } from "./session";

export async function createSession(userId: number, username: string) {
  const token = await signSession({ userId, username });
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

// ตรวจ session + ยืนยันว่าผู้ใช้ยังอยู่ในฐานข้อมูล — เรียกในทุกหน้าและทุก server action ของหลังบ้าน
export async function requireAdmin() {
  const jar = await cookies();
  const session = await verifySession(jar.get(SESSION_COOKIE)?.value);
  if (!session) redirect("/admin/login");

  const user = await db.adminUser.findUnique({
    where: { id: session.userId },
    select: { id: true, username: true },
  });
  if (!user) redirect("/admin/login");

  return user;
}

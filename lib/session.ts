import { SignJWT, jwtVerify } from "jose";

// ใช้ได้ทั้งใน proxy.ts และฝั่ง server (ไม่แตะฐานข้อมูล)
export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 วัน

// version ต้องตรงกับ AdminUser.sessionVersion (ตรวจใน requireAdmin)
export type SessionPayload = { userId: number; username: string; version: number };

function secretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET ต้องยาวอย่างน้อย 32 ตัวอักษร (สุ่มด้วย: openssl rand -base64 32)");
  }
  return new TextEncoder().encode(secret);
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ username: payload.username, ver: payload.version })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(payload.userId))
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secretKey());
}

export async function verifySession(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ["HS256"] });
    const userId = Number(payload.sub);
    const version = payload.ver;
    if (!Number.isInteger(userId) || typeof payload.username !== "string" || !Number.isInteger(version)) return null;
    return { userId, username: payload.username, version: version as number };
  } catch {
    return null;
  }
}

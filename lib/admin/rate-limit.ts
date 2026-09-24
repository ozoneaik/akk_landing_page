import "server-only";

// จำกัดจำนวนครั้งที่ล็อกอินผิด (เก็บในหน่วยความจำ — เพียงพอสำหรับเซิร์ฟเวอร์เครื่องเดียว)
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ENTRIES = 10_000; // กันหน่วยความจำโตไม่จำกัดเมื่อมีคนสุ่มชื่อผู้ใช้/IP

const failures = new Map<string, { count: number; resetAt: number }>();

export type LimitKey = { key: string; max: number };

function activeEntry(key: string, now: number) {
  const entry = failures.get(key);
  if (entry && now > entry.resetAt) {
    failures.delete(key);
    return undefined;
  }
  return entry;
}

function prune(now: number) {
  for (const [key, entry] of failures) {
    if (now > entry.resetAt) failures.delete(key);
  }
  // ยังเต็มอยู่ → ทิ้งรายการที่เก่าที่สุด (Map เรียงตามลำดับที่ใส่)
  for (const key of failures.keys()) {
    if (failures.size < MAX_ENTRIES) break;
    failures.delete(key);
  }
}

export function isLocked(keys: LimitKey[]): boolean {
  const now = Date.now();
  return keys.some(({ key, max }) => (activeEntry(key, now)?.count ?? 0) >= max);
}

export function recordFailure(keys: LimitKey[]) {
  const now = Date.now();
  for (const { key } of keys) {
    const entry = activeEntry(key, now);
    if (entry) {
      entry.count += 1;
    } else {
      if (failures.size >= MAX_ENTRIES) prune(now);
      failures.set(key, { count: 1, resetAt: now + WINDOW_MS });
    }
  }
}

export function clearFailures(keys: LimitKey[]) {
  for (const { key } of keys) failures.delete(key);
}

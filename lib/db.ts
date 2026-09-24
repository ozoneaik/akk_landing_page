import "server-only";
import { createClient } from "./db-client";

// ใช้ client เดียวตลอด (กันการสร้าง connection ซ้ำตอน hot reload ใน dev)
const globalForPrisma = globalThis as unknown as { prisma?: ReturnType<typeof createClient> };

export const db = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

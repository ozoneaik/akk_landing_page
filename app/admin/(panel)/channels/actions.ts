"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { PLATFORM_IDS } from "@/lib/platforms";
import {
  checkbox,
  idSchema,
  invalid,
  optionalText,
  requiredLink,
  requiredText,
  sortOrder,
  type FormState,
} from "@/lib/admin/form";

const channelSchema = z.object({
  platform: z.enum(PLATFORM_IDS, { message: "เลือกแพลตฟอร์ม" }),
  name: requiredText("ชื่อที่แสดง", 50),
  label: requiredText("ข้อความปุ่ม", 80),
  detail: requiredText("คำอธิบาย", 160),
  href: requiredLink,
  badge: optionalText(12),
  sortOrder,
  isActive: checkbox,
});

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

export async function saveChannel(channelId: number | null, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const parsed = channelSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error, formData);

  if (channelId) {
    const id = idSchema.parse(channelId);
    const exists = await db.channel.count({ where: { id } });
    if (!exists) return { ok: false, message: "ไม่พบช่องทางนี้ อาจถูกลบไปแล้ว" };
    await db.channel.update({ where: { id }, data: parsed.data });
  } else {
    await db.channel.create({ data: parsed.data });
  }

  refresh();
  redirect(`/admin/channels?saved=${channelId ? "updated" : "created"}`);
}

export async function toggleChannel(channelId: number) {
  await requireAdmin();
  const id = idSchema.parse(channelId);
  const channel = await db.channel.findUnique({ where: { id }, select: { isActive: true } });
  if (!channel) return;
  await db.channel.update({ where: { id }, data: { isActive: !channel.isActive } });
  refresh();
}

export async function deleteChannel(channelId: number) {
  await requireAdmin();
  const id = idSchema.parse(channelId);
  await db.channel.deleteMany({ where: { id } });
  refresh();
  redirect("/admin/channels?saved=deleted");
}

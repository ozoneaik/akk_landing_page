"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { PRODUCT_THEME_IDS } from "@/lib/platforms";
import { readImage } from "@/lib/admin/images";
import {
  checkbox,
  formValues,
  idSchema,
  invalid,
  optionalLink,
  optionalText,
  requiredText,
  sortOrder,
  type FormState,
} from "@/lib/admin/form";

const productSchema = z.object({
  name: requiredText("ชื่อสินค้า", 120),
  category: requiredText("หมวดหมู่", 120),
  description: requiredText("รายละเอียด", 1000),
  price: z.coerce
    .number({ message: "ราคาต้องเป็นตัวเลข" })
    .int("ราคาต้องเป็นจำนวนเต็ม (บาท)")
    .min(0, "ราคาต้องไม่ติดลบ")
    .max(10_000_000, "ราคาสูงเกินไป"),
  unit: requiredText("หน่วย", 30),
  tag: optionalText(30),
  theme: z.enum(PRODUCT_THEME_IDS, { message: "เลือกภาพจำลอง" }),
  imageUrl: optionalLink.refine((v) => v === null || /^https:\/\//i.test(v), "ลิงก์รูปต้องขึ้นต้นด้วย https://"),
  orderUrl: optionalLink,
  detailUrl: optionalLink,
  sortOrder,
  isActive: checkbox,
  removeImage: checkbox,
});

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

// ลบรูปเก่าที่ไม่มีสินค้าไหนใช้แล้ว
async function deleteUnusedUpload(uploadId: number | null) {
  if (!uploadId) return;
  const inUse = await db.product.count({ where: { imageId: uploadId } });
  if (inUse === 0) await db.upload.delete({ where: { id: uploadId } }).catch(() => {});
}

export async function saveProduct(productId: number | null, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const parsed = productSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error, formData);

  const image = await readImage(formData.get("image"));
  if (image.kind === "error") {
    return { ok: false, message: image.message, errors: { image: [image.message] }, values: formValues(formData) };
  }

  const { removeImage, ...data } = parsed.data;
  const existing = productId ? await db.product.findUnique({ where: { id: productId } }) : null;
  if (productId && !existing) return { ok: false, message: "ไม่พบสินค้านี้ อาจถูกลบไปแล้ว" };

  let imageId = existing?.imageId ?? null;
  if (image.kind === "image") {
    const upload = await db.upload.create({
      data: { mimeType: image.mimeType, size: image.data.byteLength, data: image.data },
    });
    imageId = upload.id;
  } else if (removeImage) {
    imageId = null;
  }

  if (existing) {
    await db.product.update({ where: { id: existing.id }, data: { ...data, imageId } });
    if (existing.imageId !== imageId) await deleteUnusedUpload(existing.imageId);
  } else {
    await db.product.create({ data: { ...data, imageId } });
  }

  refresh();
  redirect(`/admin/products?saved=${existing ? "updated" : "created"}`);
}

export async function toggleProduct(productId: number) {
  await requireAdmin();
  const id = idSchema.parse(productId);
  const product = await db.product.findUnique({ where: { id }, select: { isActive: true } });
  if (!product) return;
  await db.product.update({ where: { id }, data: { isActive: !product.isActive } });
  refresh();
}

export async function deleteProduct(productId: number) {
  await requireAdmin();
  const id = idSchema.parse(productId);
  const product = await db.product.findUnique({ where: { id }, select: { imageId: true } });
  if (!product) return;
  await db.product.delete({ where: { id } });
  await deleteUnusedUpload(product.imageId);
  refresh();
  redirect("/admin/products?saved=deleted");
}

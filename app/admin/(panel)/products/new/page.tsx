import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/ui";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import ProductForm from "../ProductForm";
import { saveProduct } from "../actions";

export const metadata: Metadata = { title: "เพิ่มสินค้า" };

export default async function NewProductPage() {
  await requireAdmin();
  const last = await db.product.aggregate({ _max: { sortOrder: true } });

  return (
    <>
      <PageHeader title="เพิ่มสินค้า" />
      <ProductForm
        action={saveProduct.bind(null, null)}
        defaults={{
          name: "",
          category: "",
          description: "",
          price: "",
          unit: "",
          tag: "",
          theme: "chemical",
          imageUrl: "",
          orderUrl: "",
          detailUrl: "",
          sortOrder: String((last._max.sortOrder ?? 0) + 1),
          isActive: true,
          currentImage: null,
        }}
      />
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { LuShoppingCart, LuArrowUpRight } from "react-icons/lu";
import ProductImage from "./ProductImage";
import type { ProductView } from "@/lib/site";

const priceFormat = new Intl.NumberFormat("th-TH");

type ProductCardProps = {
  product: ProductView;
  orderHref: string;
  detailHref: string;
  index?: number;
  className?: string;
};

export default function ProductCard({
  product,
  orderHref,
  detailHref,
  index = 0,
  className = "",
}: ProductCardProps) {
  const headingId = `product-${product.id}`;

  return (
    <motion.article
      aria-labelledby={headingId}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className={`group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(17,66,42,0.06),0_12px_32px_-16px_rgba(17,66,42,0.22)] ring-1 ring-brand-100 transition-shadow duration-300 hover:shadow-[0_2px_4px_rgba(17,66,42,0.06),0_28px_48px_-20px_rgba(17,66,42,0.35)] ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
          <ProductImage theme={product.theme} label={product.name} image={product.image} />
        </div>
        {product.tag && (
          <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm">
            {product.tag}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-medium text-brand-600">{product.category}</p>
        <h3 id={headingId} className="mt-1 text-xl font-bold text-brand-950">
          {product.name}
        </h3>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-brand-900/65">{product.description}</p>

        <div className="mt-5 flex items-end justify-between border-t border-dashed border-brand-100 pt-5">
          <p className="text-sm text-brand-900/60">
            เริ่มต้น
            <span className="ml-1.5 text-2xl font-bold text-brand-800">
              ฿{priceFormat.format(product.price)}
            </span>
            <span className="ml-1">/ {product.unit}</span>
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <a
            href={detailHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-brand-100 px-4 py-2.5 text-sm font-semibold text-brand-800 transition-colors hover:border-brand-300 hover:bg-brand-50"
          >
            ดูรายละเอียด
            <LuArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={orderHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            <LuShoppingCart className="h-4 w-4" aria-hidden="true" />
            สั่งซื้อ
          </a>
        </div>
      </div>
    </motion.article>
  );
}

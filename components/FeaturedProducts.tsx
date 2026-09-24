import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import type { ChannelView, ProductView } from "@/lib/site";

type FeaturedProductsProps = { products: ProductView[]; channels: ChannelView[] };

export default function FeaturedProducts({ products, channels }: FeaturedProductsProps) {
  // ลิงก์ปุ่มเริ่มต้น เมื่อสินค้าไม่ได้กำหนดลิงก์เอง
  const byPlatform = (id: string) => channels.find((c) => c.platform === id)?.href;
  const defaultOrder = byPlatform("shopee") ?? byPlatform("lazada") ?? "#channels";
  const defaultDetail = byPlatform("line") ?? byPlatform("facebook") ?? "#contact";

  if (products.length === 0) return null;

  return (
    <section id="products" aria-labelledby="products-heading" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wider text-brand-600">สินค้าแนะนำ</p>
          <h2 id="products-heading" className="mt-2 text-3xl font-bold text-brand-950 sm:text-4xl">
            สินค้าเกษตรคุณภาพ คัดมาให้แล้ว
          </h2>
          <p className="mt-4 text-lg text-brand-900/65">
            ยากำจัดวัชพืช ปุ๋ย ฮอร์โมนพืช และอุปกรณ์การเกษตร ครบในที่เดียว
            ไม่แน่ใจว่าต้องใช้ตัวไหน ทักมาปรึกษาได้ฟรี
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              orderHref={product.orderUrl || defaultOrder}
              detailHref={product.detailUrl || defaultDetail}
              // จอขนาดกลาง (2 คอลัมน์) ถ้าการ์ดเหลือเศษใบเดียว ให้อยู่กึ่งกลาง
              className={
                products.length % 2 === 1 && i === products.length - 1
                  ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.75rem)] lg:col-span-1 lg:mx-0 lg:w-auto"
                  : ""
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

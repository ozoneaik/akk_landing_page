import { LuBadgeCheck, LuHeadset, LuTruck, LuTag } from "react-icons/lu";
import Reveal from "./Reveal";

const points = [
  { icon: LuBadgeCheck, title: "ของแท้ มีทะเบียน", text: "สินค้าจากตัวแทนจำหน่ายโดยตรง ตรวจสอบได้ทุกชิ้น" },
  { icon: LuHeadset, title: "ปรึกษาฟรี", text: "แนะนำสูตร อัตราผสม และวิธีใช้ให้เหมาะกับพืชของคุณ" },
  { icon: LuTag, title: "ราคาเป็นกันเอง", text: "ราคาส่งสำหรับเกษตรกรและร้านค้า ซื้อเยอะยิ่งคุ้ม" },
  { icon: LuTruck, title: "จัดส่งทั่วประเทศ", text: "แพ็กแน่นหนา ส่งไว มีบริการเก็บเงินปลายทาง" },
];

export default function WhyUs() {
  return (
    <section aria-labelledby="why-heading" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wider text-brand-600">ทำไมต้องออฟ กิจเกษตร</p>
          <h2 id="why-heading" className="mt-2 text-3xl font-bold text-brand-950 sm:text-4xl">
            เพื่อนคู่คิดของเกษตรกร
          </h2>
        </Reveal>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 0.08} className="rounded-3xl bg-white p-6 ring-1 ring-brand-100">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-brand-950">{title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-brand-900/65">{text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { motion, type Variants } from "framer-motion";
import { LuArrowRight, LuBadgeCheck, LuSprout, LuTruck, LuMessageCircle } from "react-icons/lu";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stats = [
  { value: "1,000+", label: "รายการสินค้า" },
  { value: "100%", label: "ของแท้ มีทะเบียน" },
  { value: "ทั่วไทย", label: "จัดส่งถึงบ้าน" },
];

export default function Hero({ hours }: { hours: string }) {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pb-24"
    >
      {/* พื้นหลังไล่เฉด */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full bg-brand-200/50 blur-3xl" />
        <div className="absolute top-60 -left-40 h-[420px] w-[420px] rounded-full bg-harvest-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(22,100,59,0.07)_1px,transparent_0)] [background-size:28px_28px]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-brand-700 backdrop-blur"
          >
            <LuSprout className="h-4 w-4" aria-hidden="true" />
            ร้านเกษตรครบวงจร ที่เกษตรกรไว้ใจ
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={item}
            className="mt-5 text-4xl leading-[1.25] font-bold text-brand-950 sm:text-5xl lg:text-[3.4rem]"
          >
            <span className="block">ออฟ กิจเกษตร</span>
            <span className="block bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
              <span className="inline-block">ผลผลิตงาม</span>{" "}
              <span className="inline-block">เริ่มที่ของดี</span>
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 max-w-xl text-lg leading-relaxed text-brand-900/70">
            ศูนย์รวม<strong className="font-semibold text-brand-800">ยากำจัดวัชพืช</strong> ยากำจัดศัตรูพืช{" "}
            <strong className="font-semibold text-brand-800">ปุ๋ย ฮอร์โมนพืช</strong> และ
            <strong className="font-semibold text-brand-800">อุปกรณ์การเกษตร</strong> ของแท้ ราคาเป็นกันเอง
            พร้อมแนะนำวิธีใช้ให้ได้ผลจริง
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <motion.a
              href="#products"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-700 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-brand-700/25 transition-colors hover:bg-brand-600"
            >
              ดูสินค้าแนะนำ
              <LuArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </motion.a>
            <motion.a
              href="#channels"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-200 bg-white px-7 py-3 text-base font-semibold text-brand-800 transition-colors hover:border-brand-400 hover:bg-brand-50"
            >
              <LuMessageCircle className="h-5 w-5" aria-hidden="true" />
              สั่งซื้อ / ปรึกษาฟรี
            </motion.a>
          </motion.div>

          <motion.dl variants={item} className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-brand-200/70 pt-6">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-bold text-brand-800">{s.value}</dd>
                <dd className="mt-0.5 text-xs text-brand-900/60 sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <HeroVisual hours={hours} />
      </div>
    </section>
  );
}

function HeroVisual({ hours }: { hours: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-md lg:max-w-none"
    >
      <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-brand-100 via-brand-50 to-harvest-400/30 shadow-2xl shadow-brand-900/15 ring-1 ring-brand-200">
        <FieldIllustration />
      </div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-3 top-10 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-xl shadow-brand-900/10 backdrop-blur sm:-left-8"
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-brand-700">
          <LuBadgeCheck className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="text-sm leading-tight">
          <span className="block font-semibold text-brand-900">ของแท้ 100%</span>
          <span className="text-brand-900/60">มีทะเบียนถูกต้อง</span>
        </span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute -right-3 bottom-12 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-xl shadow-brand-900/10 backdrop-blur sm:-right-6"
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-harvest-400/25 text-harvest-500">
          <LuTruck className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="text-sm leading-tight">
          <span className="block font-semibold text-brand-900">ส่งไว ทั่วประเทศ</span>
          <span className="text-brand-900/60">{hours.replace("เปิดทุกวัน ", "ทุกวัน ")}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}

function FieldIllustration() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label="ภาพประกอบแปลงเกษตรและต้นกล้า">
      <defs>
        <linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4bb777" />
          <stop offset="1" stopColor="#1a7d47" />
        </linearGradient>
        <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#289b5a" />
          <stop offset="1" stopColor="#145031" />
        </linearGradient>
      </defs>
      <circle cx="300" cy="96" r="44" fill="#f5c451" opacity="0.9" />
      <circle cx="300" cy="96" r="64" fill="#f5c451" opacity="0.18" />
      <path d="M0 250 Q100 190 200 230 T400 210 V400 H0Z" fill="url(#hill1)" />
      <path d="M0 300 Q120 250 230 290 T400 280 V400 H0Z" fill="url(#hill2)" />
      {/* แนวร่องแปลง */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${-40 + i * 110} 400 Q${60 + i * 70} 330 ${150 + i * 45} 300`}
          stroke="#80d29f"
          strokeOpacity="0.35"
          strokeWidth="3"
          fill="none"
        />
      ))}
      {/* ต้นกล้า */}
      <g transform="translate(200 250)">
        <path d="M0 80 V10" stroke="#11422a" strokeWidth="6" strokeLinecap="round" />
        <path d="M0 20 C0 -20 30 -45 70 -45 C70 -5 40 20 0 20Z" fill="#80d29f" />
        <path d="M0 20 C 20 -5 40 -22 62 -38" stroke="#289b5a" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M0 40 C0 5 -26 -18 -60 -18 C-60 16 -34 40 0 40Z" fill="#b3e6c3" />
        <path d="M0 40 C -18 18 -35 4 -52 -12" stroke="#4bb777" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <g opacity="0.9">
        {[
          [70, 280],
          [120, 300],
          [320, 290],
          [360, 310],
          [280, 320],
        ].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path d="M0 18 V2" stroke="#11422a" strokeWidth="3" strokeLinecap="round" />
            <path d="M0 6 C0 -6 8 -12 18 -12 C18 -2 10 6 0 6Z" fill="#b3e6c3" />
            <path d="M0 10 C0 0 -7 -6 -15 -6 C-15 3 -8 10 0 10Z" fill="#80d29f" />
          </g>
        ))}
      </g>
    </svg>
  );
}

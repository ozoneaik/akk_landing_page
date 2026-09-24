"use client";

import { motion } from "framer-motion";
import { LuArrowUpRight } from "react-icons/lu";
import BrandIcon from "./BrandIcon";
import Reveal from "./Reveal";
import type { ChannelView } from "@/lib/site";

export default function SocialLinks({ channels }: { channels: ChannelView[] }) {
  if (channels.length === 0) return null;

  return (
    <section
      id="channels"
      aria-labelledby="channels-heading"
      className="relative overflow-hidden bg-brand-900 py-20 text-white sm:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-brand-500/25 blur-3xl" />
        <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-harvest-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wider text-brand-300">ช่องทางสั่งซื้อ & ติดตาม</p>
          <h2 id="channels-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            สั่งซื้อได้ทุกช่องทางที่คุณสะดวก
          </h2>
          <p className="mt-4 text-lg text-brand-100/75">
            ช้อปออนไลน์ แชทสอบถาม หรือดูไลฟ์สดแนะนำสินค้าได้ทุกวัน
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {channels.map((c, i) => (
            <motion.li
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={i === channels.length - 1 ? "sm:col-span-2 lg:col-span-1" : undefined}
            >
              <motion.a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${c.label} (เปิดในแท็บใหม่)`}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex h-full items-center gap-4 rounded-3xl bg-white/[0.06] p-5 ring-1 ring-white/10 backdrop-blur transition-colors hover:bg-white hover:ring-white lg:flex-col lg:items-start lg:p-6"
              >
                <span
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                  style={{ backgroundColor: c.color }}
                >
                  <BrandIcon id={c.platform} className="h-7 w-7" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-white transition-colors group-hover:text-brand-950">
                      {c.name}
                    </span>
                    {c.badge && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                        </span>
                        {c.badge}
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-sm text-brand-100/70 transition-colors group-hover:text-brand-900/65">
                    {c.detail}
                  </span>
                </span>
                <LuArrowUpRight
                  className="h-5 w-5 shrink-0 text-brand-200/60 transition-all group-hover:text-brand-700 lg:absolute lg:top-6 lg:right-6"
                  aria-hidden="true"
                />
              </motion.a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

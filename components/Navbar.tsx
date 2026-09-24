"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuMenu, LuX, LuPhone } from "react-icons/lu";
import Logo from "./Logo";
import { navLinks, toTelHref } from "@/lib/site";

type NavbarProps = { siteName: string; phone: string };

export default function Navbar({ siteName, phone }: NavbarProps) {
  const phoneHref = toTelHref(phone);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-white/85 shadow-[0_1px_0_rgba(22,100,59,0.08),0_8px_24px_-12px_rgba(22,100,59,0.18)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="เมนูหลัก"
        className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <a href="#home" aria-label={`${siteName} หน้าแรก`} onClick={() => setOpen(false)}>
          <Logo name={siteName} />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative rounded-full px-4 py-2 text-[15px] font-medium text-brand-900/80 transition-colors hover:text-brand-700"
              >
                {link.label}
                <span className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-brand-500 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href={phoneHref}
          className="hidden items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-700/20 transition hover:-translate-y-0.5 hover:bg-brand-600 md:inline-flex"
        >
          <LuPhone className="h-4 w-4" aria-hidden="true" />
          โทรสั่งซื้อ
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
          className="grid h-11 w-11 place-items-center rounded-xl text-brand-800 transition hover:bg-brand-50 md:hidden"
        >
          {open ? <LuX className="h-6 w-6" /> : <LuMenu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-brand-100 md:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-brand-900 hover:bg-brand-50"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-2">
                <a
                  href={phoneHref}
                  className="flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-3 font-semibold text-white"
                >
                  <LuPhone className="h-4 w-4" aria-hidden="true" />
                  โทรสั่งซื้อ {phone}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

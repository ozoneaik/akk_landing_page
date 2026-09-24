import { LuPhone, LuMapPin, LuClock } from "react-icons/lu";
import Logo from "./Logo";
import BrandIcon from "./BrandIcon";
import { navLinks, toTelHref, type ChannelView, type SiteInfo } from "@/lib/site";

type FooterProps = { site: SiteInfo; channels: ChannelView[] };

export default function Footer({ site, channels }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" aria-labelledby="contact-heading" className="bg-brand-950 text-brand-100/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <Logo light name={site.name} />
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed">
            {site.name} จำหน่ายยากำจัดวัชพืช ยากำจัดศัตรูพืช ปุ๋ย ฮอร์โมนพืช และอุปกรณ์การเกษตรครบวงจร
            ของแท้ ราคาเป็นกันเอง
          </p>
          <ul className="mt-6 flex gap-2.5" aria-label="โซเชียลมีเดีย">
            {channels.map((c) => (
              <li key={c.id}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={c.name}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-brand-900"
                >
                  <BrandIcon id={c.platform} className="h-4.5 w-4.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="ลิงก์ด่วน">
          <h2 className="text-base font-semibold text-white">เมนู</h2>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 id="contact-heading" className="text-base font-semibold text-white">
            ติดต่อเรา
          </h2>
          <address className="mt-4 space-y-3.5 not-italic">
            <a href={toTelHref(site.phone)} className="flex items-start gap-3 transition-colors hover:text-white">
              <LuPhone className="mt-1 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
              {site.phone}
            </a>
            <p className="flex items-start gap-3">
              <LuMapPin className="mt-1 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
              {site.address}
            </p>
            <p className="flex items-start gap-3">
              <LuClock className="mt-1 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
              {site.hours}
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-brand-100/50 sm:px-6">
          © {year} {site.name} สงวนลิขสิทธิ์ทุกประการ
        </p>
      </div>
    </footer>
  );
}

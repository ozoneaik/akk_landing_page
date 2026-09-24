type LogoProps = { light?: boolean; name?: string };

export default function Logo({ light = false, name = "ออฟ กิจเกษตร" }: LogoProps) {
    return (
        <span className="flex items-center gap-2.5">
            <svg viewBox="0 0 64 64" className="h-10 w-10 shrink-0" aria-hidden="true">
                <rect width="64" height="64" rx="16" fill={light ? "#ffffff" : "#16643b"} />
                <path d="M32 50V30" stroke={light ? "#16643b" : "#d8f3df"} strokeWidth="4" strokeLinecap="round" />
                <path d="M32 32c0-9 6-16 16-17 0 10-6 17-16 17Z" fill={light ? "#289b5a" : "#80d29f"} />
                <path d="M32 38c0-8-5-14-14-15 0 9 5 15 14 15Z" fill="#f5c451" />
            </svg>
            <span className="leading-tight">
                <span className={`block text-lg font-bold ${light ? "text-white" : "text-brand-800"}`}>
                    {name}
                </span>
                <span className={`block text-[11px] tracking-wide ${light ? "text-brand-200" : "text-brand-600"}`}>
                    ครบเรื่องเกษตร ใส่ใจทุกไร่
                </span>
            </span>
        </span>
    );
}

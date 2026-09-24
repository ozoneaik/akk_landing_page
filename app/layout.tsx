import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Prompt } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const prompt = Prompt({
    subsets: ["thai", "latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-prompt",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "ออฟ กิจเกษตร",
        template: "%s | ออฟ กิจเกษตร",
    },
    keywords: [
        "ออฟ กิจเกษตร",
        "ร้านออฟกิจเกษตร",
        "ยากำจัดวัชพืช",
        "ยาฆ่าหญ้า",
        "ยากำจัดศัตรูพืช",
        "ยาฆ่าแมลง",
        "ปุ๋ย ฮอร์โมนพืช",
        "ปุ๋ย",
        "ฮอร์โมนพืช",
        "อุปกรณ์การเกษตร",
        "เครื่องมือการเกษตร",
        "เคมีภัณฑ์การเกษตร",
        "ร้านขายของเกษตร",
    ],
    category: "agriculture",
    alternates: {
        canonical: "/",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
};

export const viewport: Viewport = {
    themeColor: "#16643b",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="th" className={prompt.variable}>
            <body className="font-sans">{children}</body>
        </html>
    );
}

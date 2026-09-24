import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { getSiteInfo } from "@/lib/data";
import { PasswordForm, SiteSettingsForm } from "./SettingsForms";

export const metadata: Metadata = { title: "ข้อมูลร้าน" };

export default async function SettingsPage() {
  await requireAdmin();
  const site = await getSiteInfo();

  return (
    <>
      <PageHeader title="ข้อมูลร้าน & บัญชี" />
      <div className="space-y-6">
        <SiteSettingsForm defaults={site} />
        <PasswordForm />
      </div>
    </>
  );
}

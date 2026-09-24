import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/ui";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import ChannelForm from "../ChannelForm";
import { saveChannel } from "../actions";

export const metadata: Metadata = { title: "เพิ่มช่องทาง" };

export default async function NewChannelPage() {
  await requireAdmin();
  const last = await db.channel.aggregate({ _max: { sortOrder: true } });

  return (
    <>
      <PageHeader title="เพิ่มช่องทาง" />
      <ChannelForm
        action={saveChannel.bind(null, null)}
        defaults={{
          platform: "shopee",
          name: "",
          label: "",
          detail: "",
          href: "",
          badge: "",
          sortOrder: String((last._max.sortOrder ?? 0) + 1),
          isActive: true,
        }}
      />
    </>
  );
}

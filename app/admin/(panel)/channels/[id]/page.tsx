import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DeleteButton } from "@/components/admin/buttons";
import { PageHeader } from "@/components/admin/ui";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { isPlatformId } from "@/lib/platforms";
import ChannelForm from "../ChannelForm";
import { deleteChannel, saveChannel } from "../actions";

export const metadata: Metadata = { title: "แก้ไขช่องทาง" };

export default async function EditChannelPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) notFound();

  const c = await db.channel.findUnique({ where: { id } });
  if (!c) notFound();

  return (
    <>
      <PageHeader
        title="แก้ไขช่องทาง"
        description={c.name}
        actions={<DeleteButton action={deleteChannel.bind(null, c.id)} label={c.name} />}
      />
      <ChannelForm
        action={saveChannel.bind(null, c.id)}
        defaults={{
          platform: isPlatformId(c.platform) ? c.platform : "website",
          name: c.name,
          label: c.label,
          detail: c.detail,
          href: c.href,
          badge: c.badge ?? "",
          sortOrder: String(c.sortOrder),
          isActive: c.isActive,
        }}
      />
    </>
  );
}

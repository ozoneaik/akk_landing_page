import { db } from "@/lib/db";

// แสดงรูปที่อัปโหลดจากหลังบ้าน (เก็บในฐานข้อมูล)
export async function GET(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const uploadId = Number(id);
  if (!Number.isInteger(uploadId) || uploadId <= 0) {
    return new Response("Not found", { status: 404 });
  }

  const upload = await db.upload.findUnique({ where: { id: uploadId } });
  if (!upload) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(upload.data), {
    headers: {
      "Content-Type": upload.mimeType,
      "Content-Length": String(upload.size),
      // รูปแต่ละ id ไม่เปลี่ยน (อัปรูปใหม่ = id ใหม่) จึง cache ได้ยาว
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

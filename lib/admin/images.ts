import "server-only";

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB

// ตรวจชนิดไฟล์จากเนื้อไฟล์จริง (ไม่เชื่อนามสกุลหรือ content-type ที่ browser ส่งมา)
function sniffImageType(bytes: Uint8Array): string | null {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "image/png";
  const ascii = (from: number, to: number) => String.fromCharCode(...bytes.slice(from, to));
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "image/webp";
  if (ascii(0, 4) === "GIF8") return "image/gif";
  return null;
}

export type ImageResult =
  | { kind: "none" }
  | { kind: "error"; message: string }
  | { kind: "image"; mimeType: string; data: Uint8Array<ArrayBuffer> };

export async function readImage(value: FormDataEntryValue | null): Promise<ImageResult> {
  if (!(value instanceof File) || value.size === 0) return { kind: "none" };
  if (value.size > MAX_IMAGE_BYTES) {
    return { kind: "error", message: "รูปใหญ่เกิน 5MB — ลองย่อรูปก่อนอัปโหลด" };
  }
  const data = new Uint8Array(await value.arrayBuffer());
  const mimeType = sniffImageType(data);
  if (!mimeType) {
    return { kind: "error", message: "รองรับเฉพาะไฟล์ JPG, PNG, WEBP หรือ GIF" };
  }
  return { kind: "image", mimeType, data };
}

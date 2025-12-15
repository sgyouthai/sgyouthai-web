import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const secret = req.headers.get("x-revalidate-secret");
  if (
    !process.env.REVALIDATE_SECRET ||
    secret !== process.env.REVALIDATE_SECRET
  ) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { tag, path } = (await req.json().catch(() => ({}))) as {
    tag?: string;
    path?: string;
  };

  if (tag) revalidateTag(tag);
  if (path) revalidatePath(path);

  return NextResponse.json({ ok: true, revalidated: { tag, path } });
}

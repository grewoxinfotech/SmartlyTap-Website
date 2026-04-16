import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ cardId: string }> }
) {
  const { cardId } = await params;
  const base =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  const upstream = await fetch(`${base}/r/${encodeURIComponent(cardId)}`, {
    redirect: "manual",
    cache: "no-store",
  });

  // If backend wants to redirect (DIRECT mode), expose redirect url to client.
  if (upstream.status >= 300 && upstream.status < 400) {
    const location = upstream.headers.get("location");
    if (!location) {
      return NextResponse.json(
        { ok: false, message: "Missing redirect location" },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true, mode: "redirect", url: location });
  }

  const json = await upstream.json().catch(() => null);
  if (!json) {
    return NextResponse.json(
      { ok: false, message: "Invalid upstream response" },
      { status: 502 }
    );
  }

  return NextResponse.json(json, { status: upstream.status });
}


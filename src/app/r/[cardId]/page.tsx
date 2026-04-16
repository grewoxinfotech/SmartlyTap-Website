"use client";

import * as React from "react";
import Link from "next/link";
import {
  Camera,
  ExternalLink,
  MessageCircle,
  Phone,
  Share2,
  Star,
} from "lucide-react";
import { useParams } from "next/navigation";

type SmartLink = { type: string; url: string; label?: string; order?: number };
type SmartPayload = {
  cardUid: string;
  user: { id: string; name: string } | null;
  profile: any;
  links: SmartLink[];
};

function iconFor(type: string) {
  const t = type.toLowerCase();
  if (t === "whatsapp") return <MessageCircle className="h-5 w-5" />;
  if (t === "instagram") return <Camera className="h-5 w-5" />;
  if (t === "google_review") return <Star className="h-5 w-5" />;
  return <ExternalLink className="h-5 w-5" />;
}

function pillClass(type: string) {
  const t = type.toLowerCase();
  if (t === "whatsapp")
    return "bg-[#25D366] text-white hover:bg-[#128C7E]";
  if (t === "instagram")
    return "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:opacity-95";
  if (t === "google_review")
    return "bg-white text-[#111827] border border-[#E5E7EB] hover:bg-[#F9FAFB]";
  return "bg-[#111827] text-white hover:bg-black";
}

export default function NfcSmartProfilePage() {
  const params = useParams<{ cardId: string }>();
  const cardId = params.cardId;

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>("");
  const [payload, setPayload] = React.useState<SmartPayload | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError("");
      setPayload(null);
      try {
        const res = await fetch(`/api/nfc/${encodeURIComponent(cardId)}`, {
          cache: "no-store",
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data?.message || "Failed to load");

        if (data?.mode === "redirect" && data?.url) {
          window.location.href = data.url;
          return;
        }

        // backend response shape: { ok: true, data: {...} }
        const smart = data?.data as SmartPayload | undefined;
        if (!smart?.cardUid) throw new Error("Invalid card payload");
        if (!cancelled) setPayload(smart);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Card not found");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (cardId) run();
    return () => {
      cancelled = true;
    };
  }, [cardId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl border border-[#E5E7EB] bg-white p-10 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <div className="h-20 rounded-2xl bg-[#EEF2FF] animate-pulse" />
          <div className="mt-6 h-5 w-2/3 rounded bg-[#E5E7EB]/60 animate-pulse" />
          <div className="mt-3 h-4 w-1/2 rounded bg-[#E5E7EB]/60 animate-pulse" />
          <div className="mt-8 space-y-3">
            <div className="h-12 rounded-2xl bg-[#E5E7EB]/60 animate-pulse" />
            <div className="h-12 rounded-2xl bg-[#E5E7EB]/60 animate-pulse" />
            <div className="h-12 rounded-2xl bg-[#E5E7EB]/60 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !payload) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl border border-[#FECACA] bg-white p-10 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <div className="text-sm font-semibold text-[#111827]">
            Card not found
          </div>
          <div className="mt-2 text-sm text-[#6B7280]">
            {error || "This card is inactive or doesn’t exist."}
          </div>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4338CA]"
            >
              Back to SmartlyTap
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const name = payload.user?.name || "SmartlyTap Profile";
  const title = payload.profile?.title || "Tap to connect";
  const bio = payload.profile?.bio || "";

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-10 px-4">
      <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-[0_14px_30px_rgba(0,0,0,0.08)]">
        <div className="relative">
          <div className="h-28 bg-gradient-to-r from-[#4F46E5] via-[#3B82F6] to-[#22C55E]" />
          <div className="absolute left-1/2 top-14 -translate-x-1/2">
            <div className="grid h-28 w-28 place-items-center rounded-full bg-white shadow-[0_10px_24px_rgba(0,0,0,0.10)] ring-1 ring-[#E5E7EB]">
              <div className="grid h-24 w-24 place-items-center rounded-full bg-[#EEF2FF] text-4xl font-semibold text-[#4F46E5] ring-1 ring-[#C7D2FE]">
                {name.slice(0, 1).toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pt-20 pb-6 text-center">
          <div className="text-2xl font-semibold tracking-tight text-[#111827]">
            {name}
          </div>
          <div className="mt-1 text-sm font-medium text-[#6B7280]">{title}</div>
          {bio ? (
            <p className="mt-4 text-sm text-[#374151] leading-relaxed">{bio}</p>
          ) : null}

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button className="rounded-2xl border border-[#E5E7EB] bg-white p-3 text-[#111827] shadow-sm transition-all hover:-translate-y-[1px] hover:bg-[#F9FAFB]">
              <Phone className="mx-auto h-5 w-5 text-[#4F46E5]" />
              <div className="mt-2 text-xs font-semibold">Call</div>
            </button>
            <button className="rounded-2xl border border-[#E5E7EB] bg-white p-3 text-[#111827] shadow-sm transition-all hover:-translate-y-[1px] hover:bg-[#F9FAFB]">
              <MessageCircle className="mx-auto h-5 w-5 text-[#22C55E]" />
              <div className="mt-2 text-xs font-semibold">WhatsApp</div>
            </button>
            <button className="rounded-2xl border border-[#E5E7EB] bg-white p-3 text-[#111827] shadow-sm transition-all hover:-translate-y-[1px] hover:bg-[#F9FAFB]">
              <Share2 className="mx-auto h-5 w-5 text-[#3B82F6]" />
              <div className="mt-2 text-xs font-semibold">Share</div>
            </button>
          </div>

          <div className="mt-8 space-y-3 text-left">
            {(payload.links || []).length ? (
              payload.links.map((l, idx) => (
                <a
                  key={`${l.type}-${idx}`}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-3 rounded-2xl px-4 py-4 text-sm font-semibold transition-all hover:-translate-y-[1px] hover:shadow-md ${pillClass(
                    l.type
                  )}`}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 ring-1 ring-white/20">
                    {iconFor(l.type)}
                  </span>
                  <span className="flex-1">
                    {l.label || l.type.replaceAll("_", " ").toUpperCase()}
                  </span>
                  <ExternalLink className="h-4 w-4 opacity-80" />
                </a>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-[#E5E7EB] bg-[#F9FAFB] p-6 text-center text-sm text-[#6B7280]">
                No links configured yet.
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-[#E5E7EB] bg-[#F9FAFB] px-6 py-4 text-center text-xs text-[#6B7280]">
          Powered by <span className="font-semibold text-[#111827]">SmartlyTap</span>
        </div>
      </div>
    </div>
  );
}


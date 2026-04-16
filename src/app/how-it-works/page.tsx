import Link from "next/link";
import { ArrowRight, QrCode, Smartphone, UserRoundCheck } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#111827]">
            How SmartlyTap Works
          </h1>
          <p className="mt-4 text-lg text-[#6B7280]">
            Tap. Open. Connect. No app required.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-[#4F46E5] px-6 py-3 text-sm font-semibold text-white hover:bg-[#4338CA]"
            >
              Buy now <ArrowRight className="ml-2 inline h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-[#E5E7EB] bg-white px-6 py-3 text-sm font-semibold text-[#111827] hover:bg-[#F9FAFB]"
            >
              Create profile
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <Smartphone className="h-6 w-6" />,
              title: "1. Tap the card",
              desc: "Customer taps your NFC card or scans the QR code.",
              tone: "from-[#EEF2FF] to-white text-[#4F46E5]",
            },
            {
              icon: <QrCode className="h-6 w-6" />,
              title: "2. Profile opens",
              desc: "Your digital profile opens instantly in the browser.",
              tone: "from-[#EFF6FF] to-white text-[#3B82F6]",
            },
            {
              icon: <UserRoundCheck className="h-6 w-6" />,
              title: "3. They connect",
              desc: "Save contact, WhatsApp, reviews, socials — one tap away.",
              tone: "from-[#ECFDF5] to-white text-[#22C55E]",
            },
          ].map((s) => (
            <div
              key={s.title}
              className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`grid h-12 w-12 place-items-center rounded-2xl border border-[#E5E7EB] bg-gradient-to-br ${s.tone}`}
              >
                {s.icon}
              </div>
              <div className="mt-4 text-lg font-bold text-[#111827]">
                {s.title}
              </div>
              <div className="mt-2 text-sm text-[#6B7280]">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


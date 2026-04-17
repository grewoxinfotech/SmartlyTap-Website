import Link from "next/link";
import { ArrowRight, QrCode, Smartphone, UserRoundCheck } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background text-primary-dark">
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="h1-std mb-4">
            How SmartlyTap Works
          </h1>
          <p className="p-std text-base max-w-2xl mx-auto">
            Tap. Open. Connect. The fastest way to share your professional world without apps or friction.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/shop"
              className="btn-primary-std px-8 py-3.5 text-base"
            >
              Get Your Card <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="btn-secondary-std px-8 py-3.5 text-base"
            >
              Create Profile
            </Link>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <Smartphone className="h-6 w-6" />,
              title: "1. Tap the card",
              desc: "Customer taps your NFC card or scans the QR code.",
              tone: "from-primary/10 to-transparent text-primary outline-primary/5",
            },
            {
              icon: <QrCode className="h-6 w-6" />,
              title: "2. Profile opens",
              desc: "Your digital profile opens instantly in the browser.",
              tone: "from-accent/10 to-transparent text-accent outline-accent/5",
            },
            {
              icon: <UserRoundCheck className="h-6 w-6" />,
              title: "3. They connect",
              desc: "Save contact, WhatsApp, reviews, socials — one tap away.",
              tone: "from-green-500/10 to-transparent text-green-600 outline-green-500/5",
            },
          ].map((s) => (
            <div
              key={s.title}
              className="card-hover-std p-8 text-center flex flex-col items-center"
            >
              <div
                className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${s.tone} mb-6 shadow-inner border border-white outline outline-4`}
              >
                {s.icon}
              </div>
              <h3 className="h3-std text-xl mb-3">
                {s.title}
              </h3>
              <p className="p-std text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


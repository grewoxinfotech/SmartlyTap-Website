import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="h1-std mb-4">
            About SmartlyTap
          </h1>
          <p className="p-std text-base max-w-2xl mx-auto">
            We help businesses replace paper cards with a modern NFC + smart profile experience. Our mission is to digitize networking across India.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/shop"
              className="btn-primary-std px-8 py-3.5 text-base"
            >
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="btn-secondary-std px-8 py-3.5 text-base"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <Sparkles className="h-6 w-6" />,
              title: "Premium experience",
              desc: "Clean, fast, mobile-first profile pages with modern UI.",
              tone: "from-primary/10 to-transparent text-primary",
            },
            {
              icon: <Users className="h-6 w-6" />,
              title: "Built for teams",
              desc: "Admin + reseller panels designed for scale and operations.",
              tone: "from-accent/10 to-transparent text-accent",
            },
            {
              icon: <ShieldCheck className="h-6 w-6" />,
              title: "Reliable tracking",
              desc: "Taps and clicks analytics so you can measure engagement.",
              tone: "from-green-500/10 to-transparent text-green-600",
            },
          ].map((s) => (
            <div
              key={s.title}
              className="card-hover-std p-8 text-center flex flex-col items-center"
            >
              <div
                className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${s.tone} mb-6 shadow-inner border border-white`}
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


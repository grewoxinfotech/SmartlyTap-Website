export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#111827]">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-[#6B7280]">
          This is a starter policy page. Replace with your legal copy.
        </p>

        <div className="mt-10 space-y-6 rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <section>
            <h2 className="text-lg font-bold text-[#111827]">1. Data we collect</h2>
            <p className="mt-2 text-sm text-[#374151]">
              Account details (name, email), and usage events like taps/clicks for analytics.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#111827]">2. How we use data</h2>
            <p className="mt-2 text-sm text-[#374151]">
              To provide the service, improve performance, and support your profile sharing.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#111827]">3. Contact</h2>
            <p className="mt-2 text-sm text-[#374151]">
              For privacy requests, contact support@smartlytap.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


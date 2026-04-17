export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <h1 className="h1-std mb-4">
          Privacy Policy
        </h1>
        <p className="p-std text-base mb-10 opacity-70">
          Last updated: April 16, 2026. This policy explains how we handle your personal data.
        </p>

        <div className="card-std space-y-8 !p-8">
          <section>
            <h2 className="h2-std !text-lg mb-3">1. Data we collect</h2>
            <p className="p-std text-xs leading-relaxed">
              Account details (name, email), and usage events like taps/clicks for analytics. We only store what's necessary to provide our NFC services.
            </p>
          </section>
          <section>
            <h2 className="h2-std !text-lg mb-3">2. How we use data</h2>
            <p className="p-std text-xs leading-relaxed">
              To provide the service, improve performance, and support your profile sharing. We do not sell your data to third parties.
            </p>
          </section>
          <section>
            <h2 className="h2-std !text-lg mb-3">3. Contact</h2>
            <p className="p-std text-xs leading-relaxed">
              For privacy requests or data deletion, please contact us at support@smartlytap.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


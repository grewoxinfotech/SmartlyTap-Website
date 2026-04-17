export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <h1 className="h1-std mb-4">
          Terms & Conditions
        </h1>
        <p className="p-std text-base mb-10 opacity-70">
          Last updated: April 16, 2026. Please read these terms carefully before using SmartlyTap.
        </p>

        <div className="card-std space-y-8 !p-8">
          <section>
            <h2 className="h2-std !text-lg mb-3">1. Service Overview</h2>
            <p className="p-std text-xs leading-relaxed">
              SmartlyTap provides high-quality NFC-enabled business cards and a hosted digital profile platform. By using our service, you agree to these terms.
            </p>
          </section>
          <section>
            <h2 className="h2-std !text-lg mb-3">2. Acceptable Use</h2>
            <p className="p-std text-xs leading-relaxed">
              Users must not misuse the platform, attempt unauthorized access, or upload content that violates intellectual property or local laws.
            </p>
          </section>
          <section>
            <h2 className="h2-std !text-lg mb-3">3. Payments & Refunds</h2>
            <p className="p-std text-xs leading-relaxed">
              All payments are processed securely via Razorpay. Refund requests for physical cards are subject to our refund policy and must be initiated within 7 days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


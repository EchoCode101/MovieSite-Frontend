import { createFileRoute } from '@tanstack/react-router'

import { Separator } from '@/components/ui/separator'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: [PLACEHOLDER: Date]
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p>
              [PLACEHOLDER: Introduction text. Example: "Welcome to [App Name]. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website..."]
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">2. The Data We Collect</h2>
            <p className="mb-4">
              [PLACEHOLDER: Explain what data you collect. Example: "We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:"]
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Identity Data:</strong> [PLACEHOLDER: first name, last name, username]</li>
              <li><strong>Contact Data:</strong> [PLACEHOLDER: email address, telephone number]</li>
              <li><strong>Technical Data:</strong> [PLACEHOLDER: IP address, browser type, etc.]</li>
              <li><strong>Usage Data:</strong> [PLACEHOLDER: info about how you use our website]</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Data</h2>
            <p>
              [PLACEHOLDER: Explain data usage. Example: "We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances..."]
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
            <p>
              [PLACEHOLDER: Security measures. Example: "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way..."]
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Contact Details</h2>
            <p>
              [PLACEHOLDER: Contact info for privacy concerns. Example: "If you have any questions about this privacy policy or our privacy practices, please contact us at:"]
            </p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p><strong>Email:</strong> [PLACEHOLDER: privacy@example.com]</p>
              <p><strong>Address:</strong> [PLACEHOLDER: Your Company Address]</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

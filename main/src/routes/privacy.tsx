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
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p>
              Welcome to our video streaming platform. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and use our services.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">2. The Data We Collect</h2>
            <p className="mb-4">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Identity Data:</strong> first name, last name, username</li>
              <li><strong>Contact Data:</strong> email address</li>
              <li><strong>Technical Data:</strong> IP address, browser type and version, device information</li>
              <li><strong>Usage Data:</strong> information about how you use our website and services, including watch history and preferences</li>
              <li><strong>Profile Data:</strong> profile information, subscription details, payment information</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>To provide and maintain our services</li>
              <li>To manage your account and subscription</li>
              <li>To personalize your experience</li>
              <li>To communicate with you about our services</li>
              <li>To improve our platform and develop new features</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We use encryption, secure authentication, and other industry-standard security practices to protect your data.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal data. You can manage your account settings and preferences through your profile page. If you have any questions or requests regarding your data, please contact us.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Contact Details</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us:
            </p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p><strong>Email:</strong> privacy@vidstie.com</p>
              <p className="text-sm text-muted-foreground mt-2">
                We will respond to your inquiry as soon as possible.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

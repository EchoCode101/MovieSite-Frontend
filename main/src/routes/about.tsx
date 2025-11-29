import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Placeholder */}
      <section className="relative h-[40vh] w-full bg-muted flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
          alt="Team working together" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">About Us</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            [PLACEHOLDER: Your Company Tagline or Mission Statement goes here]
          </p>
        </div>
      </section>

      <div className="container mx-auto py-16 px-4 space-y-16">
        {/* Mission Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
            <div className="prose dark:prose-invert text-muted-foreground">
              <p>
                [PLACEHOLDER: Describe your company's mission here. What drives you? What problem are you solving? Example: "We are dedicated to providing the best video streaming experience..."]
              </p>
              <p>
                [PLACEHOLDER: Add more details about your values and vision. Example: "We believe in transparency, quality, and community..."]
              </p>
            </div>
          </div>
          <div className="aspect-video bg-muted rounded-xl overflow-hidden">
             <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
              alt="Mission" 
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        <Separator />

        {/* Team Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              [PLACEHOLDER: Intro text about your team. Example: "The passionate people behind the platform."]
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden border-none shadow-none bg-transparent">
                <div className="aspect-square bg-muted rounded-xl mb-4 overflow-hidden">
                  <img 
                    src={`https://i.pravatar.cc/400?img=${item + 10}`} 
                    alt="Team Member" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-0 text-center">
                  <h3 className="font-bold text-lg">[Member Name]</h3>
                  <p className="text-sm text-muted-foreground">[Job Title]</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

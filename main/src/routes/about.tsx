import { createFileRoute } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
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
            Your premier destination for high-quality video streaming content
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
                We are dedicated to providing the best video streaming experience for our users. Our platform offers a vast library of movies, TV shows, and exclusive content, all accessible through an intuitive and user-friendly interface.
              </p>
              <p>
                We believe in transparency, quality, and community. Our commitment is to deliver exceptional entertainment while maintaining the highest standards of service and user experience.
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

        {/* Values Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Quality</h3>
              <p className="text-muted-foreground">
                We curate only the best content, ensuring high-quality streaming experiences for all our users.
              </p>
            </div>
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Accessibility</h3>
              <p className="text-muted-foreground">
                Our platform is designed to be accessible to everyone, with flexible subscription plans and user-friendly features.
              </p>
            </div>
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Innovation</h3>
              <p className="text-muted-foreground">
                We continuously improve our platform with new features and technologies to enhance your viewing experience.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

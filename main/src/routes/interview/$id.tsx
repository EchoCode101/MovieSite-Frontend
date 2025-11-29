import { createFileRoute, Link } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Calendar, Share2 } from 'lucide-react'

export const Route = createFileRoute('/interview/$id')({
  component: InterviewPage,
})

// Mock data - will be replaced with real API calls when backend is ready
const mockInterview = {
  id: '1',
  title: 'Exclusive Interview: Behind the Scenes of Championship Win',
  category: 'Esports',
  date: '2024-01-15',
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  description: `In this exclusive interview, we sit down with the championship-winning team to discuss their journey, strategies, and what it takes to compete at the highest level.`,
  content: `
    <h2>The Road to Victory</h2>
    <p>The team's journey to the championship was filled with challenges and triumphs. From early setbacks to their final victory, every moment shaped their path to success.</p>
    
    <h3>Key Strategies</h3>
    <p>During the interview, the team revealed several key strategies that contributed to their success:</p>
    <ul>
      <li>Intensive practice sessions focusing on team coordination</li>
      <li>Analysis of opponent gameplay and adaptation</li>
      <li>Mental preparation and stress management</li>
      <li>Building trust and communication within the team</li>
    </ul>
    
    <h3>Looking Forward</h3>
    <p>As they look to the future, the team is focused on maintaining their competitive edge while also giving back to the gaming community through mentorship and educational content.</p>
  `,
}

function InterviewPage() {
  // Note: id param will be available when backend is ready
  // const { id } = Route.useParams()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <div className="mb-6">
          <Link to="/catalog" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Catalog
          </Link>
        </div>

        <article className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge>{mockInterview.category}</Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {new Date(mockInterview.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight">{mockInterview.title}</h1>

            <p className="text-lg text-muted-foreground">{mockInterview.description}</p>
          </div>

          <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
            <iframe
              src={mockInterview.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={mockInterview.title}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          <Separator />

          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: mockInterview.content }}
          />

          <Separator />

          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            <p className="text-muted-foreground">
              Comments feature coming soon. Stay tuned!
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}

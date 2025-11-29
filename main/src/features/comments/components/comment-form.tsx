import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'

interface CommentFormProps {
  onSubmit: (content: string) => void
  isLoading?: boolean
  placeholder?: string
  buttonText?: string
  initialValue?: string
}

export function CommentForm({
  onSubmit,
  isLoading = false,
  placeholder = 'Write a comment...',
  buttonText = 'Post Comment',
  initialValue = '',
}: CommentFormProps) {
  const [content, setContent] = useState(initialValue)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      onSubmit(content)
      setContent('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className="min-h-[100px]"
        disabled={isLoading}
      />
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {content.length} characters
        </span>
        <Button type="submit" disabled={!content.trim() || isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {buttonText}
        </Button>
      </div>
    </form>
  )
}

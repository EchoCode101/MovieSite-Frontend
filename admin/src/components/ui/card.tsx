import type * as React from 'react'

import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-slate-800/50 bg-slate-900/60 text-slate-50 shadow-lg transition-shadow',
        className,
      )}
      {...props}
    />
  )
}



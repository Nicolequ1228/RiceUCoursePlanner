import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      This tool can make mistakes. <br/>Consider double check the information on {' '}
      <ExternalLink href="https://ga.rice.edu/">
        Rice General Announcement Official Website
      </ExternalLink>.
    </p>
  )
}

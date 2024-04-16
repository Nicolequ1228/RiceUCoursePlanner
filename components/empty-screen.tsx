import { UseChatHelpers } from 'ai/react'

import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
          Welcome to Rice Course & Program Planner!
        </h1>
        <p className="leading-normal text-muted-foreground">
          This tool makes finding the right courses and programs a breeze. Just ask questions about the courses and programs at Rice. Start exploring now and see how easy it is to plan your academic path.
        </p>
        <p className="leading-normal text-muted-foreground">
          For more information about the courses and programs available at Rice, please refer to {' '}
          <ExternalLink href="https://ga.rice.edu/">
            Rice General Announcement Official Website
          </ExternalLink>
          .
        </p>
      </div>
    </div>
  )
}

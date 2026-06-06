import { motion, useReducedMotion } from 'framer-motion'
import {
  ChevronRight,
  FileType,
  BookOpen,
  Link as LinkIcon,
  Sparkles,
} from 'lucide-react'
import type { WeekData } from '@/data/weeks'
import { cn } from '@/lib/utils'

interface WeekCardProps {
  week: WeekData
  onSelectWeek: (week: WeekData) => void
  featured?: boolean
}

export function WeekCard({ week, onSelectWeek, featured = false }: WeekCardProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.button
      layout={prefersReducedMotion ? false : true}
      whileHover={
        prefersReducedMotion
          ? {}
          : featured
            ? {
                y: -4,
                boxShadow: '0 18px 40px -12px rgb(0 0 0 / 0.18)',
              }
            : {
                scale: 1.02,
                boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
              }
      }
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      transition={{
        layout: { type: 'spring', damping: 22, stiffness: 260 },
        scale: { type: 'spring', damping: 15, stiffness: 300 },
        y: { type: 'spring', damping: 18, stiffness: 280 },
        boxShadow: { duration: 0.2 },
      }}
      onClick={() => onSelectWeek(week)}
      className={cn(
        'group/card relative w-full text-left rounded-2xl border border-border bg-card shadow-sm overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer h-full',
        featured
          ? 'flex flex-col justify-between p-6 md:p-7'
          : 'p-5',
      )}
    >
      {featured && (
        <span
          aria-hidden
          className="absolute left-0 top-0 bottom-0 w-1 origin-top scale-y-0 group-hover/card:scale-y-100 bg-gradient-to-b from-primary via-primary/70 to-primary/30 transition-transform duration-500 ease-out"
        />
      )}

      <div className={cn('flex items-start justify-between gap-4', featured && 'flex-1')}>
        <div className="flex-1 min-w-0">
          <div className={cn('flex items-center gap-3', featured ? 'mb-3' : 'mb-1')}>
            <span
              className={cn(
                'inline-flex items-center justify-center rounded-lg bg-primary/10 text-primary font-bold shrink-0',
                featured ? 'w-12 h-12 text-lg' : 'w-8 h-8 text-sm',
              )}
            >
              {week.id}
            </span>
            <h3
              className={cn(
                'font-semibold truncate',
                featured ? 'text-2xl tracking-tight' : 'text-base',
              )}
            >
              {week.title}
            </h3>
            {featured && (
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-primary/10 text-primary shrink-0">
                <Sparkles className="w-3 h-3" />
                Milestone
              </span>
            )}
          </div>
          <p
            className={cn(
              'text-muted-foreground ml-11',
              featured
                ? 'text-sm leading-relaxed line-clamp-3'
                : 'text-sm line-clamp-1',
            )}
          >
            {week.topic}
          </p>
        </div>

        <motion.div
          whileHover={prefersReducedMotion ? {} : { x: 4 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="mt-1 shrink-0"
        >
          <div
            className={cn(
              'flex items-center justify-center rounded-md bg-accent/50 group-hover/card:bg-accent transition-colors',
              featured ? 'w-9 h-9' : 'w-6 h-6',
            )}
          >
            <ChevronRight
              className={cn('text-muted-foreground', featured ? 'w-5 h-5' : 'w-4 h-4')}
            />
          </div>
        </motion.div>
      </div>

      <div
        className={cn(
          'flex gap-4 text-muted-foreground',
          featured
            ? 'mt-6 ml-0 md:ml-15 text-sm'
            : 'mt-3 ml-11 text-xs',
        )}
      >
        <span className="flex items-center gap-1.5">
          <FileType className="w-3.5 h-3.5" />
          {week.assignments} asgn
        </span>
        <span className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          {week.notes} notes
        </span>
        <span className="flex items-center gap-1.5">
          <LinkIcon className="w-3.5 h-3.5" />
          {week.links} links
        </span>
      </div>
    </motion.button>
  )
}

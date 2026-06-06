import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FloatingIconsHero } from '@/components/ui/floating-icons-hero-section'
import { WeekCard } from '@/components/WeekCard'
import { WeekModal } from '@/components/WeekModal'
import { PDFModal } from '@/components/PDFModal'
import { heroIcons } from '@/data/hero-icons'
import { weeks } from '@/data/weeks'
import type { WeekData } from '@/data/weeks'
import { Moon, Sun, ArrowUpRight } from 'lucide-react'

const easeOutQuint = [0.22, 1, 0.36, 1] as const

const FEATURED_WEEK_IDS: ReadonlySet<number> = new Set([1, 7, 14, 22])

function App() {
  const [selectedWeek, setSelectedWeek] = useState<WeekData | null>(null)
  const [pdfModalOpen, setPdfModalOpen] = useState(false)
  const [activePdf, setActivePdf] = useState<string | null>(null)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])

  const handleSelectWeek = (week: WeekData) => {
    setSelectedWeek(week)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenPDF = (pdfName: string) => {
    setActivePdf(pdfName)
    setPdfModalOpen(true)
  }

  const stats = useMemo(
    () => [
      { value: '22', label: 'Weeks' },
      { value: '54', label: 'PDF Notes' },
      { value: '99', label: 'External Links' },
      { value: '12', label: 'Topics' },
    ],
    [],
  )

  return (
    <div className={`min-h-screen bg-background ${selectedWeek ? 'overflow-hidden' : ''}`}>
      <button
        onClick={() => setDark(!dark)}
        className="fixed top-4 right-4 z-40 w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-background shadow-sm hover:bg-accent hover:shadow-md transition-all"
        aria-label="Toggle theme"
      >
        {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      <FloatingIconsHero
        title="TR-104 Training Report"
        subtitle="A 22-week intensive in Python, Machine Learning, Deep Learning, Power BI, and Dataiku — built, broken, and rebuilt at Sun Foundation, Ludhiana."
        ctaText="Explore the Journey"
        ctaHref="#weeks"
        icons={heroIcons}
        byline="Nirmit Rampal &middot; U.R.N: 2302729 &middot; GNDEC Ludhiana"
        stats={stats}
      />

      <section id="weeks" className="py-20 md:py-28 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: easeOutQuint }}
            className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
                01 &mdash; The Timeline
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
                Twenty-two weeks, one repository
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md text-balance">
              Click any week to open its resources. Featured cards mark the major topic
              shifts &mdash; the rest is supporting work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[200px] grid-flow-dense">
            {weeks.map((week, i) => {
              const isFeatured = FEATURED_WEEK_IDS.has(week.id)
              return (
                <motion.div
                  key={week.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(i * 0.03, 0.3),
                    ease: easeOutQuint,
                  }}
                  className={
                    isFeatured ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''
                  }
                >
                  <WeekCard
                    week={week}
                    onSelectWeek={handleSelectWeek}
                    featured={isFeatured}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-border mt-8">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Trainee
            </p>
            <p className="text-lg font-semibold tracking-tight">Nirmit Rampal</p>
            <p className="text-sm text-muted-foreground mt-1">
              Data Science &amp; Machine Learning &middot; TR-104
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Program
            </p>
            <p className="text-sm">
              Guru Nanak Dev Engineering College, Ludhiana
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              U.R.N: 2302729
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Built with
            </p>
            <p className="text-sm text-muted-foreground">
              React 19, TypeScript, Vite, Tailwind v4, Framer Motion.
            </p>
            <a
              href="https://github.com/nirmt-124398/TR-104-Daily-Diary"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              Source on GitHub
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-5 text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Nirmit Rampal. All training material
            belongs to its respective authors.
          </div>
        </div>
      </footer>

      <WeekModal
        week={selectedWeek}
        onClose={() => setSelectedWeek(null)}
        onOpenPDF={handleOpenPDF}
      />

      <PDFModal
        isOpen={pdfModalOpen}
        pdfName={activePdf}
        onClose={() => {
          setPdfModalOpen(false)
          setActivePdf(null)
        }}
      />
    </div>
  )
}

export default App

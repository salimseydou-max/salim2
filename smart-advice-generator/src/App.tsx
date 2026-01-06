import { useState } from 'react'
import './App.css'

type AdviceCategory = 'Study' | 'Health' | 'Motivation' | 'Life' | 'Money'

const CATEGORIES: Array<{
  id: AdviceCategory
  title: AdviceCategory
  description: string
}> = [
  {
    id: 'Study',
    title: 'Study',
    description: 'Learn smarter and stay consistent.',
  },
  {
    id: 'Health',
    title: 'Health',
    description: 'Small habits that boost energy and wellbeing.',
  },
  {
    id: 'Motivation',
    title: 'Motivation',
    description: 'Keep going when it’s hard.',
  },
  {
    id: 'Life',
    title: 'Life',
    description: 'Practical guidance for everyday decisions.',
  },
  {
    id: 'Money',
    title: 'Money',
    description: 'Simple steps toward financial confidence.',
  },
]

const ADVICE_BY_CATEGORY: Record<AdviceCategory, string[]> = {
  Study: [
    'Use a 25-minute focus timer, then take a 5-minute break.',
    'Start with the easiest problem to build momentum, then tackle the hardest.',
    'Explain the topic out loud as if teaching—gaps become obvious fast.',
    'Review your notes the same day you take them (even for 10 minutes).',
    'Practice with questions, not rereading—retrieval beats recognition.',
  ],
  Health: [
    'Add a short walk after meals—10 minutes counts.',
    'Aim for a consistent bedtime window for a week before changing anything else.',
    'Drink a glass of water before your next coffee or tea.',
    'Make your next meal half colorful plants (fruit/veg) before worrying about perfection.',
    'Do 2 minutes of stretching right now—small starts beat big plans.',
  ],
  Motivation: [
    'Lower the bar: do the “2-minute version” to start.',
    'Make it obvious: place what you need where you’ll see it.',
    'Focus on identity: “I’m the kind of person who shows up.”',
    'Don’t negotiate with your plan—start, then adjust after 10 minutes.',
    'Write the next single action, not the whole project.',
  ],
  Life: [
    'When unsure, choose the option you can sustain for 6 months.',
    'If it’s not a “hell yes,” it’s a “no” (or ask what would make it a yes).',
    'Trade certainty for clarity: define what “good” looks like, then act.',
    'Protect your mornings for priorities; protect your evenings for recovery.',
    'If a decision is reversible, decide quickly and learn fast.',
  ],
  Money: [
    'Track spending for 7 days—awareness is the fastest budget.',
    'Automate a small transfer to savings on payday, even $5.',
    'Pay down the highest-interest debt first (avalanche) if you can.',
    'Before buying, wait 24 hours and ask: “Will I still want this next week?”',
    'Make a “must-pay” list first, then decide what’s left for wants.',
  ],
}

function pickAdvice(category: AdviceCategory, previousAdvice: string | null) {
  const pool = ADVICE_BY_CATEGORY[category]
  if (pool.length === 0) return 'No advice available yet.'

  // Try to avoid repeating the last piece of advice for the same category.
  const candidates =
    previousAdvice && pool.length > 1 ? pool.filter((a) => a !== previousAdvice) : pool
  const idx = Math.floor(Math.random() * candidates.length)
  return candidates[idx] ?? pool[0]
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState<AdviceCategory | null>(null)
  const [advice, setAdvice] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onGetAdvice = () => {
    if (!selectedCategory) {
      setError('Please select a category to get advice.')
      setAdvice(null)
      return
    }
    setError(null)
    setAdvice((prev) => pickAdvice(selectedCategory, prev))
  }

  return (
    <div className="app">
      <header className="header">
        <div className="badge" aria-hidden="true">
          Smart Advice
        </div>
        <h1 className="title">Smart Advice Generator</h1>
        <p className="subtitle">
          Pick a category and get a quick, helpful tip—updated instantly without page reloads.
        </p>
      </header>

      <main className="main">
        <section className="panel" aria-label="Advice categories">
          <div className="panelHeader">
            <h2 className="panelTitle">Choose a category</h2>
            <p className="panelHint">
              Tap a card to select it, then click <span className="mono">Get Advice</span>.
            </p>
          </div>

          <div className="categoryGrid" role="list">
            {CATEGORIES.map((c) => {
              const isSelected = selectedCategory === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`categoryCard ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedCategory(c.id)
                    setError(null)
                  }}
                  aria-pressed={isSelected}
                >
                  <div className="categoryTitleRow">
                    <span className="categoryTitle">{c.title}</span>
                    {isSelected ? <span className="pill">Selected</span> : null}
                  </div>
                  <span className="categoryDescription">{c.description}</span>
                </button>
              )
            })}
          </div>

          <div className="actions">
            <button type="button" className="primaryButton" onClick={onGetAdvice}>
              Get Advice
            </button>
            <div className="selectionStatus" aria-live="polite">
              {selectedCategory ? (
                <>
                  Selected: <span className="mono">{selectedCategory}</span>
                </>
              ) : (
                'No category selected'
              )}
            </div>
          </div>

          {error ? (
            <div className="message error" role="alert">
              {error}
            </div>
          ) : null}
        </section>

        <section className="adviceCard" aria-label="Generated advice">
          <div className="adviceHeader">
            <h2 className="panelTitle">Your advice</h2>
            <span className="adviceMeta">
              {selectedCategory ? `Category: ${selectedCategory}` : 'Pick a category to begin'}
            </span>
          </div>

          {advice ? (
            <p className="adviceText">{advice}</p>
          ) : (
            <p className="advicePlaceholder">
              Choose a category and click <span className="mono">Get Advice</span> to see your tip
              here.
            </p>
          )}
        </section>
      </main>

      <footer className="footer">
        <span className="footerText">Built with React • Instant updates • Mobile-friendly</span>
      </footer>
    </div>
  )
}

export default App

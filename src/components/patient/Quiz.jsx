import { useState } from 'react'
import { QUESTIONS } from '../../data/questions'
import { CORRIENTES } from '../../data/corrientes'

export default function Quiz({ onComplete }) {
  const [answers, setAnswers] = useState(new Array(QUESTIONS.length).fill(null))
  const [current, setCurrent] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const SCORE_QUESTIONS = 7 // only first 7 count for corriente

  function pick(key) {
    const next = [...answers]
    next[current] = key
    setAnswers(next)
  }

  function goNext() {
    if (current === QUESTIONS.length - 1) {
      finish()
      return
    }
    setCurrent(c => c + 1)
  }

  function goPrev() {
    setCurrent(c => Math.max(0, c - 1))
  }

  function finish() {
    const counts = { A: 0, B: 0, C: 0, D: 0, E: 0 }
    answers.slice(0, SCORE_QUESTIONS).forEach(a => { if (a) counts[a]++ })
    const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
    onComplete({ winner, counts })
  }

  const q = QUESTIONS[current]
  const progress = ((current + 1) / QUESTIONS.length) * 100
  const glyphs = ['a', 'b', 'c', 'd', 'e']

  if (showResult) return null

  return (
    <div className="min-h-screen bg-bg">
      <nav className="border-b border-border px-6 py-4">
        <span className="font-garamond text-xl text-ink">Terapeutas·Mx</span>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10 pb-24">
        {/* Header */}
        <header className="pb-6 border-b border-border mb-8">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-gold mb-3">
            Orientación terapéutica
          </p>
          <h1 className="font-garamond text-5xl font-normal text-ink leading-tight mb-3">
            ¿Qué tipo de<br />terapia es<br /><em className="italic text-accent">para ti?</em>
          </h1>
          <p className="text-sm font-light text-muted leading-relaxed max-w-md">
            No hay respuestas correctas ni incorrectas. Elige lo que genuinamente te representa.
          </p>
        </header>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-border relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-accent transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-medium tracking-wider text-dim whitespace-nowrap">
            {current + 1} / {QUESTIONS.length}
          </span>
        </div>

        {/* Question card */}
        <div className="border border-border rounded-sm bg-paper shadow-sm animate-emerge" key={current}>
          <div className="px-8 py-6 border-b border-border">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-dim mb-3">
              Pregunta {current + 1}
            </p>
            <p className="font-garamond text-[1.35rem] leading-relaxed text-ink">{q.t}</p>
          </div>
          {q.o.map((opt, i) => (
            <button
              key={opt[0]}
              onClick={() => pick(opt[0])}
              className={`w-full flex items-stretch border-b border-border last:border-b-0 text-left transition-colors group
                ${answers[current] === opt[0]
                  ? 'bg-accent/5'
                  : 'hover:bg-accent/[0.03]'
                }`}
            >
              <span className={`w-12 flex-shrink-0 flex items-center justify-center border-r border-border
                font-garamond italic text-lg transition-colors
                ${answers[current] === opt[0] ? 'text-accent' : 'text-dim'}`}>
                {glyphs[i]}
              </span>
              <span className={`flex-1 px-5 py-4 text-sm font-light leading-relaxed relative
                ${answers[current] === opt[0] ? 'text-ink' : 'text-ink/80'}`}>
                {answers[current] === opt[0] && (
                  <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent" />
                )}
                {opt[1]}
              </span>
            </button>
          ))}
        </div>

        {/* Nav */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="py-2.5 px-5 border border-border text-muted text-xs font-medium tracking-wider uppercase rounded-sm hover:border-accent hover:text-accent transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            ← Anterior
          </button>
          <button
            onClick={goNext}
            disabled={answers[current] === null}
            className="py-2.5 px-5 bg-ink text-bg text-xs font-medium tracking-wider uppercase rounded-sm hover:bg-accent transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            {current === QUESTIONS.length - 1 ? 'Ver resultado →' : 'Siguiente →'}
          </button>
        </div>
      </div>
    </div>
  )
}

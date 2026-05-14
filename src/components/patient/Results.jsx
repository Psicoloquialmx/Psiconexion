import { useState, useMemo } from 'react'
import { CORRIENTES } from '../../data/corrientes'
import { MOCK_THERAPISTS } from '../../data/mockTherapists'
import TherapistCard from './TherapistCard'

export default function Results({ quizResult, prefs, registeredTherapists, onSelect, onBack, onRetake }) {
  const [activeFilter, setActiveFilter] = useState('match')

  const corriente = CORRIENTES[quizResult.winner]

  // Merge mock + registered therapists (registered therapists with complete profiles)
  const allTherapists = useMemo(() => {
    const registered = (registeredTherapists || []).filter(t => t.profileComplete && t.corriente)
    return [...MOCK_THERAPISTS, ...registered]
  }, [registeredTherapists])

  // Matching logic
  const matches = useMemo(() => {
    return allTherapists.filter(t => {
      // Primary: corriente match
      if (activeFilter === 'match' && t.corriente !== quizResult.winner) return false

      // Gender filter
      if (prefs.tGenero && prefs.tGenero !== 'Sin preferencia') {
        if (t.genero !== prefs.tGenero) return false
      }

      // Age range filter
      if (prefs.tEdad && prefs.tEdad !== 'Sin preferencia') {
        if (t.rangoEdad && t.rangoEdad !== prefs.tEdad) return false
      }

      // Modality filter
      if (prefs.modalidad && prefs.modalidad !== 'Indistinto') {
        if (prefs.modalidad === 'En línea') {
          if (t.modalidad !== 'En línea' && t.modalidad !== 'Ambas') return false
        } else if (prefs.modalidad === 'Presencial') {
          if (t.modalidad !== 'Presencial' && t.modalidad !== 'Ambas') return false
        }
      }

      // Zone filter (only if presencial)
      if (prefs.zona && (prefs.modalidad === 'Presencial' || prefs.modalidad === 'Indistinto')) {
        if (t.zona && t.zona !== prefs.zona) return false
      }

      return true
    })
  }, [allTherapists, quizResult.winner, prefs, activeFilter])

  const allFiltered = useMemo(() => {
    return allTherapists.filter(t => {
      if (prefs.tGenero && prefs.tGenero !== 'Sin preferencia') {
        if (t.genero !== prefs.tGenero) return false
      }
      if (prefs.modalidad && prefs.modalidad !== 'Indistinto') {
        if (prefs.modalidad === 'En línea') {
          if (t.modalidad !== 'En línea' && t.modalidad !== 'Ambas') return false
        } else if (prefs.modalidad === 'Presencial') {
          if (t.modalidad !== 'Presencial' && t.modalidad !== 'Ambas') return false
        }
      }
      return true
    })
  }, [allTherapists, prefs])

  const displayList = activeFilter === 'match' ? matches : allFiltered

  // Build active prefs summary
  const prefChips = [
    prefs.tGenero && prefs.tGenero !== 'Sin preferencia' && prefs.tGenero,
    prefs.tEdad && prefs.tEdad !== 'Sin preferencia' && `${prefs.tEdad} años`,
    prefs.modalidad && prefs.modalidad !== 'Indistinto' && prefs.modalidad,
    prefs.zona && prefs.zona,
  ].filter(Boolean)

  return (
    <div className="min-h-screen bg-bg">
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between">
        <span className="font-garamond text-xl text-ink">Terapeutas·Mx</span>
        <button onClick={onBack} className="text-xs font-medium tracking-widest uppercase text-muted hover:text-accent transition-colors">
          ← Volver
        </button>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10 pb-24">
        {/* Result header */}
        <div className="pb-6 border-b border-border mb-6">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">Tus resultados</p>
          <h1 className="font-garamond text-4xl font-normal text-ink leading-tight mb-3">
            Terapeutas con tu<br />
            <em className="italic" style={{ color: corriente.col }}>perfil de búsqueda</em>
          </h1>

          <div className="flex flex-wrap gap-2">
            <span
              className="text-xs font-medium tracking-wider rounded-sm px-2.5 py-1"
              style={{ background: corriente.col + '15', color: corriente.col, border: `1px solid ${corriente.col}38` }}
            >
              {corriente.short}
            </span>
            {prefChips.map(chip => (
              <span key={chip} className="text-xs border border-border text-muted rounded-sm px-2.5 py-1 font-light">
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border border-border rounded-sm overflow-hidden mb-6">
          <button
            onClick={() => setActiveFilter('match')}
            className={`flex-1 py-2.5 text-xs font-medium tracking-wider transition-colors
              ${activeFilter === 'match' ? 'bg-ink text-bg' : 'text-muted hover:text-ink'}`}
          >
            Match exacto ({matches.length})
          </button>
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex-1 py-2.5 text-xs font-medium tracking-wider transition-colors
              ${activeFilter === 'all' ? 'bg-ink text-bg' : 'text-muted hover:text-ink'}`}
          >
            Todos los terapeutas ({allFiltered.length})
          </button>
        </div>

        {/* Results grid */}
        {displayList.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {displayList.map(t => (
              <TherapistCard key={t.id} therapist={t} onClick={onSelect} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-garamond text-2xl text-ink mb-3">Sin resultados</p>
            <p className="text-sm font-light text-muted mb-6">
              No encontramos terapeutas con esa combinación de filtros.
              Prueba cambiando la zona o la modalidad.
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="py-3 px-6 border border-border text-muted text-xs font-medium tracking-wider uppercase rounded-sm hover:border-accent hover:text-accent transition-colors"
            >
              Ver todos los terapeutas
            </button>
          </div>
        )}

        {/* Retake quiz */}
        <div className="mt-10 pt-8 border-t border-border text-center">
          <p className="text-xs font-light text-muted mb-3">¿Los resultados no te convencen?</p>
          <button
            onClick={onRetake}
            className="text-xs font-medium tracking-widest uppercase text-muted hover:text-accent transition-colors border-b border-transparent hover:border-accent"
          >
            Repetir el quiz
          </button>
        </div>
      </div>
    </div>
  )
}

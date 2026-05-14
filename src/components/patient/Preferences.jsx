import { useState } from 'react'
import { CORRIENTES } from '../../data/corrientes'
import { QUESTIONS } from '../../data/questions'

const ZONAS = [
  { val: 'Centro', label: 'CDMX — Centro' },
  { val: 'Sur', label: 'CDMX — Sur' },
  { val: 'Poniente', label: 'CDMX — Poniente' },
  { val: 'Norte', label: 'CDMX — Norte' },
  { val: 'Oriente', label: 'CDMX — Oriente' },
  { val: 'EDOMEX Norte', label: 'Área Metro — Norte' },
  { val: 'EDOMEX Oriente', label: 'Área Metro — Oriente' },
  { val: 'Toluca', label: 'Toluca' },
  { val: 'Guadalajara', label: 'Guadalajara / Jalisco' },
  { val: 'Monterrey', label: 'Monterrey / Nuevo León' },
  { val: 'Puebla', label: 'Puebla' },
  { val: 'Querétaro', label: 'Querétaro' },
  { val: 'Otra', label: 'Otra ciudad' },
]

export default function Preferences({ quizResult, onComplete, onBack }) {
  const [prefs, setPrefs] = useState({
    tGenero: '',
    tEdad: '',
    modalidad: '',
    zona: '',
  })

  const corriente = CORRIENTES[quizResult.winner]
  const total = QUESTIONS.length

  function Chip({ label, field, value }) {
    const active = prefs[field] === value
    return (
      <button
        type="button"
        onClick={() => setPrefs(p => ({ ...p, [field]: active ? '' : value }))}
        className={`text-sm px-3 py-1.5 border rounded-sm transition-colors font-light
          ${active
            ? 'bg-ink border-ink text-bg'
            : 'border-border text-muted hover:border-accent hover:text-ink'
          }`}
      >
        {label}
      </button>
    )
  }

  return (
    <div className="min-h-screen bg-bg">
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between">
        <span className="font-garamond text-xl text-ink">Terapeutas·Mx</span>
        <button onClick={onBack} className="text-xs font-medium tracking-widest uppercase text-muted hover:text-accent transition-colors">
          ← Volver
        </button>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10 pb-24">
        {/* Quiz result summary */}
        <div className="pb-8 border-b border-border mb-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">Tu resultado</p>
          <p className="font-garamond text-4xl text-ink font-normal mb-3">
            Tu corriente es<br />
            <em className="italic" style={{ color: corriente.col }}>{corriente.name}</em>
          </p>
          <span
            className="inline-block text-xs font-medium tracking-wider rounded-sm px-3 py-1 mb-4"
            style={{ background: corriente.col + '15', color: corriente.col, border: `1px solid ${corriente.col}38` }}
          >
            {corriente.chip}
          </span>
          <p className="text-sm font-light text-muted leading-relaxed italic border-l-2 pl-4" style={{ borderColor: corriente.col + '60' }}>
            "{corriente.frase}"
          </p>

          {/* Bars */}
          <div className="mt-6 space-y-2.5">
            {Object.entries(CORRIENTES).map(([k, c]) => {
              const count = quizResult.counts[k] || 0
              const pct = Math.round(count / total * 100)
              return (
                <div key={k}>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-xs font-medium" style={{ color: c.col }}>{c.short}</span>
                    <span className="text-xs text-muted font-light">{count} resp. · {pct}%</span>
                  </div>
                  <div className="h-0.5 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-bar"
                      style={{ width: `${pct}%`, background: c.col }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h2 className="font-garamond text-3xl font-normal text-ink mb-1">
            Cuéntanos sobre el terapeuta
            <em className="italic text-accent"> que buscas</em>
          </h2>
          <p className="text-xs font-light text-muted mb-8">Esta información no cambia tu resultado.</p>

          <div className="bg-paper border border-border rounded-sm p-6 space-y-6 shadow-sm">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-dim mb-3">Género del terapeuta</p>
              <div className="flex flex-wrap gap-2">
                <Chip label="Mujer" field="tGenero" value="Mujer" />
                <Chip label="Hombre" field="tGenero" value="Hombre" />
                <Chip label="Sin preferencia" field="tGenero" value="Sin preferencia" />
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-dim mb-3">Rango de edad del terapeuta</p>
              <div className="flex flex-wrap gap-2">
                {['20-30', '30-40', '40-50', '50-60', '60+', 'Sin preferencia'].map(v => (
                  <Chip key={v} label={v} field="tEdad" value={v} />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-dim mb-3">Modalidad</p>
              <div className="flex flex-wrap gap-2">
                <Chip label="En línea" field="modalidad" value="En línea" />
                <Chip label="Presencial" field="modalidad" value="Presencial" />
                <Chip label="Me es indistinto" field="modalidad" value="Indistinto" />
              </div>

              {(prefs.modalidad === 'Presencial' || prefs.modalidad === 'Indistinto') && (
                <div className="mt-3">
                  <p className="text-xs font-semibold tracking-[0.16em] uppercase text-dim mb-2">Zona</p>
                  <select
                    value={prefs.zona}
                    onChange={e => setPrefs(p => ({ ...p, zona: e.target.value }))}
                    className="w-full border border-border rounded-sm px-3 py-2.5 text-sm font-light text-ink bg-bg focus:outline-none focus:border-accent transition-colors appearance-none"
                  >
                    <option value="">Selecciona una zona</option>
                    {ZONAS.map(z => (
                      <option key={z.val} value={z.val}>{z.label}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => onComplete(prefs)}
          className="w-full mt-6 py-4 bg-ink text-bg text-xs font-medium tracking-widest uppercase rounded-sm hover:bg-accent transition-colors"
        >
          Ver terapeutas →
        </button>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { CORRIENTES } from '../../data/corrientes'

const ESPECIALIDADES = [
  'Ansiedad', 'Depresión', 'Trauma', 'Duelo', 'Relaciones de pareja',
  'Conflictos familiares', 'Identidad', 'TDAH', 'TOC', 'Fobia social',
  'Autoestima', 'Crisis vitales', 'Sexualidad', 'Adolescentes',
  'ACT', 'EMDR', 'Bioenergética', 'Enfoque existencial', 'Hábitos y productividad',
]

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

const RANGOS_EDAD = ['20-30', '30-40', '40-50', '50-60', '60+']

export default function ProfileForm({ user, existingProfile, onSave, onBack }) {
  const [form, setForm] = useState({
    nombre: existingProfile?.nombre || user.name || '',
    genero: existingProfile?.genero || '',
    rangoEdad: existingProfile?.rangoEdad || '',
    corriente: existingProfile?.corriente || '',
    bio: existingProfile?.bio || '',
    especialidades: existingProfile?.especialidades || [],
    modalidad: existingProfile?.modalidad || '',
    zona: existingProfile?.zona || '',
    colonia: existingProfile?.colonia || '',
    precio: existingProfile?.precio || '',
    experiencia: existingProfile?.experiencia || '',
    formacion: existingProfile?.formacion || '',
  })
  const [error, setError] = useState('')

  function toggleEsp(esp) {
    setForm(f => ({
      ...f,
      especialidades: f.especialidades.includes(esp)
        ? f.especialidades.filter(e => e !== esp)
        : [...f.especialidades, esp],
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.nombre || !form.genero || !form.corriente || !form.bio || !form.modalidad) {
      return setError('Por favor completa los campos obligatorios: nombre, género, corriente, bio y modalidad.')
    }
    if ((form.modalidad === 'Presencial' || form.modalidad === 'Ambas') && !form.zona) {
      return setError('Indica la zona donde atiendes de forma presencial.')
    }
    setError('')
    onSave({
      ...form,
      precio: Number(form.precio) || 0,
      experiencia: Number(form.experiencia) || 0,
      id: user.id,
      email: user.email,
    })
  }

  const Field = ({ label, required, children }) => (
    <div className="mb-5">
      <span className="block text-xs font-semibold tracking-[0.16em] uppercase text-dim mb-2">
        {label}{required && <span className="text-accent ml-1">*</span>}
      </span>
      {children}
    </div>
  )

  const Chips = ({ options, selected, onToggle }) => (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onToggle(opt)}
          className={`text-sm px-3 py-1.5 border rounded-sm transition-colors font-light
            ${selected === opt || (Array.isArray(selected) && selected.includes(opt))
              ? 'bg-ink border-ink text-bg'
              : 'border-border text-muted hover:border-accent hover:text-ink'
            }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-bg">
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 bg-bg z-10">
        <span className="font-garamond text-xl text-ink">Terapeutas·Mx</span>
        <button onClick={onBack} className="text-xs font-medium tracking-widest uppercase text-muted hover:text-accent transition-colors">
          ← Volver
        </button>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8 pb-6 border-b border-border">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">Tu perfil</p>
          <h1 className="font-garamond text-4xl font-normal text-ink leading-tight">
            Cuéntale a los pacientes<br />
            <em className="italic text-accent">quién eres</em>
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-paper border border-border rounded-sm p-6 mb-4 shadow-sm">
            <p className="text-xs font-light text-muted leading-relaxed border-l-2 border-border pl-3 mb-6">
              Los campos con <span className="text-accent">*</span> son obligatorios.
            </p>

            <Field label="Nombre completo" required>
              <input
                type="text"
                value={form.nombre}
                onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                className="w-full border border-border rounded-sm px-3 py-2.5 text-sm font-light text-ink bg-bg focus:outline-none focus:border-accent transition-colors"
                placeholder="Lic. / Dr. / Mtra. Nombre Apellido"
              />
            </Field>

            <Field label="Género" required>
              <Chips
                options={['Mujer', 'Hombre', 'No binario', 'Prefiero no decir']}
                selected={form.genero}
                onToggle={v => setForm(f => ({ ...f, genero: v }))}
              />
            </Field>

            <Field label="Rango de edad">
              <Chips
                options={RANGOS_EDAD}
                selected={form.rangoEdad}
                onToggle={v => setForm(f => ({ ...f, rangoEdad: v }))}
              />
            </Field>

            <Field label="Corriente terapéutica principal" required>
              <div className="space-y-2">
                {Object.values(CORRIENTES).map(c => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, corriente: c.key }))}
                    className={`w-full text-left px-4 py-3 border rounded-sm text-sm transition-colors
                      ${form.corriente === c.key
                        ? 'border-ink bg-ink/5'
                        : 'border-border hover:border-accent'
                      }`}
                  >
                    <span className="font-medium text-ink block" style={{ color: form.corriente === c.key ? c.col : undefined }}>
                      {c.short}
                    </span>
                    <span className="text-xs font-light text-muted">{c.chip}</span>
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Bio / Descripción" required>
              <textarea
                value={form.bio}
                onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                rows={4}
                className="w-full border border-border rounded-sm px-3 py-2.5 text-sm font-light text-ink bg-bg focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Escribe cómo trabajas, qué te mueve como terapeuta, con quiénes sueles trabajar mejor..."
              />
            </Field>

            <Field label="Especialidades">
              <Chips
                options={ESPECIALIDADES}
                selected={form.especialidades}
                onToggle={toggleEsp}
              />
            </Field>
          </div>

          <div className="bg-paper border border-border rounded-sm p-6 mb-4 shadow-sm">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-dim mb-5">Logística</p>

            <Field label="Modalidad" required>
              <Chips
                options={['En línea', 'Presencial', 'Ambas']}
                selected={form.modalidad}
                onToggle={v => setForm(f => ({ ...f, modalidad: v }))}
              />
            </Field>

            {(form.modalidad === 'Presencial' || form.modalidad === 'Ambas') && (
              <Field label="Zona" required>
                <select
                  value={form.zona}
                  onChange={e => setForm(f => ({ ...f, zona: e.target.value }))}
                  className="w-full border border-border rounded-sm px-3 py-2.5 text-sm font-light text-ink bg-bg focus:outline-none focus:border-accent transition-colors appearance-none"
                >
                  <option value="">Selecciona una zona</option>
                  {ZONAS.map(z => (
                    <option key={z.val} value={z.val}>{z.label}</option>
                  ))}
                </select>
                {form.zona && (
                  <input
                    type="text"
                    value={form.colonia}
                    onChange={e => setForm(f => ({ ...f, colonia: e.target.value }))}
                    className="w-full mt-2 border border-border rounded-sm px-3 py-2.5 text-sm font-light text-ink bg-bg focus:outline-none focus:border-accent transition-colors"
                    placeholder="Colonia o alcaldía (opcional)"
                  />
                )}
              </Field>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Field label="Precio por sesión (MXN)">
                <input
                  type="number"
                  value={form.precio}
                  onChange={e => setForm(f => ({ ...f, precio: e.target.value }))}
                  className="w-full border border-border rounded-sm px-3 py-2.5 text-sm font-light text-ink bg-bg focus:outline-none focus:border-accent transition-colors"
                  placeholder="800"
                  min="0"
                />
              </Field>
              <Field label="Años de experiencia">
                <input
                  type="number"
                  value={form.experiencia}
                  onChange={e => setForm(f => ({ ...f, experiencia: e.target.value }))}
                  className="w-full border border-border rounded-sm px-3 py-2.5 text-sm font-light text-ink bg-bg focus:outline-none focus:border-accent transition-colors"
                  placeholder="5"
                  min="0"
                />
              </Field>
            </div>

            <Field label="Formación y títulos">
              <textarea
                value={form.formacion}
                onChange={e => setForm(f => ({ ...f, formacion: e.target.value }))}
                rows={2}
                className="w-full border border-border rounded-sm px-3 py-2.5 text-sm font-light text-ink bg-bg focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Lic. en Psicología, UNAM. Mtra. en..."
              />
            </Field>
          </div>

          {error && (
            <p className="text-xs text-red-600 font-light mb-4">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-ink text-bg text-xs font-medium tracking-widest uppercase rounded-sm hover:bg-accent transition-colors"
          >
            Guardar perfil →
          </button>
        </form>
      </div>
    </div>
  )
}

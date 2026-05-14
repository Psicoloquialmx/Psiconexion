import { CORRIENTES } from '../../data/corrientes'

export default function TherapistDetail({ therapist, onBack }) {
  const corriente = CORRIENTES[therapist.corriente]

  return (
    <div className="min-h-screen bg-bg">
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 bg-bg z-10">
        <span className="font-garamond text-xl text-ink">Terapeutas·Mx</span>
        <button
          onClick={onBack}
          className="text-xs font-medium tracking-widest uppercase text-muted hover:text-accent transition-colors"
        >
          ← Volver a resultados
        </button>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10 pb-24">
        {/* Header */}
        <div className="pb-6 border-b border-border mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              {corriente && (
                <span
                  className="inline-block text-xs font-medium tracking-wider rounded-sm px-2.5 py-1 mb-3"
                  style={{ background: corriente.col + '15', color: corriente.col, border: `1px solid ${corriente.col}38` }}
                >
                  {corriente.short}
                </span>
              )}
              <h1 className="font-garamond text-4xl font-normal text-ink leading-tight mb-1">
                {therapist.nombre}
              </h1>
              <p className="text-sm font-light text-muted">
                {therapist.genero}
                {therapist.rangoEdad ? ` · ${therapist.rangoEdad} años` : ''}
                {therapist.experiencia > 0 ? ` · ${therapist.experiencia} años de experiencia` : ''}
              </p>
            </div>
            <div className="w-16 h-16 rounded-sm bg-border flex items-center justify-center flex-shrink-0 ml-4">
              <span className="font-garamond italic text-3xl text-dim">
                {therapist.nombre.charAt(0)}
              </span>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-3">
            <span className="text-xs border border-border rounded-sm px-3 py-1.5 text-muted font-light">
              {therapist.modalidad === 'En línea' ? '🌐 En línea'
                : therapist.modalidad === 'Presencial' ? `📍 Presencial — ${therapist.colonia || therapist.zona}`
                : `🌐 📍 En línea y presencial${therapist.zona ? ' — ' + (therapist.colonia || therapist.zona) : ''}`}
            </span>
            {therapist.precio > 0 && (
              <span className="text-xs border border-border rounded-sm px-3 py-1.5 text-muted font-light">
                💬 ${therapist.precio.toLocaleString()} MXN / sesión
              </span>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="bg-paper border border-border rounded-sm overflow-hidden shadow-sm mb-4">
          {corriente && <div className="h-1" style={{ background: corriente.col }} />}
          <div className="p-6">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-dim mb-3">Sobre mí</p>
            <p className="text-sm font-light text-muted leading-relaxed">{therapist.bio}</p>
          </div>
        </div>

        {/* Especialidades */}
        {therapist.especialidades?.length > 0 && (
          <div className="bg-paper border border-border rounded-sm p-6 shadow-sm mb-4">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-dim mb-4">Especialidades</p>
            <div className="flex flex-wrap gap-2">
              {therapist.especialidades.map(e => (
                <span key={e} className="text-sm border border-border text-muted px-3 py-1.5 rounded-sm font-light">
                  {e}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Corriente info */}
        {corriente && (
          <div className="bg-paper border border-border rounded-sm overflow-hidden shadow-sm mb-4">
            <div className="h-1" style={{ background: corriente.col }} />
            <div className="p-6">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-dim mb-2">Corriente terapéutica</p>
              <h3 className="font-garamond text-2xl font-normal mb-2" style={{ color: corriente.col }}>
                {corriente.name}
              </h3>
              <p className="font-garamond italic text-base text-accent mb-4 border-l-2 border-gold/40 pl-4 leading-relaxed">
                "{corriente.frase}"
              </p>
              <p
                className="text-sm font-light text-muted leading-relaxed"
                dangerouslySetInnerHTML={{ __html: corriente.ps[0] }}
              />
            </div>
          </div>
        )}

        {/* Formación */}
        {therapist.formacion && (
          <div className="bg-paper border border-border rounded-sm p-6 shadow-sm mb-4">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-dim mb-3">Formación</p>
            <p className="text-sm font-light text-muted leading-relaxed">{therapist.formacion}</p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="bg-ink rounded-sm p-6 text-center">
          <p className="font-garamond text-2xl text-bg mb-1">¿Es un buen match?</p>
          <p className="text-xs font-light text-bg/60 mb-5">
            Escríbele directamente y agenda una primera sesión.
          </p>
          <a
            href={`mailto:${therapist.email}?subject=Quiero agendar una consulta&body=Hola, encontré tu perfil en Terapeutas·Mx y me gustaría agendar una primera sesión.`}
            className="inline-block py-3 px-8 bg-bg text-ink text-xs font-medium tracking-widest uppercase rounded-sm hover:bg-gold/20 transition-colors"
          >
            Contactar →
          </a>
          <p className="text-xs text-bg/40 mt-3 font-light">
            Se abrirá tu cliente de correo
          </p>
        </div>
      </div>
    </div>
  )
}

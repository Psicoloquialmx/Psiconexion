export default function Subscribe({ user, onSubscribe, onBack }) {
  return (
    <div className="min-h-screen bg-bg">
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between">
        <span className="font-garamond text-xl text-ink">Terapeutas·Mx</span>
        <button onClick={onBack} className="text-xs font-medium tracking-widest uppercase text-muted hover:text-accent transition-colors">
          ← Volver
        </button>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-16">
        <p className="text-xs font-semibold tracking-[0.22em] uppercase text-gold mb-4">
          Suscripción
        </p>
        <h1 className="font-garamond text-4xl md:text-5xl font-normal text-ink leading-tight mb-4">
          Publica tu perfil<br />
          <em className="italic text-accent">y recibe pacientes</em>
        </h1>
        <p className="text-sm font-light text-muted leading-relaxed mb-10">
          Hola, <strong className="text-ink font-medium">{user.name}</strong>. Con la suscripción mensual
          tu perfil aparece en los resultados de pacientes que buscan tu corriente terapéutica.
          Tú controlas completamente tu información.
        </p>

        {/* Plan card */}
        <div className="border border-border rounded-sm bg-paper p-8 mb-6 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-dim mb-1">Plan profesional</p>
              <p className="font-garamond text-4xl text-ink font-normal">$350 <span className="text-lg text-muted font-light">MXN / mes</span></p>
            </div>
            <span className="text-xs bg-gold/10 text-gold border border-gold/30 rounded-sm px-3 py-1 font-medium">
              Activo
            </span>
          </div>
          <ul className="space-y-3 mb-8">
            {[
              'Perfil visible para pacientes con match en tu corriente',
              'Filtros de género, modalidad y zona',
              'Control total sobre tu información',
              'Cancela cuando quieras',
              'Sin comisiones por sesión',
            ].map(item => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-gold mt-0.5">—</span>
                <span className="text-sm font-light text-muted">{item}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={onSubscribe}
            className="w-full py-3.5 bg-ink text-bg text-xs font-medium tracking-widest uppercase rounded-sm hover:bg-accent transition-colors"
          >
            Suscribirme ahora (demo)
          </button>
          <p className="text-center text-xs text-dim mt-3">
            Prototipo — no se realizará ningún cargo real
          </p>
        </div>

        <div className="border-l-2 border-border pl-4">
          <p className="text-xs font-light text-muted leading-relaxed italic">
            "El directorio usa el quiz de corriente terapéutica para conectar a los pacientes
            con terapeutas que realmente trabajan desde el enfoque que ellos buscan. No es sólo
            un filtro de ubicación."
          </p>
        </div>
      </div>
    </div>
  )
}

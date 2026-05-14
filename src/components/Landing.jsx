export default function Landing({ onSelectRole }) {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Nav */}
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between">
        <span className="font-garamond text-xl text-ink">Terapeutas·Mx</span>
        <button
          onClick={() => onSelectRole('patient')}
          className="text-xs font-medium tracking-widest uppercase text-muted hover:text-accent transition-colors"
        >
          Buscar terapeuta
        </button>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <p className="text-xs font-semibold tracking-[0.22em] uppercase text-gold mb-6">
          Directorio terapéutico
        </p>
        <h1 className="font-garamond text-5xl md:text-7xl font-normal leading-[1.05] text-ink mb-6 max-w-2xl">
          Encuentra al terapeuta<br />
          <em className="italic text-accent">que es para ti</em>
        </h1>
        <p className="text-sm font-light text-muted leading-relaxed max-w-md mb-14">
          Un directorio que toma en serio la compatibilidad. No buscamos al terapeuta más cercano,
          sino al que realmente tiene sentido para lo que tú necesitas.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <button
            onClick={() => onSelectRole('patient')}
            className="flex-1 py-4 px-6 bg-ink text-bg text-sm font-medium tracking-wider uppercase rounded-sm hover:bg-accent transition-colors"
          >
            Soy paciente
          </button>
          <button
            onClick={() => onSelectRole('therapist')}
            className="flex-1 py-4 px-6 bg-transparent border border-border text-muted text-sm font-medium tracking-wider uppercase rounded-sm hover:border-accent hover:text-accent transition-colors"
          >
            Soy terapeuta
          </button>
        </div>

        <p className="mt-4 text-xs text-dim">
          Pacientes: gratis · Terapeutas: suscripción mensual
        </p>
      </main>

      {/* How it works */}
      <section className="border-t border-border px-6 py-16 max-w-3xl mx-auto w-full">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-dim mb-10 text-center">
          Cómo funciona
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { n: '01', title: 'Haz el quiz', desc: 'Responde 7 preguntas para identificar qué corriente terapéutica encaja contigo.' },
            { n: '02', title: 'Define preferencias', desc: 'Género, modalidad (en línea o presencial) y zona. Tú decides qué importa.' },
            { n: '03', title: 'Conoce tus matches', desc: 'Te mostramos terapeutas reales cuyo perfil y corriente coinciden con lo que buscas.' },
          ].map(step => (
            <div key={step.n}>
              <p className="font-garamond italic text-3xl text-gold mb-3">{step.n}</p>
              <p className="text-sm font-medium text-ink mb-2">{step.title}</p>
              <p className="text-xs font-light text-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

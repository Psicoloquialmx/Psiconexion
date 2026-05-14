import { CORRIENTES } from '../../data/corrientes'

export default function TherapistDashboard({ user, profile, onEditProfile, onLogout }) {
  const corriente = profile?.corriente ? CORRIENTES[profile.corriente] : null

  return (
    <div className="min-h-screen bg-bg">
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between">
        <span className="font-garamond text-xl text-ink">Terapeutas·Mx</span>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted font-light hidden sm:block">{user.email}</span>
          <button
            onClick={onLogout}
            className="text-xs font-medium tracking-widest uppercase text-muted hover:text-accent transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8 pb-6 border-b border-border">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
            Panel de terapeuta
          </p>
          <h1 className="font-garamond text-4xl font-normal text-ink leading-tight">
            Hola, <em className="italic text-accent">{user.name.split(' ')[0]}</em>
          </h1>
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-block text-xs bg-green-50 border border-green-200 text-green-700 rounded-sm px-2.5 py-0.5 font-medium">
              ● Suscripción activa
            </span>
            {profile && (
              <span className="inline-block text-xs bg-gold/10 border border-gold/30 text-gold rounded-sm px-2.5 py-0.5 font-medium">
                Perfil publicado
              </span>
            )}
          </div>
        </div>

        {profile ? (
          <>
            {/* Profile preview */}
            <div className="bg-paper border border-border rounded-sm overflow-hidden shadow-sm mb-4">
              {corriente && (
                <div className="h-1" style={{ background: corriente.col }} />
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-garamond text-2xl text-ink font-normal">{profile.nombre}</p>
                    <p className="text-xs font-light text-muted mt-0.5">{profile.genero}{profile.rangoEdad ? ` · ${profile.rangoEdad} años` : ''}</p>
                  </div>
                  <div className="w-12 h-12 rounded-sm bg-border flex items-center justify-center">
                    <span className="font-garamond italic text-xl text-dim">
                      {profile.nombre.charAt(0)}
                    </span>
                  </div>
                </div>

                {corriente && (
                  <span
                    className="inline-block text-xs font-medium tracking-wider rounded-sm px-2.5 py-1 mb-4"
                    style={{ background: corriente.col + '15', color: corriente.col, border: `1px solid ${corriente.col}38` }}
                  >
                    {corriente.short}
                  </span>
                )}

                <p className="text-sm font-light text-muted leading-relaxed mb-4">{profile.bio}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {profile.especialidades?.map(e => (
                    <span key={e} className="text-xs border border-border text-muted px-2 py-0.5 rounded-sm">
                      {e}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 text-xs font-light text-muted pt-4 border-t border-border">
                  <span>📍 {profile.modalidad}{profile.zona ? ` · ${profile.zona}` : ''}</span>
                  {profile.precio > 0 && <span>💬 ${profile.precio} MXN/sesión</span>}
                  {profile.experiencia > 0 && <span>⏱ {profile.experiencia} años de exp.</span>}
                </div>
              </div>
            </div>

            <button
              onClick={onEditProfile}
              className="w-full py-3 bg-transparent border border-border text-muted text-xs font-medium tracking-widest uppercase rounded-sm hover:border-accent hover:text-accent transition-colors mb-4"
            >
              Editar perfil
            </button>
          </>
        ) : (
          <div className="bg-paper border border-border rounded-sm p-8 text-center shadow-sm mb-4">
            <p className="font-garamond text-2xl text-ink mb-3">Tu perfil está vacío</p>
            <p className="text-sm font-light text-muted mb-6">
              Completa tu perfil para que los pacientes puedan encontrarte.
            </p>
            <button
              onClick={onEditProfile}
              className="py-3 px-8 bg-ink text-bg text-xs font-medium tracking-widest uppercase rounded-sm hover:bg-accent transition-colors"
            >
              Completar perfil →
            </button>
          </div>
        )}

        <div className="bg-paper border border-border rounded-sm p-6 shadow-sm">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-dim mb-4">Tu suscripción</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink">Plan profesional — $350 MXN/mes</p>
              <p className="text-xs font-light text-muted mt-0.5">Se renueva el 22 de mayo de 2026</p>
            </div>
            <span className="text-xs bg-green-50 border border-green-200 text-green-700 rounded-sm px-2.5 py-1 font-medium">
              Activa
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

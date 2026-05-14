import { CORRIENTES } from '../../data/corrientes'

export default function TherapistCard({ therapist, onClick }) {
  const corriente = CORRIENTES[therapist.corriente]

  const modalidadIcon = therapist.modalidad === 'En línea' ? '🌐'
    : therapist.modalidad === 'Presencial' ? '📍' : '🌐 📍'

  return (
    <div
      onClick={() => onClick(therapist)}
      className="bg-paper border border-border rounded-sm overflow-hidden shadow-sm cursor-pointer
        hover:border-accent/50 hover:shadow-md transition-all group animate-emerge"
    >
      {/* Corriente color strip */}
      <div className="h-0.5" style={{ background: corriente?.col || '#e2ddd6' }} />

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p className="font-garamond text-xl text-ink group-hover:text-accent transition-colors">
              {therapist.nombre}
            </p>
            <p className="text-xs font-light text-muted mt-0.5">
              {therapist.genero}{therapist.rangoEdad ? ` · ${therapist.rangoEdad} años` : ''}
              {therapist.experiencia > 0 ? ` · ${therapist.experiencia} años exp.` : ''}
            </p>
          </div>
          <div className="w-10 h-10 rounded-sm bg-border flex items-center justify-center flex-shrink-0 ml-3">
            <span className="font-garamond italic text-lg text-dim">
              {therapist.nombre.charAt(0)}
            </span>
          </div>
        </div>

        {corriente && (
          <span
            className="inline-block text-xs font-medium tracking-wider rounded-sm px-2 py-0.5 mb-3"
            style={{ background: corriente.col + '15', color: corriente.col, border: `1px solid ${corriente.col}38` }}
          >
            {corriente.short}
          </span>
        )}

        <p className="text-xs font-light text-muted leading-relaxed line-clamp-2 mb-3">
          {therapist.bio}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {therapist.especialidades?.slice(0, 4).map(e => (
            <span key={e} className="text-xs border border-border text-muted px-2 py-0.5 rounded-sm">
              {e}
            </span>
          ))}
          {therapist.especialidades?.length > 4 && (
            <span className="text-xs text-dim px-1">+{therapist.especialidades.length - 4}</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-xs font-light text-muted">
            {modalidadIcon} {therapist.modalidad}
            {therapist.zona ? ` · ${therapist.colonia || therapist.zona}` : ''}
          </span>
          {therapist.precio > 0 && (
            <span className="text-xs font-medium text-muted">
              ${therapist.precio.toLocaleString()} <span className="font-light">MXN</span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

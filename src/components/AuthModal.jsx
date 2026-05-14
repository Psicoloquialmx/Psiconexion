import { useState } from 'react'

export default function AuthModal({ role, onClose, onSuccess, users, setUsers }) {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const label = role === 'therapist' ? 'terapeuta' : 'paciente'

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (mode === 'register') {
      if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
        return setError('Por favor completa todos los campos.')
      }
      const exists = users.find(u => u.email.toLowerCase() === form.email.toLowerCase())
      if (exists) return setError('Ya existe una cuenta con ese correo.')

      const newUser = {
        id: Date.now().toString(),
        name: form.name.trim(),
        email: form.email.toLowerCase().trim(),
        password: form.password,
        type: role,
        subscribed: false,
        profileComplete: false,
      }
      setUsers([...users, newUser])
      onSuccess(newUser)
    } else {
      if (!form.email.trim() || !form.password.trim()) {
        return setError('Por favor ingresa tu correo y contraseña.')
      }
      const user = users.find(
        u => u.email.toLowerCase() === form.email.toLowerCase() && u.password === form.password
      )
      if (!user) return setError('Correo o contraseña incorrectos.')
      if (user.type !== role) return setError(`Esta cuenta es de ${user.type === 'therapist' ? 'terapeuta' : 'paciente'}, no de ${label}.`)
      onSuccess(user)
    }
  }

  return (
    <div className="fixed inset-0 bg-ink/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-paper border border-border rounded-sm w-full max-w-md p-8 shadow-xl animate-emerge"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-2">
            {role === 'therapist' ? 'Acceso terapeutas' : 'Acceso pacientes'}
          </p>
          <h2 className="font-garamond text-3xl font-normal text-ink">
            {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </h2>
          <p className="text-xs font-light text-muted mt-1">
            {role === 'patient' && 'Completamente gratuito.'}
            {role === 'therapist' && mode === 'register' && 'Requiere suscripción para publicar tu perfil.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border border-border rounded-sm overflow-hidden mb-6">
          {['login', 'register'].map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError('') }}
              className={`flex-1 py-2.5 text-xs font-medium tracking-wider uppercase transition-colors
                ${mode === m ? 'bg-ink text-bg' : 'text-muted hover:text-ink'}`}
            >
              {m === 'login' ? 'Iniciar sesión' : 'Registrarme'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-dim mb-1.5">
                Nombre completo
              </label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full border border-border rounded-sm px-3 py-2.5 text-sm font-light text-ink bg-paper focus:outline-none focus:border-accent transition-colors"
                placeholder="Tu nombre"
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-dim mb-1.5">
              Correo electrónico
            </label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full border border-border rounded-sm px-3 py-2.5 text-sm font-light text-ink bg-paper focus:outline-none focus:border-accent transition-colors"
              placeholder="tu@correo.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-dim mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              className="w-full border border-border rounded-sm px-3 py-2.5 text-sm font-light text-ink bg-paper focus:outline-none focus:border-accent transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 font-light">{error}</p>
          )}

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-ink text-bg text-xs font-medium tracking-widest uppercase rounded-sm hover:bg-accent transition-colors"
          >
            {mode === 'login' ? 'Entrar' : 'Crear cuenta'}
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 w-full text-xs text-dim hover:text-muted transition-colors text-center"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}

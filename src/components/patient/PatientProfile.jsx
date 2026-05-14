import { useState } from 'react'

export default function PatientProfile({ onComplete, onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    reason: '',
  })

  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  function validate() {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido'
    if (!formData.age) newErrors.age = 'La edad es requerida'
    if (!formData.gender) newErrors.gender = 'Selecciona un género'
    if (!formData.reason.trim()) newErrors.reason = 'Cuéntanos por qué buscas terapia'
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onComplete(formData)
  }

  return (
    <div className="min-h-screen bg-bg">
      <nav className="border-b border-border px-6 py-4">
        <span className="font-garamond text-xl text-ink">Terapeutas·Mx</span>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12 pb-24">
        <div className="mb-8">
          <h1 className="font-garamond text-4xl text-ink mb-2">Tu Perfil</h1>
          <p className="text-ink-light">Cuéntanos un poco sobre ti para encontrar el terapeuta ideal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Nombre completo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Juan Pérez"
              className={`w-full px-4 py-3 border border-border rounded-lg bg-white text-ink placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.name ? 'border-red-500' : ''
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Edad */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Edad
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="25"
              min="18"
              max="120"
              className={`w-full px-4 py-3 border border-border rounded-lg bg-white text-ink placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.age ? 'border-red-500' : ''
              }`}
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>

          {/* Género */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Género
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-4 py-3 border border-border rounded-lg bg-white text-ink focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.gender ? 'border-red-500' : ''
              }`}
            >
              <option value="">Selecciona...</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
              <option value="prefiero-no-decir">Prefiero no decir</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>

          {/* Razón de búsqueda */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              ¿Por qué buscas terapia? (resumido)
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Ej: Manejo de ansiedad, problemas de relaciones, estrés laboral..."
              rows="4"
              className={`w-full px-4 py-3 border border-border rounded-lg bg-white text-ink placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent resize-none ${
                errors.reason ? 'border-red-500' : ''
              }`}
            />
            {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 px-6 py-3 border border-border text-ink rounded-lg hover:bg-gray-50 font-medium transition"
            >
              Atrás
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark font-medium transition"
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

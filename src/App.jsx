import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'

import Landing from './components/Landing'
import AuthModal from './components/AuthModal'
import Subscribe from './components/therapist/Subscribe'
import ProfileForm from './components/therapist/ProfileForm'
import TherapistDashboard from './components/therapist/TherapistDashboard'
import PatientProfile from './components/patient/PatientProfile'
import Quiz from './components/patient/Quiz'
import Preferences from './components/patient/Preferences'
import Results from './components/patient/Results'
import TherapistDetail from './components/patient/TherapistDetail'

// Screens:
// landing | auth | t-subscribe | t-profile-form | t-dashboard
// p-profile | p-quiz | p-preferences | p-results | p-detail

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [authRole, setAuthRole] = useState(null)
  const [currentUser, setCurrentUser] = useLocalStorage('dt_current_user', null)
  const [users, setUsers] = useLocalStorage('dt_users', [])
  const [therapistProfiles, setTherapistProfiles] = useLocalStorage('dt_therapist_profiles', [])
  const [patientProfiles, setPatientProfiles] = useLocalStorage('dt_patient_profiles', [])

  const [quizResult, setQuizResult] = useState(null)
  const [patientPrefs, setPatientPrefs] = useState(null)
  const [selectedTherapist, setSelectedTherapist] = useState(null)
  const [currentPatientId, setCurrentPatientId] = useState(null)

  // ── Helpers ──────────────────────────────────────────────────────────────
  function getProfile(userId) {
    return therapistProfiles.find(p => p.id === userId) || null
  }

  function saveProfile(profileData) {
    const existing = therapistProfiles.find(p => p.id === profileData.id)
    let next
    if (existing) {
      next = therapistProfiles.map(p => p.id === profileData.id ? profileData : p)
    } else {
      next = [...therapistProfiles, profileData]
    }
    setTherapistProfiles(next)

    // Mark user as profile complete
    const updatedUsers = users.map(u =>
      u.id === profileData.id ? { ...u, profileComplete: true } : u
    )
    setUsers(updatedUsers)
    if (currentUser?.id === profileData.id) {
      setCurrentUser({ ...currentUser, profileComplete: true })
    }
    setScreen('t-dashboard')
  }

  // ── Role selection from landing ──────────────────────────────────────────
  function handleRoleSelect(role) {
    if (role === 'patient') {
      // Patient: go to profile creation first
      const patientId = 'patient_' + Date.now()
      setCurrentPatientId(patientId)
      setScreen('p-profile')
    } else {
      // Therapist: need to auth first
      setAuthRole('therapist')
      setScreen('auth')
    }
  }

  // ── Auth success ─────────────────────────────────────────────────────────
  function handleAuthSuccess(user) {
    setCurrentUser(user)
    setScreen('auth-done') // triggers the screen logic below
    if (user.type === 'therapist') {
      if (!user.subscribed) {
        setScreen('t-subscribe')
      } else if (!user.profileComplete) {
        setScreen('t-profile-form')
      } else {
        setScreen('t-dashboard')
      }
    } else {
      setScreen('p-quiz')
    }
  }

  function handleSubscribe() {
    // Simulate subscription
    const updatedUsers = users.map(u =>
      u.id === currentUser.id ? { ...u, subscribed: true } : u
    )
    setUsers(updatedUsers)
    const updatedUser = { ...currentUser, subscribed: true }
    setCurrentUser(updatedUser)
    setScreen('t-profile-form')
  }

  function handleLogout() {
    setCurrentUser(null)
    setScreen('landing')
  }

  function handlePatientProfileComplete(profileData) {
    const profile = {
      id: currentPatientId,
      ...profileData,
      createdAt: new Date().toISOString()
    }
    setPatientProfiles([...patientProfiles, profile])
    setScreen('p-quiz')
  }

  // ── Render ────────────────────────────────────────────────────────────────
  if (screen === 'landing') {
    return (
      <>
        <Landing onSelectRole={handleRoleSelect} />
        {/* Floating login button for therapists who already have an account */}
      </>
    )
  }

  if (screen === 'auth') {
    return (
      <>
        <Landing onSelectRole={handleRoleSelect} />
        <AuthModal
          role={authRole}
          users={users}
          setUsers={setUsers}
          onClose={() => setScreen('landing')}
          onSuccess={handleAuthSuccess}
        />
      </>
    )
  }

  if (screen === 'p-profile') {
    return (
      <PatientProfile
        onComplete={handlePatientProfileComplete}
        onBack={() => setScreen('landing')}
      />
    )
  }

  if (screen === 't-subscribe') {
    return (
      <Subscribe
        user={currentUser}
        onSubscribe={handleSubscribe}
        onBack={() => setScreen('landing')}
      />
    )
  }

  if (screen === 't-profile-form') {
    return (
      <ProfileForm
        user={currentUser}
        existingProfile={getProfile(currentUser?.id)}
        onSave={saveProfile}
        onBack={() => setScreen('t-dashboard')}
      />
    )
  }

  if (screen === 't-dashboard') {
    return (
      <TherapistDashboard
        user={currentUser}
        profile={getProfile(currentUser?.id)}
        onEditProfile={() => setScreen('t-profile-form')}
        onLogout={handleLogout}
      />
    )
  }

  if (screen === 'p-quiz') {
    return (
      <Quiz
        onComplete={(result) => {
          setQuizResult(result)
          setScreen('p-preferences')
        }}
      />
    )
  }

  if (screen === 'p-preferences') {
    return (
      <Preferences
        quizResult={quizResult}
        onComplete={(prefs) => {
          setPatientPrefs(prefs)
          setScreen('p-results')
        }}
        onBack={() => setScreen('p-quiz')}
      />
    )
  }

  if (screen === 'p-results') {
    return (
      <Results
        quizResult={quizResult}
        prefs={patientPrefs || {}}
        registeredTherapists={users.filter(u => u.type === 'therapist' && u.subscribed && u.profileComplete).map(u => ({
          ...getProfile(u.id),
          email: u.email,
        })).filter(p => p && p.corriente)}
        onSelect={(t) => {
          setSelectedTherapist(t)
          setScreen('p-detail')
        }}
        onBack={() => setScreen('p-preferences')}
        onRetake={() => {
          setQuizResult(null)
          setPatientPrefs(null)
          setScreen('p-quiz')
        }}
      />
    )
  }

  if (screen === 'p-detail') {
    return (
      <TherapistDetail
        therapist={selectedTherapist}
        onBack={() => setScreen('p-results')}
      />
    )
  }

  return null
}

import { useState } from 'react'
import { Clapperboard } from 'lucide-react'
import ProfileFields from '../components/ProfileFields'
import { emptyProfile } from '../utils/profile'

export default function CreateProfile({ onCreate }) {
  const [draft, setDraft] = useState({ ...emptyProfile })
  const [error, setError] = useState('')

  function submit(event) {
    event.preventDefault()

    if (!draft.name.trim()) {
      setError('Digite um nome para criar seu perfil.')
      return
    }

    const saved = onCreate({
      name: draft.name.trim(),
      photo: draft.photo,
      created: true
    })

    if (!saved) {
      setError('Não foi possível salvar o perfil. Tente uma foto menor.')
    }
  }

  return (
    <div className="welcome-screen">
      <header className="welcome-header">
        <div className="welcome-logo">
          <Clapperboard size={29} />
          <span>Cine<strong>Coração</strong></span>
        </div>
      </header>

      <main className="welcome-main">
        <form className="welcome-card" onSubmit={submit}>
          <div className="welcome-card-heading">
            <h2>Criar perfil</h2>
          </div>

          <ProfileFields draft={draft} setDraft={setDraft} />

          {error && (
            <p className="onboarding-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary welcome-submit"
          >
            Criar perfil
          </button>
        </form>
      </main>
    </div>
  )
}

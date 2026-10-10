import { useEffect, useState } from 'react'
import { Pencil, X } from 'lucide-react'
import Avatar from './Avatar'
import ProfileFields from './ProfileFields'

export default function Profile({ movies, profile, setProfile }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(profile)
  const [error, setError] = useState('')

  const average = movies.length
    ? (
        movies.reduce(
          (sum, movie) => sum + Number(movie.rating || 0),
          0
        ) / movies.length
      ).toFixed(1)
    : '0.0'

  const favorites = movies.filter(
    movie => Number(movie.rating) === 5
  ).length

  const reviews = movies.filter(
    movie => movie.review?.trim()
  ).length

  function openEditor() {
    setDraft({ ...profile })
    setError('')
    setEditing(true)
  }

  function closeEditor() {
    setEditing(false)
    setError('')
  }

  function saveChanges(event) {
    event.preventDefault()

    if (!draft.name.trim()) {
      setError('O nome não pode ficar vazio.')
      return
    }

    const saved = setProfile({
      name: draft.name.trim(),
      photo: draft.photo,
      created: true
    })

    if (saved) {
      closeEditor()
    } else {
      setError('Não foi possível salvar. Tente uma foto menor.')
    }
  }

  useEffect(() => {
    if (!editing) return

    function handleEscape(event) {
      if (event.key === 'Escape') closeEditor()
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [editing])

  return (
    <>
      <section className="profile">
        <div className="profile-main">
          <Avatar photo={profile.photo} name={profile.name} />

          <div className="profile-info">
            <div className="profile-name-row">
              <h1>{profile.name}</h1>

              <button
                type="button"
                className="profile-edit-button"
                onClick={openEditor}
              >
                <Pencil size={13} />
                Editar perfil
              </button>
            </div>
          </div>
        </div>

        <div className="profile-stats">
          <div>
            <strong>{movies.length}</strong>
            <span>FILMES</span>
          </div>

          <div>
            <strong>{reviews}</strong>
            <span>RESENHAS</span>
          </div>

          <div>
            <strong>{favorites}</strong>
            <span>FAVORITOS</span>
          </div>

          <div>
            <strong>{average}</strong>
            <span>NOTA MÉDIA</span>
          </div>
        </div>
      </section>

      {editing && (
        <div
          className="modal-overlay"
          onClick={closeEditor}
        >
          <div
            className="profile-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Editar perfil"
            onClick={event => event.stopPropagation()}
          >
            <div className="modal-heading">
              <h2>Editar perfil</h2>

              <button
                type="button"
                onClick={closeEditor}
                aria-label="Fechar"
              >
                <X size={22} />
              </button>
            </div>

            <form className="profile-edit-form" onSubmit={saveChanges}>
              <ProfileFields draft={draft} setDraft={setDraft} />

              {error && (
                <p className="onboarding-error" role="alert">
                  {error}
                </p>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeEditor}
                >
                  Cancelar
                </button>

                <button type="submit" className="btn btn-primary">
                  Salvar alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

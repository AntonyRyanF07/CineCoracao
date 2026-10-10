import { Camera } from 'lucide-react'
import Avatar from './Avatar'
import { readImage } from '../utils/images'

export default function ProfileFields({ draft, setDraft }) {
  function choosePhoto(event) {
    readImage(event.target.files?.[0], photo => {
      setDraft(current => ({ ...current, photo }))
    })

    event.target.value = ''
  }

  return (
    <>
      <div className="profile-photo-editor">
        <Avatar
          photo={draft.photo}
          name={draft.name}
          className="editor-avatar"
        />

        <div className="photo-editor-actions">
          <label className="btn btn-secondary upload-button">
            <Camera size={16} />
            Escolher foto

            <input
              type="file"
              accept="image/*"
              onChange={choosePhoto}
            />
          </label>

          {draft.photo && (
            <button
              type="button"
              className="remove-photo"
              onClick={() => setDraft(current => ({
                ...current,
                photo: ''
              }))}
            >
              Remover foto
            </button>
          )}
        </div>
      </div>

      <label className="field">
        Nome do perfil *
        <input
          value={draft.name}
          maxLength={40}
          placeholder="Digite seu nome"
          onChange={event => setDraft(current => ({
            ...current,
            name: event.target.value
          }))}
          required
        />
      </label>
    </>
  )
}

import { UserRound } from 'lucide-react'

export default function Avatar({ photo, name, className = '' }) {
  return (
    <div className={`profile-avatar ${className}`}>
      {photo ? (
        <img src={photo} alt={`Foto de ${name || 'perfil'}`} />
      ) : (
        <span className="avatar-placeholder">
          <UserRound size={38} />
        </span>
      )}
    </div>
  )
}

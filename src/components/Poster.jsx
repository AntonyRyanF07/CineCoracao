import { Film } from 'lucide-react'

export default function Poster({ movie }) {
  return (
    <div className="poster">
      {movie.poster ? (
        <img
          src={movie.poster}
          alt={`Pôster de ${movie.title}`}
        />
      ) : (
        <div className="poster-empty">
          <Film size={36} />
          <span>{movie.title}</span>
        </div>
      )}
    </div>
  )
}

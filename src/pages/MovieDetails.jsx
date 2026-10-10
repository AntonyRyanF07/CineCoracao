import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Pencil, Trash2 } from 'lucide-react'
import Poster from '../components/Poster'
import Rating from '../components/Rating'
import NotFound from './NotFound'

export default function MovieDetails({ movies, deleteMovie }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const movie = movies.find(
    item => String(item.id) === id
  )

  if (!movie) return <NotFound />

  function remove() {
    if (window.confirm(`Excluir "${movie.title}"?`)) {
      const saved = deleteMovie(movie.id)

      if (saved) {
        navigate('/diario')
      }
    }
  }

  return (
    <div className="page-section">
      <Link to="/diario" className="back-link">
        <ArrowLeft size={17} />
        Voltar ao diário
      </Link>

      <div className="movie-details">
        <div className="details-poster">
          <Poster movie={movie} />
        </div>

        <div className="details-content">
          <span className="eyebrow">
            {movie.genre || 'FILME'}
          </span>

          <h1>{movie.title}</h1>

          <p className="details-meta">
            {movie.year || 'Ano desconhecido'}
            {movie.director && ` · Direção: ${movie.director}`}
          </p>

          <Rating value={movie.rating} />

          <p className="details-date">
            <CalendarDays size={16} />
            {movie.watchedAt
              ? new Date(
                  `${movie.watchedAt}T12:00:00`
                ).toLocaleDateString('pt-BR')
              : 'Data não informada'}
          </p>

          <div className="details-review">
            <h2>MINHA RESENHA</h2>

            <p>
              {movie.review || 'Nenhuma resenha escrita ainda.'}
            </p>
          </div>

          <div className="details-actions">
            <Link
              to={`/editar/${id}`}
              className="btn btn-primary"
            >
              <Pencil size={16} />
              Editar filme
            </Link>

            <button
              className="btn btn-secondary"
              onClick={remove}
            >
              <Trash2 size={16} />
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

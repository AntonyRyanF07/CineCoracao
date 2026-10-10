import { Link } from 'react-router-dom'
import Poster from './Poster'
import Rating from './Rating'

export default function MovieTile({ movie }) {
  return (
    <article className="movie-tile">
      <Link to={`/filme/${movie.id}`} className="tile-link">
        <Poster movie={movie} />
      </Link>

      <Link to={`/filme/${movie.id}`} className="tile-title">
        {movie.title}
      </Link>

      <div className="tile-year">
        {movie.year || 'Ano não informado'}
      </div>

      <Rating value={movie.rating} />
    </article>
  )
}

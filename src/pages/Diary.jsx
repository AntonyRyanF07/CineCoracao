import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import MovieTile from '../components/MovieTile'

export default function Diary({ movies }) {
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('Todos')
  const [sort, setSort] = useState('recent')

  const genres = [
    'Todos',
    ...new Set(movies.map(movie => movie.genre).filter(Boolean))
  ]

  const filtered = useMemo(() => {
    const result = movies.filter(movie => {
      const matchesText = `${movie.title} ${movie.director || ''}`
        .toLowerCase()
        .includes(search.toLowerCase())

      return matchesText && (
        genre === 'Todos' || movie.genre === genre
      )
    })

    return result.sort((a, b) => {
      if (sort === 'rating') {
        return Number(b.rating) - Number(a.rating)
      }

      if (sort === 'title') {
        return a.title.localeCompare(b.title)
      }

      return (b.watchedAt || '').localeCompare(a.watchedAt || '')
    })
  }, [movies, search, genre, sort])

  return (
    <div className="page-section">
      <div className="page-title">
        <div>
          <span className="eyebrow">SUA COLEÇÃO</span>
          <h1>Meu diário</h1>
          <p>{movies.length} filmes registrados</p>
        </div>

        <Link className="btn btn-primary" to="/adicionar">
          <Plus size={17} />
          Novo filme
        </Link>
      </div>

      <div className="filters">
        <label className="search-field">
          <Search size={18} />

          <input
            placeholder="Pesquisar filmes..."
            value={search}
            onChange={event => setSearch(event.target.value)}
          />
        </label>

        <select
          value={genre}
          onChange={event => setGenre(event.target.value)}
        >
          {genres.map(item => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={event => setSort(event.target.value)}
        >
          <option value="recent">Mais recentes</option>
          <option value="rating">Melhor avaliação</option>
          <option value="title">Ordem alfabética</option>
        </select>
      </div>

      {filtered.length ? (
        <div className="poster-grid diary-grid">
          {filtered.map(movie => (
            <MovieTile key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty-message">
          Nenhum filme encontrado.
        </div>
      )}
    </div>
  )
}

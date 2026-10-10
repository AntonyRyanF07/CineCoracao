import { Link, NavLink } from 'react-router-dom'
import Profile from '../components/Profile'
import MovieTile from '../components/MovieTile'
import Poster from '../components/Poster'
import Rating from '../components/Rating'
import Section from '../components/Section'

export default function Home({ movies, profile, setProfile }) {
  const recent = [...movies].sort(
    (a, b) => (b.watchedAt || '').localeCompare(a.watchedAt || '')
  )

  const favorites = movies.filter(
    movie => Number(movie.rating) === 5
  )

  return (
    <>
      <Profile
        movies={movies}
        profile={profile}
        setProfile={setProfile}
      />

      <nav className="profile-tabs">
        <NavLink to="/" end>Visão geral</NavLink>
        <NavLink to="/diario">Meu diário</NavLink>
      </nav>

      <div className="content-columns">
        <div className="primary-column">
          <Section title="FILMES RECENTES" action={<Link to="/diario">Ver todos →</Link>}>

            {recent.length ? (
              <div className="poster-grid">
                {recent.slice(0, 6).map(movie => (
                  <MovieTile key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="empty-message">
                Seu diário ainda não tem filmes.
                <Link to="/adicionar">
                  Adicionar primeiro filme
                </Link>
              </div>
            )}
          </Section>

          <Section title="ÚLTIMAS AVALIAÇÕES">

            <div className="review-list">
              {recent
                .filter(movie => movie.review?.trim())
                .slice(0, 3)
                .map(movie => (
                  <Link
                    to={`/filme/${movie.id}`}
                    className="review-item"
                    key={movie.id}
                  >
                    <div className="review-thumb">
                      <Poster movie={movie} />
                    </div>

                    <div>
                      <h3>
                        {movie.title} <span>{movie.year}</span>
                      </h3>

                      <Rating value={movie.rating} />
                      <p>{movie.review}</p>
                    </div>
                  </Link>
                ))}

              {!recent.some(movie => movie.review?.trim()) && (
                <p className="muted">
                  Suas resenhas aparecerão aqui.
                </p>
              )}
            </div>
          </Section>
        </div>

        <aside className="right-column">
          <section className="sidebar-panel">
            <div className="section-heading">
              <h2>SOBRE O DIÁRIO</h2>
            </div>

            <p>
              Um espaço para guardar os filmes que você
              assistiu e o que sentiu ao vê-los.
            </p>
          </section>

          <section className="sidebar-panel">
            <div className="section-heading">
              <h2>FAVORITOS</h2>
            </div>

            {favorites.length ? (
              <div className="mini-posters">
                {favorites.slice(0, 4).map(movie => (
                  <Link
                    to={`/filme/${movie.id}`}
                    key={movie.id}
                    title={movie.title}
                  >
                    <Poster movie={movie} />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="muted">
                Filmes com nota 5 aparecerão aqui.
              </p>
            )}
          </section>

          <section className="sidebar-panel">
            <div className="section-heading">
              <h2>REGISTRO RECENTE</h2>
            </div>

            {recent.slice(0, 4).map(movie => (
              <Link
                className="activity-item"
                key={movie.id}
                to={`/filme/${movie.id}`}
              >
                <span>{movie.title}</span>
                <small>{movie.watchedAt || 'Sem data'}</small>
              </Link>
            ))}
          </section>
        </aside>
      </div>
    </>
  )
}

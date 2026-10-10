import { useState } from 'react'
import { readMovies, saveMovies } from './data'
import { loadProfile, PROFILE_KEY } from './utils/profile'
import CreateProfile from './pages/CreateProfile'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  const [movies, setMovies] = useState(readMovies)
  const [profile, setProfileState] = useState(loadProfile)

  function updateProfile(next) {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(next))
      setProfileState(next)
      return true
    } catch {
      return false
    }
  }

  function persistMovies(next) {
    try {
      saveMovies(next)
      setMovies(next)
      return true
    } catch {
      alert(
        'Não foi possível salvar os filmes. Tente usar um pôster menor.'
      )
      return false
    }
  }

  function addMovie(movie) {
    return persistMovies([movie, ...movies])
  }

  function updateMovie(updated) {
    return persistMovies(
      movies.map(movie =>
        movie.id === updated.id ? updated : movie
      )
    )
  }

  function deleteMovie(id) {
    return persistMovies(
      movies.filter(movie => movie.id !== id)
    )
  }

  if (!profile.created) {
    return <CreateProfile onCreate={updateProfile} />
  }

  return (
    <AppRoutes
      movies={movies}
      profile={profile}
      updateProfile={updateProfile}
      addMovie={addMovie}
      updateMovie={updateMovie}
      deleteMovie={deleteMovie}
    />
  )
}

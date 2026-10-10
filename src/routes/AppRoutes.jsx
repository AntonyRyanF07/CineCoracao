import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Diary from '../pages/Diary'
import MovieForm from '../pages/MovieForm'
import MovieDetails from '../pages/MovieDetails'
import NotFound from '../pages/NotFound'

export default function AppRoutes({ movies, profile, updateProfile, addMovie, updateMovie, deleteMovie }) {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home movies={movies} profile={profile} setProfile={updateProfile} />} />
        <Route path="diario" element={<Diary movies={movies} />} />
        <Route path="adicionar" element={<MovieForm movies={movies} addMovie={addMovie} updateMovie={updateMovie} />} />
        <Route path="editar/:id" element={<MovieForm movies={movies} addMovie={addMovie} updateMovie={updateMovie} />} />
        <Route path="filme/:id" element={<MovieDetails movies={movies} deleteMovie={deleteMovie} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

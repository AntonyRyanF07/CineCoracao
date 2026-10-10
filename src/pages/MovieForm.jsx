import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Film, Camera } from 'lucide-react'
import Rating from '../components/Rating'
import NotFound from './NotFound'
import { readImage } from '../utils/images'

function createBlankMovie() {
  return {
    title: '',
    year: '',
    director: '',
    genre: 'Drama',
    watchedAt: new Date().toLocaleDateString('en-CA'),
    rating: 3,
    poster: '',
    review: ''
  }
}

export default function MovieForm({ movies, addMovie, updateMovie }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const editing = Boolean(id)
  const existing = movies.find(
    movie => String(movie.id) === id
  )

  const [form, setForm] = useState(
    () => existing || createBlankMovie()
  )

  const [error, setError] = useState('')

  useEffect(() => {
    setForm(existing || createBlankMovie())
    setError('')
  }, [id])

  if (editing && !existing) return <NotFound />

  function change(event) {
    setForm(current => ({
      ...current,
      [event.target.name]: event.target.value
    }))
  }

  function choosePoster(event) {
    readImage(event.target.files?.[0], poster => {
      setForm(current => ({ ...current, poster }))
    })

    event.target.value = ''
  }

  function submit(event) {
    event.preventDefault()

    if (!form.title.trim()) {
      setError('Digite o título do filme.')
      return
    }

    const movie = {
      ...form,
      title: form.title.trim(),
      rating: Number(form.rating),
      id: editing ? existing.id : crypto.randomUUID()
    }

    const saved = editing
      ? updateMovie(movie)
      : addMovie(movie)

    if (!saved) return

    navigate(editing ? `/filme/${id}` : '/diario')
  }

  return (
    <div className="page-section form-page">
      <Link
        className="back-link"
        to={editing ? `/filme/${id}` : '/diario'}
      >
        <ArrowLeft size={17} />
        Voltar
      </Link>

      <div className="page-title">
        <div>
          <span className="eyebrow">CINECORAÇÃO</span>
          <h1>{editing ? 'Editar filme' : 'Registrar filme'}</h1>
          <p>Adicione os detalhes da sua experiência.</p>
        </div>
      </div>

      <form className="movie-form" onSubmit={submit}>
        <div className="form-layout">
          <div className="poster-editor">
            <div className="poster-preview">
              {form.poster ? (
                <img
                  src={form.poster}
                  alt="Prévia do pôster"
                />
              ) : (
                <div className="poster-empty">
                  <Film size={45} />
                  <span>Sem pôster</span>
                </div>
              )}
            </div>

            <label className="btn btn-secondary upload-button">
              <Camera size={17} />
              Escolher pôster

              <input
                type="file"
                accept="image/*"
                onChange={choosePoster}
              />
            </label>

            <small>
              Selecione uma imagem do computador.
            </small>
          </div>

          <div className="form-fields">
            <label className="field">
              Título do filme *
              <input
                name="title"
                value={form.title}
                onChange={change}
                placeholder="Nome do filme"
              />

              {error && (
                <small className="field-error">{error}</small>
              )}
            </label>

            <div className="form-row">
              <label className="field">
                Ano
                <input
                  name="year"
                  value={form.year}
                  onChange={change}
                  placeholder="2026"
                />
              </label>

              <label className="field">
                Diretor
                <input
                  name="director"
                  value={form.director}
                  onChange={change}
                  placeholder="Nome do diretor"
                />
              </label>
            </div>

            <div className="form-row">
              <label className="field">
                Gênero
                <select
                  name="genre"
                  value={form.genre}
                  onChange={change}
                >
                  {[
                    'Drama', 'Ação', 'Animação', 'Aventura',
                    'Comédia', 'Documentário', 'Fantasia',
                    'Ficção científica', 'Romance',
                    'Suspense', 'Terror', 'Outro'
                  ].map(item => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label className="field">
                Data em que assistiu
                <input
                  type="date"
                  name="watchedAt"
                  value={form.watchedAt}
                  onChange={change}
                />
              </label>
            </div>

            <label className="field">
              URL do pôster (opcional)
              <input
                name="poster"
                value={
                  form.poster?.startsWith('data:')
                    ? ''
                    : form.poster || ''
                }
                onChange={change}
                placeholder="https://..."
              />
            </label>

            <div className="field">
              Sua avaliação

              <div className="rating-picker">
                <Rating
                  value={form.rating}
                  onChange={rating => setForm(current => ({
                    ...current,
                    rating
                  }))}
                />

                <strong>{form.rating}/5</strong>
              </div>
            </div>

            <label className="field">
              Sua resenha
              <textarea
                name="review"
                value={form.review}
                onChange={change}
                rows={5}
                placeholder="O que achou do filme?"
              />
            </label>
          </div>
        </div>

        <div className="form-actions">
          <Link to="/diario" className="btn btn-secondary">
            Cancelar
          </Link>

          <button type="submit" className="btn btn-primary">
            {editing ? 'Salvar alterações' : 'Adicionar ao diário'}
          </button>
        </div>
      </form>
    </div>
  )
}

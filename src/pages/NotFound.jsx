import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="empty-message">
      <h1>Página não encontrada</h1>

      <Link to="/" className="btn btn-primary">
        Voltar ao início
      </Link>
    </div>
  )
}

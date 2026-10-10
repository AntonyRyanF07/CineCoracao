import { Link, NavLink } from 'react-router-dom'
import { Plus, Clapperboard } from 'lucide-react'

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="logo" to="/">
          <Clapperboard size={25} />
          <span>Cine<strong>Coração</strong></span>
        </Link>

        <nav className="header-nav">
          <NavLink to="/" end>Início</NavLink>
          <NavLink to="/diario">Diário</NavLink>
        </nav>

        <Link className="btn btn-primary" to="/adicionar">
          <Plus size={17} />
          <span>Adicionar filme</span>
        </Link>
      </div>
    </header>
  )
}

import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Rating from '../components/Rating'
import Poster from '../components/Poster'
import Section from '../components/Section'
import NotFound from '../pages/NotFound'

afterEach(cleanup)

describe('Componentes do CineCoração', () => {
  it('renderiza cinco botões de avaliação', () => {
    render(<Rating value={3} />)
    expect(screen.getAllByRole('button')).toHaveLength(5)
    expect(screen.getByRole('button', { name: '3 de 5 corações' })).toBeInTheDocument()
  })

  it('chama onChange ao clicar em um coração', () => {
    let selected = 0
    render(<Rating value={2} onChange={value => { selected = value }} />)
    fireEvent.click(screen.getByRole('button', { name: '5 de 5 corações' }))
    expect(selected).toBe(5)
  })

  it('mostra o título quando o filme não tem pôster', () => {
    render(<Poster movie={{ title: 'Filme Teste', poster: '' }} />)
    expect(screen.getByText('Filme Teste')).toBeInTheDocument()
  })

  it('renderiza o children de uma seção', () => {
    render(<Section title="FILMES"><p>Conteúdo de teste</p></Section>)
    expect(screen.getByText('FILMES')).toBeInTheDocument()
    expect(screen.getByText('Conteúdo de teste')).toBeInTheDocument()
  })

  it('mostra a página 404', () => {
    render(<MemoryRouter><NotFound /></MemoryRouter>)
    expect(screen.getByText('Página não encontrada')).toBeInTheDocument()
  })
})

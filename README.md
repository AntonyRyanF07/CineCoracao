Nome: Antony Ryan Pereira da Silva

Aplicação web de diário pessoal de filmes, desenvolvida com React e Vite.


## Funcionalidades

- Criação e edição de um perfil local (nome e foto)
- Cadastro, edição e exclusão de filmes
- Upload de pôsteres, avaliações de 1 a 5 corações e resenhas
- Diário com pesquisa, filtro por gênero e ordenação
- Estatísticas e favoritos
- Persistência no `localStorage` do navegador
- Página 404 para endereços não encontrados

## Tecnologias e requisitos React

- React: componentes reutilizáveis e props
- `children`: componente `Section` usado na página inicial
- `useState` e `useEffect`: formulários, edição de perfil e estado
- Renderização condicional, `.map()` e `key`: listas e estados vazios
- React Router DOM: várias páginas e layout com `<Outlet />`
- Vitest e React Testing Library: cinco testes automatizados

## Instalação

É necessário ter Node.js e npm instalados. No terminal, na pasta do projeto:

```bash
npm install
npm run dev
```

Abra a URL exibida pelo Vite (normalmente `http://localhost:5173`).

No PowerShell, se `npm` estiver bloqueado, utilize `npm.cmd install` e `npm.cmd run dev`.

## Testes

```bash
npm run test -- --run
```

Ou, no PowerShell:

```powershell
npm.cmd run test -- --run
```

Os cinco testes estão em `src/tests/components.test.jsx` e verificam renderização de corações, clique de avaliação, pôster sem imagem, `children` e página 404.

## Build

```bash
npm run build
```
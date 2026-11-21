import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <p className="eyebrow">Erreur 404</p>
      <h1>Page introuvable</h1>
      <Link className="button button-orange" to="/">
        Retour à l’accueil
      </Link>
    </main>
  )
}

export default NotFoundPage

import boaTechLogo from '../assets/logo.jpeg'
import { Link } from 'react-router-dom'

function RegisterPage() {
  return (
    <section className="auth-card" aria-labelledby="register-title">
      <Link className="auth-brand" to="/" aria-label="BOA TECH, accueil">
        <img src={boaTechLogo} alt="BOA Tech" />
      </Link>
      <p className="eyebrow">Espace client</p>
      <h1 id="register-title">Créer un compte</h1>
      <p className="auth-description">
        La création de compte sera disponible dans une prochaine étape.
      </p>
      <Link className="button button-orange auth-submit" to="/login">
        Aller à la connexion
      </Link>
      <Link className="auth-back-link" to="/">
        Retour à l’accueil
      </Link>
    </section>
  )
}

export default RegisterPage

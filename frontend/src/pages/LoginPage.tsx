import { useEffect, useRef, useState, type FormEvent } from 'react'
import boaTechLogo from '../assets/logo.jpeg'
import { Link } from 'react-router-dom'

interface RecaptchaApi {
  ready: (callback: () => void) => void
  execute: (siteKey: string, options: { action: string }) => Promise<string>
}

declare global {
  interface Window {
    grecaptcha?: RecaptchaApi
  }
}

let recaptchaApiPromise: Promise<RecaptchaApi> | undefined

function loadRecaptchaApi(siteKey: string): Promise<RecaptchaApi> {
  if (window.grecaptcha) {
    return Promise.resolve(window.grecaptcha)
  }

  if (!recaptchaApiPromise) {
    recaptchaApiPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`
      script.async = true
      script.defer = true
      script.onload = () => {
        if (window.grecaptcha) {
          resolve(window.grecaptcha)
        } else {
          recaptchaApiPromise = undefined
          reject(new Error('reCAPTCHA API was not initialized'))
        }
      }
      script.onerror = () => {
        recaptchaApiPromise = undefined
        reject(new Error('reCAPTCHA script could not be loaded'))
      }
      document.head.appendChild(script)
    })
  }

  return recaptchaApiPromise
}

function LoginPage() {
  const root = document.getElementById('root')
  const siteKey = root?.dataset.recaptchaSiteKey ?? ''
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [recaptchaError, setRecaptchaError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const recaptchaTokenRef = useRef<HTMLInputElement>(null)
  const submissionInProgress = useRef(false)

  useEffect(() => {
    if (!siteKey) {
      return
    }

    let isMounted = true
    loadRecaptchaApi(siteKey).catch(() => {
      if (isMounted) {
        setRecaptchaError(
          'Google reCAPTCHA n’a pas pu être chargé. Vérifiez la connexion réseau et les bloqueurs de contenu.',
        )
      }
    })

    return () => {
      isMounted = false
    }
  }, [siteKey])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (submissionInProgress.current) {
      return
    }

    submissionInProgress.current = true
    setIsSubmitting(true)
    setRecaptchaError('')

    let stage = 'chargement du script Google'
    try {
      if (!siteKey) {
        setRecaptchaError('La clé publique reCAPTCHA est absente de la configuration du serveur.')
        submissionInProgress.current = false
        setIsSubmitting(false)
        return
      }

      const recaptcha = await loadRecaptchaApi(siteKey)
      stage = 'création du jeton de connexion'
      const token = await new Promise<string>((resolve, reject) => {
        recaptcha.ready(() => {
          recaptcha.execute(siteKey, { action: 'login' }).then(resolve, reject)
        })
      })

      if (!token || !recaptchaTokenRef.current || !formRef.current) {
        throw new Error('reCAPTCHA did not return a token')
      }

      recaptchaTokenRef.current.value = token
      formRef.current.submit()
    } catch (error) {
      console.error(`Échec reCAPTCHA pendant le ${stage}.`, error)
      submissionInProgress.current = false
      setIsSubmitting(false)
      setRecaptchaError(
        stage === 'chargement du script Google'
          ? 'Google reCAPTCHA n’a pas pu être chargé. Vérifiez la connexion réseau et les bloqueurs de contenu.'
          : 'Google reCAPTCHA n’a pas pu créer le jeton. Vérifiez que la clé du site est de type v3 et autorisée pour ce domaine.',
      )
    }
  }

  return (
    <section className="auth-card" aria-labelledby="login-title">
      <Link className="auth-brand" to="/" aria-label="BOA TECH, accueil">
        <img src={boaTechLogo} alt="BOA Tech" />
      </Link>
      <p className="eyebrow">Espace administration</p>
      <h1 id="login-title">Connexion</h1>
      <p className="auth-description">
        Connectez-vous pour accéder à votre tableau de bord.
      </p>

      {root?.dataset.loginError === '1' && (
        <p className="auth-error" role="alert">
          Adresse e-mail ou mot de passe incorrect.
        </p>
      )}
      {(recaptchaError || !siteKey) && (
        <p className="auth-error" role="alert">
          {recaptchaError || 'La clé publique reCAPTCHA est absente de la configuration du serveur.'}
        </p>
      )}

      <form
        ref={formRef}
        className="auth-form"
        method="post"
        action="/login"
        onSubmit={handleSubmit}
      >
        <label htmlFor="login-email">Adresse e-mail</label>
        <input
          id="login-email"
          type="email"
          name="email"
          autoComplete="email"
          defaultValue={root?.dataset.lastUsername ?? ''}
          required
          autoFocus
        />

        <label htmlFor="login-password">Mot de passe</label>
        <div className="password-field">
          <input
            id="login-password"
            type={isPasswordVisible ? 'text' : 'password'}
            name="password"
            autoComplete="current-password"
            required
          />
          <button
            className="password-visibility"
            type="button"
            aria-label={isPasswordVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            aria-pressed={isPasswordVisible}
            onClick={() => setIsPasswordVisible((visible) => !visible)}
          >
            {isPasswordVisible ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8" />
                <path d="M9.9 5.2A10.8 10.8 0 0112 5c5.5 0 9 7 9 7a15.7 15.7 0 01-3.1 3.8M6.2 6.2C3.9 7.8 2 12 2 12s3.5 7 10 7a10 10 0 004.1-.9" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

        <input
          type="hidden"
          name="_csrf_token"
          value={root?.dataset.loginCsrfToken ?? ''}
        />
        <input ref={recaptchaTokenRef} type="hidden" name="_recaptcha_token" value="" />

        <label className="remember-me">
          <input type="checkbox" name="_remember_me" value="1" />
          Se souvenir de moi
        </label>

        <button className="button button-orange auth-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Vérification…' : 'Se connecter'}
        </button>
      </form>
      <Link className="auth-back-link" to="/">
        Retour à l’accueil
      </Link>
    </section>
  )
}

export default LoginPage

import { useEffect, useState } from 'react'
import boaTechLogo from './assets/logo.jpeg'
import './App.css'

type Category = {
  name: string
  image: string
}

type Product = {
  name: string
  category: string
  price: number
  oldPrice?: number
  badge?: string
  image: string
  rating: number
}

type Service = {
  title: string
  description: string
  icon: string
}

type Training = {
  title: string
  level: string
  duration: string
  price: number
  badge?: string
  image: string
}

type Testimonial = {
  quote: string
  author: string
  role: string
}

type HomePageData = {
  categories: Category[]
  products: Product[]
  services: Service[]
  trainings: Training[]
  testimonials: Testimonial[]
  commitments: { title: string; description: string; icon: string }[]
}

const formatPrice = (price: number) =>
  `${new Intl.NumberFormat('fr-FR').format(price)} GNF`

function App() {
  const [data, setData] = useState<HomePageData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [cartCount] = useState(3)

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/homepage', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur serveur (${response.status})`)
        }

        return response.json() as Promise<HomePageData>
      })
      .then(setData)
      .catch((requestError: unknown) => {
        if (requestError instanceof Error && requestError.name === 'AbortError') {
          return
        }

        setError(
          requestError instanceof Error
            ? requestError.message
            : 'Impossible de charger la page d’accueil.',
        )
      })

    return () => controller.abort()                      
  }, [])

  return (
    <>
      <div className="topbar">
        <div className="topbar-inner">
          <span>Livraison disponible à Conakry et dans toutes les régions de Guinée</span>
          <div className="topbar-contact">
            <a href="tel:+224624000000">+224 624 89 57 07</a>
            <a href="mailto:contact@boatech.gn">boatech38@gmail.com</a>
          </div>
        </div>
      </div>

      <header className="site-header">
        <a className="brand" href="/" aria-label="BOA TECH, accueil">
          <img className="brand-logo" src={boaTechLogo}  alt="BOA Tech" />
        </a>
        <nav className="main-nav" aria-label="Navigation principale">
          <a className="active" href="/">Accueil</a>
          <a href="#produits">Boutique</a>
          <a href="#formations">Formations</a>
          <a href="#services">Services</a>
          <a href="#engagements">À propos</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="header-actions">
          <a className="icon-button" href="#produits" aria-label="Rechercher">⌕</a>
          <a className="icon-button account-icon" href="#contact" aria-label="Mon compte">♙</a>
          <a className="icon-button cart-icon" href="#produits" aria-label={`Panier, ${cartCount} articles`}>
            ♧<span>{cartCount}</span>
          </a>
          <a className="button button-orange header-cta" href="#produits">Voir la boutique</a>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Technologie · Commerce · Numérique</p>
            <h1>Votre partenaire en technologie, commerce et solutions numériques</h1>
            <p className="hero-description">
              BOA TECH vous accompagne dans votre transformation digitale — formations
              spécialisées, développement de solutions sur mesure, conseil en
              digitalisation et boutique de produits de qualité.
            </p>
            <div className="hero-buttons">
              <a className="button button-orange" href="#produits">Découvrir nos produits <span>→</span></a>
              <a className="button button-outline" href="#services">Nos services</a>
            </div>
            <div className="hero-stats">
              <div><strong>10+</strong><span>ans d’expérience</span></div>
              <div><strong>500+</strong><span>clients satisfaits</span></div>
              <div><strong>50+</strong><span>formations dispensées</span></div>
            </div>
          </div>
          <div className="hero-art" role="img" aria-label="Illustration numérique et technologique">
            <div className="circuit-glow" />
            <div className="circuit-chip"><span>BT</span></div>
            <div className="hero-product-note"><span className="status-dot" /> Nouveau produit <strong>MacBook Pro M3</strong></div>
          </div>
        </section>

        <section className="section categories-section">
          <SectionHeading eyebrow="Parcourir" title="Nos catégories" action="Tout voir" href="#produits" />
          {error && <LoadError message={error} />}
          {!data && !error && <p className="loading-message">Chargement du catalogue…</p>}
          {data && (
            <div className="category-grid">
              {data.categories.map((category) => (
                <a className="category-card" href="#produits" key={category.name} style={{ backgroundImage: `linear-gradient(0deg, rgba(7, 18, 37, .68), transparent 70%), url("${category.image}")` }}>
                  <span>{category.name}</span>
                </a>
              ))}
            </div>
          )}
        </section>

        <section className="section products-section" id="produits">
          <SectionHeading eyebrow="Sélection" title="Produits en vedette" action="Voir tout" href="#produits" />
          {data && (
            <>
              <div className="product-grid">
                {data.products.map((product) => (
                  <article className="product-card" key={product.name}>
                    <a className="product-image" href="#produits" style={{ backgroundImage: `url("${product.image}")` }} aria-label={`Découvrir ${product.name}`}>
                      {product.badge && <span className="product-badge">{product.badge}</span>}
                      <button className="favorite-button" type="button" aria-label={`Ajouter ${product.name} aux favoris`}>♡</button>
                    </a>
                    <div className="product-info">
                      <span className="product-category">{product.category}</span>
                      <h3>{product.name}</h3>
                      <div className="rating" aria-label={`Note : ${product.rating} sur 5`}>{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</div>
                      <div className="product-prices">
                        <strong>{formatPrice(product.price)}</strong>
                        {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <a className="button button-navy centered-button" href="#produits">Voir toute la boutique <span>→</span></a>
            </>
          )}
        </section>

        <section className="section services-section" id="services">
          <div className="services-intro">
            <p className="eyebrow">Nos expertises</p>
            <h2>Services numériques</h2>
            <p>BOA TECH accompagne entreprises et particuliers dans leur transformation numérique.</p>
            <a className="button button-orange" href="#contact">Voir nos services <span>→</span></a>
          </div>
          {data && (
            <div className="services-grid">
              {data.services.map((service) => (
                <article className="service-card" key={service.title}>
                  <span className="service-icon" aria-hidden="true">{service.icon}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="section trainings-section" id="formations">
          <SectionHeading eyebrow="Compétences" title="Nos formations phares" />
          {data && (
            <div className="training-grid">
              {data.trainings.map((training) => (
                <article className="training-card" key={training.title}>
                  <div className="training-image" style={{ backgroundImage: `url("${training.image}")` }}>
                    {training.badge && <span className="product-badge">{training.badge}</span>}
                  </div>
                  <div className="training-info">
                    <h3>{training.title}</h3>
                    <div><span>{training.level} · {training.duration}</span><strong>{formatPrice(training.price)}</strong></div>
                  </div>
                </article>
              ))}
            </div>
          )}
          <a className="button button-outline-dark centered-button" href="#formations">Voir toutes les formations</a>
        </section>

        <section className="promo-banner">
          <div>
            <p className="eyebrow">Offre spéciale — rentrée digitale 2026</p>
            <h2>Jusqu’à 25 % de réduction sur<br />tous nos appareils informatiques</h2>
          </div>
          <a className="button button-white" href="#produits">Profiter de l’offre</a>
        </section>

        <section className="section commitments-section" id="engagements">
          <SectionHeading eyebrow="Nos engagements" title="Pourquoi choisir BOA TECH ?" />
          {data && (
            <div className="commitment-grid">
              {data.commitments.map((item) => (
                <article className="commitment-card" key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="section testimonials-section">
          <SectionHeading eyebrow="Ils nous font confiance" title="Ce que disent nos clients" />
          {data && (
            <div className="testimonial-grid">
              {data.testimonials.map((testimonial) => (
                <blockquote className="testimonial-card" key={testimonial.author}>
                  <span className="quote-mark">“</span>
                  <p>{testimonial.quote}</p>
                  <div className="rating" aria-label="Note : 5 sur 5">★★★★★</div>
                  <footer><strong>{testimonial.author}</strong><span>{testimonial.role}</span></footer>
                </blockquote>
              ))}
            </div>
          )}
        </section>

        <section className="contact-banner" id="contact">
          <p className="eyebrow">Parlons de votre projet</p>
          <h2>Un projet ? Un besoin ?<br />BOA TECH vous accompagne.</h2>
          <p>Que ce soit pour un projet digital, une formation ou l’achat de matériel, notre<br className="desktop-break" /> équipe est prête à vous conseiller.</p>
          <div className="hero-buttons">
            <a className="button button-orange" href="mailto:contact@boatech.gn">Demander un devis <span>→</span></a>
            <a className="button button-outline" href="tel:+224625000000">Nous contacter</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand brand-light" href="/" aria-label="BOA TECH, accueil"><img className="brand-logo" src={boaTechLogo} alt="BOA Tech" /></a>
            <p>Votre partenaire en technologie, commerce et solutions numériques en Guinée.</p>
          </div>
          <div><h3>Navigation</h3><a href="/">Accueil</a><a href="#produits">Boutique</a><a href="#formations">Formations</a><a href="#services">Services</a></div>
          <div><h3>Catégories</h3><a href="#produits">Technologie</a><a href="#produits">Informatique</a><a href="#produits">Maison & bureau</a><a href="#produits">Mode</a></div>
          <div><h3>Services</h3><a href="#services">Développement web</a><a href="#services">Formation digitale</a><a href="#services">Conseil numérique</a><a href="#services">Communication digitale</a></div>
          <div><h3>Contact</h3><a href="tel:+224625000000">+224 625 00 00 00</a><a href="mailto:contact@boatech.gn">contact@boatech.gn</a><span>Conakry, Guinée</span></div>
        </div>
        <div className="footer-bottom"><span>© 2026 BOA TECH. Tous droits réservés.</span><div><a href="#contact">Confidentialité</a><a href="#contact">Conditions générales</a></div></div>
      </footer>
    </>
  )
}

function SectionHeading({ eyebrow, title, action, href }: { eyebrow: string; title: string; action?: string; href?: string }) {
  return (
    <div className="section-heading">
      <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>
      {action && href && <a className="text-link" href={href}>{action} <span>→</span></a>}
    </div>
  )
}

function LoadError({ message }: { message: string }) {
  return <p className="load-error" role="alert">Le contenu n’a pas pu être chargé : {message}</p>
}

export default App

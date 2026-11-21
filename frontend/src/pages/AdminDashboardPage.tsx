import { useEffect, useState } from 'react'
import boaTechLogo from '../assets/logo.jpeg'
import { fallbackDashboardData, getDashboardData } from '../services/dashboardService'

const navigationSections = [
  {
    title: '',
    items: [{ label: 'Tableau de bord', icon: '▦', active: true }, { label: 'Vue générale', icon: '⌂' }],
  },
  {
    title: 'CATALOGUE',
    items: [
      { label: 'Produits', icon: '⬡' },
      { label: 'Catégories', icon: '▱' },
      { label: 'Stocks', icon: '▤' },
    ],
  },
  {
    title: 'VENTES',
    items: [
      { label: 'Commandes', icon: '🛒' },
      { label: 'Paiements', icon: '▣' },
      { label: 'Livraisons', icon: '▰' },
      { label: 'Clients', icon: '♟' },
    ],
  },
  {
    title: 'FORMATIONS',
    items: [
      { label: 'Formations', icon: '▣' },
      { label: 'Inscriptions', icon: '▤' },
    ],
  },
  {
    title: 'SERVICES',
    items: [
      { label: 'Prestations', icon: '⚒' },
      { label: 'Demandes de devis', icon: '▧' },
    ],
  },
  {
    title: 'MARKETING',
    items: [
      { label: 'Promotions', icon: '♧' },
      { label: 'Blog', icon: '▤' },
    ],
  },
  {
    title: 'ADMINISTRATION',
    items: [
      { label: 'Utilisateurs', icon: '♟' },
      { label: 'Statistiques', icon: '▥' },
      { label: 'Paramètres', icon: '⚙' },
    ],
  },
]

function AdminDashboardPage() {
  const [dashboardData, setDashboardData] = useState(fallbackDashboardData)
  const root = document.getElementById('root')
  const userIdentifier = root?.dataset.userIdentifier ?? ''
  const logoutToken = root?.dataset.logoutCsrfToken ?? ''

  useEffect(() => {
    const controller = new AbortController()

    getDashboardData(controller.signal)
      .then(setDashboardData)
      .catch(() => {
        setDashboardData(fallbackDashboardData)
      })

    return () => controller.abort()
  }, [])

  const { summaryCards, orders, bestSellers, stockAlerts, orderBreakdown } = dashboardData

  return (
    <main className="admin-content dashboard-page">
      <aside className="dashboard-sidebar">
        <a className="dashboard-logo" href="/" aria-label="BOA TECH, accueil">
          <img src={boaTechLogo} alt="" />
          <span><strong>BOA TECH</strong><small>Commerce · Formation</small></span>
        </a>

        <nav className="dashboard-nav" aria-label="Navigation administration">
          {navigationSections.map((section, index) => (
            <div className="dashboard-nav-section" key={section.title || 'home'}>
              {section.title && <p className="dashboard-nav-title">{section.title}</p>}
              {section.items.map((item) => (
                <a
                  className={`dashboard-nav-item${item.active ? ' active' : ''}`}
                  href="#"
                  key={item.label}
                >
                  <span aria-hidden="true">{item.icon}</span>
                  {item.label}
                </a>
              ))}
              {index === 0 && <span className="dashboard-nav-divider" />}
            </div>
          ))}
        </nav>

        <div className="dashboard-sidebar-user">
          <span className="user-avatar">AO</span>
          <span><strong>Alpha Oumar</strong><small>Super administrateur</small></span>
          <span className="user-chevron">⌄</span>
        </div>

        <form className="dashboard-logout-form" method="post" action="/logout">
          <input type="hidden" name="_csrf_token" value={logoutToken} />
          <button type="submit" className="dashboard-logout-button">
            Déconnexion
          </button>
        </form>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div className="dashboard-breadcrumb">
            <span aria-hidden="true">⌂</span>
            <span>›</span>
            <span>Administration</span>
            <span>›</span>
            <strong>Tableau de bord</strong>
          </div>
          <div className="dashboard-header-actions">
            <label className="dashboard-search">
              <span aria-hidden="true">⌕</span>
              <input aria-label="Rechercher" placeholder="Rechercher..." />
            </label>
            <button type="button" className="notification-button" aria-label="Notifications, 3 non lues">
              ♧<span>3</span>
            </button>
            <span className="header-avatar" aria-label={userIdentifier || 'Administrateur'}>AO</span>
            <button type="button" className="header-menu" aria-label="Menu du compte">⌄</button>
          </div>
        </header>

        <div className="dashboard-body">
          <div className="dashboard-title-row">
            <div>
              <h1>Tableau de bord</h1>
              <p>Bienvenue dans votre espace d’administration BOA TECH.</p>
            </div>
            <div className="dashboard-title-actions">
              <button type="button" className="dashboard-period">▦ <span>Ce mois</span>⌄</button>
              <button type="button" className="dashboard-add-button">＋ <span>Ajouter un produit</span></button>
            </div>
          </div>

          <section className="dashboard-summary" aria-label="Indicateurs clés">
            {summaryCards.map((card) => (
              <article className="dashboard-summary-card" key={card.title}>
                <div className={`summary-icon ${card.tone}`}>{card.icon}</div>
                <div className="summary-copy">
                  <span>{card.title}</span>
                  <strong>{card.value}</strong>
                  {card.change && <small>↗ {card.change}</small>}
                </div>
                <svg className={`summary-sparkline ${card.tone}`} viewBox="0 0 70 28" aria-hidden="true">
                  <polyline points={card.points} />
                </svg>
              </article>
            ))}
          </section>

          <section className="dashboard-charts">
            <article className="dashboard-panel revenue-panel">
              <div className="dashboard-panel-heading">
                <h2><span className="heading-icon orange">▥</span>Évolution des ventes</h2>
                <span className="chart-legend"><i />Chiffre d'affaires</span>
              </div>
              <svg className="revenue-chart" viewBox="0 0 480 172" role="img" aria-label="Évolution du chiffre d’affaires de janvier à octobre">
                <defs>
                  <linearGradient id="sales-area" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#f47a24" stopOpacity=".22" />
                    <stop offset="100%" stopColor="#f47a24" stopOpacity=".02" />
                  </linearGradient>
                </defs>
                {[24, 50, 76, 102, 128].map((y, index) => (
                  <g key={y}>
                    <line x1="44" x2="468" y1={y} y2={y} className="chart-grid-line" />
                    <text x="0" y={y + 4} className="chart-axis-label">{50 - index * 10}M</text>
                  </g>
                ))}
                <text x="0" y="154" className="chart-axis-label">0 GNF</text>
                <path d="M44 111 L91 86 L138 78 L185 59 L232 69 L279 52 L326 43 L373 37 L420 32 L467 18 L467 128 L44 128 Z" fill="url(#sales-area)" />
                <polyline points="44,111 91,86 138,78 185,59 232,69 279,52 326,43 373,37 420,32 467,18" className="sales-line" />
                {[[44, 111], [91, 86], [138, 78], [185, 59], [232, 69], [279, 52], [326, 43], [373, 37], [420, 32], [467, 18]].map(([x, y]) => (
                  <circle cx={x} cy={y} r="3" className="sales-point" key={`${x}-${y}`} />
                ))}
                {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct'].map((month, index) => (
                  <text x={44 + index * 47} y="151" textAnchor="middle" className="chart-month-label" key={month}>{month}</text>
                ))}
              </svg>
            </article>

            <article className="dashboard-panel breakdown-panel">
              <div className="dashboard-panel-heading">
                <h2><span className="heading-icon orange">◉</span>Répartition des commandes</h2>
              </div>
              <div className="order-breakdown">
                <div className="orders-donut">
                  <div><strong>128</strong><span>Commandes</span></div>
                </div>
                <ul className="order-legend">
                  {orderBreakdown.map((item) => (
                    <li key={item.label}>
                      <i className={item.tone} />
                      <span>{item.label}</span>
                      <strong>{item.count}</strong>
                      <small>({item.percentage})</small>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </section>

          <section className="dashboard-lower">
            <article className="dashboard-panel recent-orders-panel">
              <div className="dashboard-panel-heading">
                <h2><span className="heading-icon orange">🛒</span>Commandes récentes</h2>
                <a href="#">Voir toutes les commandes <span>→</span></a>
              </div>
              <div className="orders-table-wrap">
                <table className="dashboard-orders-table">
                  <thead>
                    <tr><th>N° commande</th><th>Client</th><th>Date</th><th>Montant</th><th>Statut</th></tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{order.date}</td>
                        <td>{order.amount}</td>
                        <td><span className={`order-status ${order.tone}`}>{order.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="dashboard-panel best-sellers-panel">
              <div className="dashboard-panel-heading">
                <h2><span className="heading-icon trophy">♜</span>Produits les plus vendus</h2>
              </div>
              <div className="best-sellers-list">
                {bestSellers.map((product) => (
                  <div className="best-seller" key={product.name}>
                    <span className={`product-thumb ${product.tone}`}>{product.icon}</span>
                    <span><strong>{product.name}</strong><small>{product.sales}</small></span>
                  </div>
                ))}
              </div>
            </article>

            <article className="dashboard-panel stock-alerts-panel">
              <div className="dashboard-panel-heading">
                <h2><span className="heading-icon red">⚠</span>Alertes de stock</h2>
              </div>
              <div className="stock-alert-list">
                {stockAlerts.map((item) => (
                  <div className="stock-alert" key={item.name}>
                    <span className="product-thumb">{item.icon}</span>
                    <span><strong>{item.name}</strong><small>{item.detail}</small></span>
                  </div>
                ))}
              </div>
              <a className="stock-alert-link" href="#">Voir toutes les alertes <span>→</span></a>
            </article>
          </section>
        </div>
      </section>
    </main>
  )
}

export default AdminDashboardPage

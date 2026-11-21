export type DashboardTone = 'orange' | 'blue' | 'red'

export interface DashboardSummaryCard {
  title: string
  value: string
  change?: string
  icon: string
  tone: DashboardTone
  points: string
}

export interface DashboardOrder {
  id: string
  customer: string
  date: string
  amount: string
  status: string
  tone: 'confirmed' | 'preparing' | 'shipping' | 'delivered'
}

export interface DashboardProduct {
  icon: string
  name: string
  sales: string
  tone: string
}

export interface DashboardStockAlert {
  icon: string
  name: string
  detail: string
}

export interface DashboardBreakdownItem {
  label: string
  count: number
  percentage: string
  tone: 'waiting' | 'confirmed' | 'shipping' | 'delivered'
}

export interface DashboardData {
  summaryCards: DashboardSummaryCard[]
  orders: DashboardOrder[]
  bestSellers: DashboardProduct[]
  stockAlerts: DashboardStockAlert[]
  orderBreakdown: DashboardBreakdownItem[]
}

export const fallbackDashboardData: DashboardData = {
  summaryCards: [
    {
      title: "Chiffre d'affaires",
      value: '48 750 000 GNF',
      change: '+12,8%',
      icon: '↗',
      tone: 'orange',
      points: '0,22 14,17 27,19 40,13 54,14 68,6',
    },
    {
      title: 'Commandes',
      value: '128',
      change: '+8,2%',
      icon: '🛒',
      tone: 'blue',
      points: '0,24 14,21 27,14 41,17 55,8 68,5',
    },
    {
      title: 'Clients',
      value: '358',
      change: '+6,4%',
      icon: '♟',
      tone: 'orange',
      points: '0,23 14,19 27,21 41,12 55,15 68,7',
    },
    {
      title: 'Produits',
      value: '247',
      icon: '⬡',
      tone: 'blue',
      points: '0,23 14,20 28,16 42,20 55,10 68,6',
    },
    {
      title: 'Stock faible',
      value: '8',
      icon: '!',
      tone: 'red',
      points: '0,22 14,19 27,21 41,14 55,17 68,5',
    },
  ],
  orders: [
    {
      id: 'BT-2026-00128',
      customer: 'Mamadou Camara',
      date: '30/10/2026 10:45',
      amount: '750 000 GNF',
      status: 'Confirmée',
      tone: 'confirmed',
    },
    {
      id: 'BT-2026-00127',
      customer: 'Aissatou Diallo',
      date: '29/10/2026 16:20',
      amount: '1 200 000 GNF',
      status: 'En préparation',
      tone: 'preparing',
    },
    {
      id: 'BT-2026-00126',
      customer: 'Abdoulaye Bah',
      date: '29/10/2026 12:10',
      amount: '890 000 GNF',
      status: 'En livraison',
      tone: 'shipping',
    },
    {
      id: 'BT-2026-00125',
      customer: 'Kadiatou Barry',
      date: '28/10/2026 11:30',
      amount: '620 000 GNF',
      status: 'Livrée',
      tone: 'delivered',
    },
  ],
  bestSellers: [
    { icon: '💻', name: 'Ordinateur Portable HP', sales: '245 ventes', tone: 'laptop' },
    { icon: '🎧', name: 'Écouteurs Bluetooth', sales: '198 ventes', tone: 'headphones' },
    { icon: '📱', name: 'Smartphone Samsung', sales: '176 ventes', tone: 'phone' },
  ],
  stockAlerts: [
    { icon: '👟', name: 'Chaussures Nike', detail: 'Stock faible : 5 unités' },
    { icon: '⌚', name: 'Montre Connectée', detail: 'Stock faible : 3 unités' },
  ],
  orderBreakdown: [
    { label: 'En attente', count: 18, percentage: '14,1%', tone: 'waiting' },
    { label: 'Confirmées', count: 52, percentage: '40,6%', tone: 'confirmed' },
    { label: 'En livraison', count: 34, percentage: '26,6%', tone: 'shipping' },
    { label: 'Livrées', count: 24, percentage: '18,8%', tone: 'delivered' },
  ],
}

export async function getDashboardData(signal: AbortSignal): Promise<DashboardData> {
  const response = await fetch('/api/admin/dashboard', { signal })

  if (!response.ok) {
    if (response.status === 404) {
      return fallbackDashboardData
    }

    throw new Error(`Erreur serveur (${response.status})`)
  }

  const payload = (await response.json()) as Partial<DashboardData>

  return {
    ...fallbackDashboardData,
    ...payload,
    summaryCards: payload.summaryCards ?? fallbackDashboardData.summaryCards,
    orders: payload.orders ?? fallbackDashboardData.orders,
    bestSellers: payload.bestSellers ?? fallbackDashboardData.bestSellers,
    stockAlerts: payload.stockAlerts ?? fallbackDashboardData.stockAlerts,
    orderBreakdown: payload.orderBreakdown ?? fallbackDashboardData.orderBreakdown,
  }
}

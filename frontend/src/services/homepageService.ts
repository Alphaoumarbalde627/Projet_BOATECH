import type { HomePageData } from '../types/homepage'

export async function getHomePageData(signal: AbortSignal): Promise<HomePageData> {
  const response = await fetch('/api/homepage', { signal })

  if (!response.ok) {
    throw new Error(`Erreur serveur (${response.status})`)
  }

  return response.json() as Promise<HomePageData>
}

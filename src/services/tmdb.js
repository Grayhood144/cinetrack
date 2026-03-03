const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE = 'https://api.themoviedb.org/3'
export const IMG_BASE = 'https://image.tmdb.org/t/p/w500'
export const IMG_THUMB = 'https://image.tmdb.org/t/p/w200'

async function tmdbFetch(path, params = {}) {
  const url = new URL(`${BASE}${path}`)
  url.searchParams.set('api_key', API_KEY)
  url.searchParams.set('language', 'en-US')
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`)
  return res.json()
}

export async function searchMulti(query) {
  if (!query.trim()) return []
  const data = await tmdbFetch('/search/multi', { query, include_adult: false })
  return data.results.filter(r => r.media_type === 'movie' || r.media_type === 'tv')
}

export async function getMovieDetails(id) {
  return tmdbFetch(`/movie/${id}`, { append_to_response: 'credits' })
}

export async function getTVDetails(id) {
  return tmdbFetch(`/tv/${id}`, { append_to_response: 'credits' })
}

export async function getTrending() {
  const data = await tmdbFetch('/trending/all/week')
  return data.results.filter(r => r.media_type === 'movie' || r.media_type === 'tv').slice(0, 12)
}

export function getGenreNames(genreIds, genreList) {
  return genreIds
    .map(id => genreList.find(g => g.id === id)?.name)
    .filter(Boolean)
    .slice(0, 2)
}

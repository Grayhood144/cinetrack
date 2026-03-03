import {
  doc, setDoc, deleteDoc, updateDoc,
  collection, onSnapshot, serverTimestamp
} from 'firebase/firestore'
import { db } from './firebase'

function watchlistRef(userId, tmdbId) {
  return doc(db, 'users', userId, 'watchlist', String(tmdbId))
}

export function subscribeToWatchlist(userId, callback) {
  const col = collection(db, 'users', userId, 'watchlist')
  return onSnapshot(col, snap => {
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    callback(items)
  })
}

export async function addToWatchlist(userId, movie) {
  const ref = watchlistRef(userId, movie.tmdbId)
  await setDoc(ref, {
    ...movie,
    status: 'want_to_watch',
    rating: null,
    review: '',
    addedAt: serverTimestamp(),
    watchedAt: null,
  })
}

export async function removeFromWatchlist(userId, tmdbId) {
  await deleteDoc(watchlistRef(userId, tmdbId))
}

export async function updateStatus(userId, tmdbId, status) {
  await updateDoc(watchlistRef(userId, tmdbId), {
    status,
    watchedAt: status === 'watched' ? serverTimestamp() : null,
  })
}

export async function updateRatingReview(userId, tmdbId, rating, review) {
  await updateDoc(watchlistRef(userId, tmdbId), { rating, review })
}

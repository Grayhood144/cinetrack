# 🎬 CineTrack

**Track what you watch. Remember what you loved.**

CineTrack is a full-stack web application that lets you search movies and TV shows, build a personal watchlist, rate and review titles, and view your watch history — all synced to your account across any device.

---

## Planned Features

1. **Search Movies & TV Shows** — Instant search powered by The Movie Database (TMDB) API with poster cards and key details
2. **Watchlist Management** — Add and remove titles; organize by status: *Want to Watch*, *Currently Watching*, or *Watched*
3. **Ratings & Reviews** — Rate each title 1–5 stars and write a short personal review
4. **Filter & Sort** — Filter your watchlist by status or genre; sort by date added, title, or rating
5. **User Profile & Stats** — See your total watch count, average rating, and most-watched genres at a glance
6. **User Authentication** — Secure sign-up, login, and logout with session persistence across browser refreshes
7. **Cloud Sync** — All data saved to Firebase Firestore — your watchlist follows you to any device

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Routing | React Router v6 |
| Authentication | Firebase Auth (email/password) |
| Database | Firebase Firestore |
| Movie Data | TMDB API (free tier) |
| Styling | Plain CSS / CSS Modules |
| Deployment | Netlify |

---

## Setup Instructions

### Prerequisites
- Node.js 18+
- A free [Firebase](https://firebase.google.com/) account
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### Install & Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/cinetrack.git
cd cinetrack
npm install
```

Create a `.env` file in the project root:

```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_TMDB_API_KEY=your_tmdb_key
```

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Known Bugs / Limitations

- TMDB images require a valid API key; without one, movie posters will not load
- Genre filtering on watchlist uses raw genre IDs (from TMDB) rather than genre names

---

## What I Learned

Working with Claude Code on this project changed how I think about development. The biggest lesson was how much planning upfront — designing the Firestore schema, deciding on the feature list, choosing Firebase over localStorage — saved time during the actual build. By the time I was writing components, all the hard decisions were already made.

I also learned that AI tools are most useful when you ask specific questions and give real context. When I said "I need filter and sort on the watchlist page," the output was much better than "make the watchlist better." The iterative back-and-forth — asking follow-up questions, pushing back on suggestions I didn't need — produced cleaner code than any single big prompt would have.

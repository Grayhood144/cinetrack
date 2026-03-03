# Transcript Highlights

Key moments from the AI-assisted development of CineTrack.

---

### 1. Planning the project architecture (Session 1, early)

Before writing any code, I worked with Claude to choose the tech stack and plan the full feature list. We discussed using Firebase Firestore instead of localStorage because the assignment required user-specific cloud data. Claude laid out the full Firestore data structure (`users/{userId}/watchlist/{tmdbId}`) and I approved it before a single file was created — which made the rest of the build go smoothly.

---

### 2. Choosing the right TMDB credential (Session 1, setup)

When setting up the TMDB API, Claude asked whether I wanted the API Key (v3) or the API Read Access Token (v4). Rather than just picking one, Claude explained the difference — the v3 key is simpler for URL query parameters while v4 uses Bearer headers. I chose v3 for simplicity. This is an example of Claude giving me options and explaining trade-offs instead of just deciding for me.

---

### 3. Deciding against Firebase Hosting (Session 1, setup)

When registering the Firebase web app, the console offered to set up Firebase Hosting. Claude told me to skip it entirely because we were already deploying to Netlify. This was a moment where I pushed back on what the default flow suggested and Claude confirmed the right call — avoiding unnecessary complexity.

---

### 4. Debugging the Netlify deployment (Session 1, near end)

After deploying, the app needed the `_redirects` file added to the `public/` folder so React Router navigation worked on Netlify (without it, direct URL visits return 404). Claude caught this proactively and added the file before it became a problem. I also had to add all 7 environment variables manually to Netlify's dashboard — Claude walked me through each one.

---

### 5. Firebase Auth domain authorization (Session 1, end)

After deployment, Claude flagged that the Netlify domain needed to be added to Firebase's authorized domains list, otherwise login would fail in production. This was a step I never would have thought of on my own. It's a good example of Claude understanding the full deployment picture, not just the code.

# Movie Mates

A modern movie discovery app with social features — discover movies, track your watchlist, get recommendations, and connect with friends who share your taste.

## Tech stack

- **Frontend:** React 18 + TypeScript + Vite
- **Routing:** React Router
- **API:** [TMDB](https://www.themoviedb.org/) (add your API key)
- **Planned:** Firebase Auth, Firestore, notifications

## Quick start

1. **Install and run**
   ```bash
   npm install
   npm run dev
   ```
2. **Optional — real movie data**  
   Copy `.env.example` to `.env` and add your [TMDB API key](https://www.themoviedb.org/settings/api):
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set `VITE_TMDB_API_KEY=your_key`. Without it, the app shows placeholder data.

3. Open [http://localhost:5173](http://localhost:5173).

## Project structure

```
src/
  App.tsx           # Layout + bottom nav + routes
  main.tsx          # Entry
  index.css         # Cinematic dark theme
  pages/            # Home, Search, Watchlist, Friends, Profile
  services/         # TMDB API client
  types/            # Shared types
```

## Tabs

| Tab        | Purpose                                      |
|-----------|----------------------------------------------|
| Home      | Trending, popular, top rated, hero banner   |
| Search    | Search by title, genre, actor (wire-up TMDB) |
| Watchlist | Saved movies (persist with Firebase later)  |
| Friends   | Movie Mates social (add friends, activity)  |
| Profile   | Auth placeholder (Firebase Auth later)      |

## Docs

- [docs/FEATURES.md](docs/FEATURES.md) — System features list
- [docs/ERD.md](docs/ERD.md) — Database / ERD notes
- [docs/UI-SCREENS.md](docs/UI-SCREENS.md) — UI screen list

## Next steps

- Add Firebase Auth (Google/Facebook) and profile
- Wire Search to TMDB `search/movie`
- Add Movie Details page (poster, trailer, cast, reviews)
- Persist watchlist in Firestore
- Add friends, activity feed, and recommendations
"# moviemates" 

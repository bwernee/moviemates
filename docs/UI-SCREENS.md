# Movie Mates — UI Screen List

Netflix-inspired, mobile-first. Bottom nav: **Home · Search · Watchlist · Friends · Profile**.

---

## 1. Home

- **Header:** App title / “Movie Mates”.
- **Hero banner:** One featured movie (backdrop, title, short description). Tap → Movie Details.
- **Sections (horizontal carousels):**
  - Trending now
  - Popular this week
  - Top rated
- **Movie card:** Poster, title, year, rating. Tap → Movie Details.
- **Bottom nav:** Always visible.

---

## 2. Search

- **Search bar:** By title, genre, or actor (placeholder / wired to TMDB).
- **Filters (future):** Year, rating, genre chips.
- **Results:** Grid or list of movie cards. Tap → Movie Details.
- **Empty state:** “Type to search” or “No results”.

---

## 3. Movie Details (future)

- **Backdrop** with gradient overlay.
- **Poster** (optional side or below).
- **Title, year, duration, genres.**
- **Synopsis.**
- **Trailer** (embed or link).
- **Cast & director.**
- **Actions:** Add to Watchlist, Rate, Share.
- **Ratings & reviews:** List of user reviews, “Add review” CTA.
- **Bottom nav:** Optional (or back to previous tab).

---

## 4. Watchlist

- **Title:** “Watchlist”.
- **List:** Saved movies (poster, title, “Watched” badge, remove).
- **Empty state:** “No movies yet” + CTA to browse.
- **Filters (future):** All / To watch / Watched.

---

## 5. Friends (Movie Mates)

- **Title:** “Movie Mates” or “Friends”.
- **Add friend:** Input (email/username) + send request.
- **Tabs or sections:** Friends list · Activity feed · Requests.
- **Activity feed:** “X watched/rated Y” with movie card.
- **Friend row:** Avatar, name, “View watchlist” / “Recommend”.
- **Empty state:** “Add friends to see their activity”.

---

## 6. Profile

- **Avatar, display name, bio.** (When logged in.)
- **Stats (optional):** Movies watched, reviews count.
- **Settings:** Notifications, privacy, theme.
- **Sign out.**
- **Logged-out state:** “Sign in” (Google / Facebook / email).

---

## 7. Auth flows (future)

- **Login / Sign up:** Email + password or OAuth buttons.
- **Forgot password:** Email reset.
- **Onboarding (optional):** Pick genres, connect friends.

---

## 8. Notifications (future)

- **In-app list:** Unread first; tap to open movie/friend/recommendation.
- **Push:** New release, friend activity, recommendation (FCM).

---

## Design tokens (reference)

- **Theme:** Dark, cinematic (black/dark gray, red accent).
- **Nav:** Bottom bar, 5 items; active state = accent color.
- **Cards:** Rounded, shadow, hover scale.
- **Typography:** Clear hierarchy (title, section title, body, meta).

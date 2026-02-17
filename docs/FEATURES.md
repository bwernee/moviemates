# Movie Mates — System Features List

## 1. User Authentication

| Feature | Description | Status |
|--------|-------------|--------|
| Sign up | Email/password registration | Planned |
| Login | Email/password sign in | Planned |
| Google login | OAuth with Google | Planned |
| Facebook login | OAuth with Facebook | Planned |
| User profile | Avatar, display name, bio | Planned |
| Logout | Sign out | Planned |

---

## 2. Home Dashboard

| Feature | Description | Status |
|--------|-------------|--------|
| Trending movies | TMDB trending/week | ✅ |
| Popular this week | TMDB popular | ✅ |
| Top rated | TMDB top_rated | ✅ |
| Hero / upcoming banner | Featured movie banner | ✅ |
| Horizontal carousels | Scrollable movie rows | ✅ |

---

## 3. Movie Search

| Feature | Description | Status |
|--------|-------------|--------|
| Search by title | TMDB search/movie | Service ready |
| Filter by year | Query params | Planned |
| Filter by rating | Query params | Planned |
| Filter by genre | Genre IDs | Planned |
| Voice search | Optional advanced | Future |

---

## 4. Movie Details Page

| Feature | Description | Status |
|--------|-------------|--------|
| Poster & backdrop | Images from TMDB | Planned |
| Trailer | Video embed (e.g. YouTube) | Planned |
| Synopsis | Overview | Planned |
| Cast & director | Credits API | Planned |
| Genre & duration | Metadata | Planned |
| Ratings & reviews | User reviews (Firestore) | Planned |

---

## 5. Ratings & Reviews

| Feature | Description | Status |
|--------|-------------|--------|
| 1–5 star rating | Per user per movie | Planned |
| Written review | Optional comment | Planned |
| Like / react to reviews | Reactions | Planned |
| Aggregate display | Average + count | Planned |

---

## 6. Watchlist / Favorites

| Feature | Description | Status |
|--------|-------------|--------|
| Save to watchlist | Add movie | UI only |
| Mark as watched | Status toggle | Planned |
| Remove from list | Delete | Planned |
| Manage list | Reorder, filters | Planned |
| Persist | Firestore | Planned |

---

## 7. Social (Movie Mates)

| Feature | Description | Status |
|--------|-------------|--------|
| Add friends | By username / email / social | Planned |
| Friends’ watchlists | View (with privacy) | Planned |
| Activity feed | What friends watched/rated | Planned |
| Recommend to friend | Send recommendation | Planned |

---

## 8. AI Recommendations

| Feature | Description | Status |
|--------|-------------|--------|
| Based on watch history | Watched movies | Future |
| Based on genres | Liked genres | Future |
| Based on ratings | Ratings given | Future |
| “For you” section | Personalized row | Future |

---

## 9. Notifications

| Feature | Description | Status |
|--------|-------------|--------|
| New releases | When followed movie releases | Planned |
| Friend activity | Friend watched/rated | Planned |
| Recommendations | Friend recommended | Planned |
| Push / in-app | Firebase Cloud Messaging | Planned |

---

## Optional / Advanced

| Feature | Description |
|--------|-------------|
| Movie quizzes / trivia | Gamification |
| Watch party sync | Sync playback with friends |
| In-app streaming | Deep links to providers |
| Mood-based picker | “I feel like…” → suggestions |

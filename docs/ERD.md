# Movie Mates — Database / ERD

Suggested entities for **Firestore** (or MongoDB). TMDB data is fetched via API and not stored as primary source; we store user-specific and social data.

---

## Core entities

### `users`

| Field | Type | Description |
|-------|------|-------------|
| uid | string | Firebase Auth UID (doc id) |
| email | string | Email |
| displayName | string | Display name |
| photoURL | string | Avatar URL |
| bio | string? | Short bio |
| createdAt | timestamp | |
| updatedAt | timestamp | |

---

### `watchlists` (subcollection: `users/{uid}/watchlists` or single doc)

| Field | Type | Description |
|-------|------|-------------|
| movieId | number | TMDB movie id |
| addedAt | timestamp | |
| watched | boolean | Marked as watched |
| watchedAt | timestamp? | When marked watched |
| rating | number? | 1–5 |
| note | string? | User note |

*Alternative:* One doc per user with `items: array of { movieId, addedAt, watched, … }`.

---

### `reviews` (collection)

| Field | Type | Description |
|-------|------|-------------|
| userId | string | Author uid |
| movieId | number | TMDB movie id |
| rating | number | 1–5 |
| text | string? | Review text |
| likes | number | Count of likes |
| createdAt | timestamp | |
| updatedAt | timestamp | |

---

### `review_likes`

| Field | Type | Description |
|-------|------|-------------|
| reviewId | string | Doc id of review |
| userId | string | Who liked |
| createdAt | timestamp | |

---

### `friends` (subcollection: `users/{uid}/friends`)

| Field | Type | Description |
|-------|------|-------------|
| friendId | string | UID of friend |
| status | enum | pending | accepted |
| createdAt | timestamp | |
| updatedAt | timestamp | |

---

### `recommendations` (collection or subcollection)

| Field | Type | Description |
|-------|------|-------------|
| fromUserId | string | Who sent |
| toUserId | string | Who receives |
| movieId | number | TMDB movie id |
| message | string? | Optional note |
| createdAt | timestamp | |
| read | boolean | |

---

### `notifications` (subcollection: `users/{uid}/notifications`)

| Field | Type | Description |
|-------|------|-------------|
| type | string | release | friend_activity | recommendation |
| title | string | |
| body | string? | |
| data | map? | movieId, fromUserId, etc. |
| read | boolean | |
| createdAt | timestamp | |

---

## Relationships (logical)

- **User** → has one **Profile** (same doc).
- **User** → has one **Watchlist** (doc or subcollection).
- **User** → has many **Reviews** (query by `userId`).
- **User** → has many **Friends** (subcollection).
- **User** → has many **Notifications** (subcollection).
- **Review** → has many **Review_likes** (query by `reviewId`).
- **Recommendation** → from one User, to one User, about one Movie (TMDB id).

---

## TMDB (external API, not stored as primary)

- Movies, cast, images, trailers: fetched from TMDB and optionally cached in app state or a small cache collection (e.g. `movies/{movieId}`) for offline or performance.

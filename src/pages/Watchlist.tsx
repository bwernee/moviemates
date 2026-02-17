export default function Watchlist() {
  return (
    <div>
      <h1 className="page-title">Watchlist</h1>
      <div className="empty-state">
        <div className="empty-state-icon">📌</div>
        <p>No movies in your watchlist yet.</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Save movies from Home or Search to watch later.
        </p>
      </div>
    </div>
  )
}

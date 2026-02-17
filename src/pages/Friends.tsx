export default function Friends() {
  return (
    <div>
      <h1 className="page-title">Movie Mates</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        See what friends are watching and share recommendations.
      </p>
      <div className="empty-state">
        <div className="empty-state-icon">👥</div>
        <p>Add friends to see their watchlists and activity.</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Connect with Facebook or search by username (when auth is set up).
        </p>
      </div>
    </div>
  )
}

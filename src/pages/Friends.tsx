import { UsersIcon } from '../components/Icons'

export default function Friends() {
  return (
    <div>
      <h1 className="page-title">Movie Mates</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
        See what friends are watching and share recommendations.
      </p>
      <div className="empty-state">
        <UsersIcon className="empty-state-icon" />
        <p>Add friends to see their watchlists and activity.</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
          Connect with Facebook or search by username (when auth is set up).
        </p>
      </div>
    </div>
  )
}

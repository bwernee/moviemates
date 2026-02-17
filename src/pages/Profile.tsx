export default function Profile() {
  return (
    <div>
      <h1 className="page-title">Profile</h1>
      <div className="empty-state">
        <div className="empty-state-icon">👤</div>
        <p>Sign in to manage your profile and preferences.</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Google / Facebook login and profile with avatar & bio (Firebase Auth).
        </p>
        <button type="button" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Sign in (placeholder)
        </button>
      </div>
    </div>
  )
}

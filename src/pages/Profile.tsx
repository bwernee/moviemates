import { useEffect, useState } from 'react'
import { UserIcon } from '../components/Icons'

interface UserProfile {
  displayName: string
  bio: string
  avatar: string
  createdAt: string
}

export default function Profile() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [watchlistCount, setWatchlistCount] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem('moviemates-user')
    const watchlist = localStorage.getItem('moviemates-watchlist')
    
    if (watchlist) {
      try {
        const movies = JSON.parse(watchlist)
        setWatchlistCount(movies.length)
      } catch {}
    }

    if (stored) {
      try {
        const user = JSON.parse(stored)
        setProfile(user)
        setIsSignedIn(true)
        setDisplayName(user.displayName || '')
        setBio(user.bio || '')
      } catch {
        setIsSignedIn(false)
      }
    }
  }, [])

  const handleSignIn = () => {
    const name = prompt('Enter your display name:')
    if (!name || !name.trim()) return

    const newProfile: UserProfile = {
      displayName: name.trim(),
      bio: '',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name.trim())}&background=e50914&color=fff&size=128`,
      createdAt: new Date().toISOString(),
    }
    
    localStorage.setItem('moviemates-user', JSON.stringify(newProfile))
    setProfile(newProfile)
    setIsSignedIn(true)
    setDisplayName(newProfile.displayName)
    setBio(newProfile.bio)
  }

  const handleSave = () => {
    if (!profile) return
    
    const updated: UserProfile = {
      ...profile,
      displayName: displayName.trim() || profile.displayName,
      bio: bio.trim(),
    }
    
    localStorage.setItem('moviemates-user', JSON.stringify(updated))
    setProfile(updated)
    setIsEditing(false)
  }

  const handleSignOut = () => {
    if (confirm('Sign out?')) {
      localStorage.removeItem('moviemates-user')
      setIsSignedIn(false)
      setProfile(null)
      setDisplayName('')
      setBio('')
    }
  }

  if (!isSignedIn) {
    return (
      <div>
        <h1 className="page-title">Profile</h1>
        <div className="empty-state">
          <UserIcon className="empty-state-icon" />
          <p>Sign in to manage your profile and preferences.</p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
            Create a profile to track your watchlist and movie preferences.
          </p>
          <button type="button" className="btn btn-primary" onClick={handleSignIn} style={{ marginTop: '1rem' }}>
            Sign In
          </button>
        </div>
      </div>
    )
  }

  if (!profile) return null

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 className="page-title" style={{ margin: 0 }}>Profile</h1>
        <button type="button" className="btn btn-secondary" onClick={handleSignOut} style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
          Sign Out
        </button>
      </div>

      <div className="profile-container">
        <div className="profile-header">
          <img src={profile.avatar} alt={profile.displayName} className="profile-avatar" />
          {!isEditing ? (
            <div className="profile-info">
              <h2 className="profile-name">{profile.displayName}</h2>
              {profile.bio && <p className="profile-bio">{profile.bio}</p>}
              <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(true)} style={{ marginTop: '0.75rem' }}>
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="profile-info" style={{ flex: 1 }}>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Display name"
                className="profile-input"
                style={{ marginBottom: '0.75rem' }}
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio (optional)"
                className="profile-textarea"
                rows={3}
                style={{ marginBottom: '0.75rem' }}
              />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => {
                  setIsEditing(false)
                  setDisplayName(profile.displayName)
                  setBio(profile.bio)
                }}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-value">{watchlistCount}</div>
            <div className="stat-label">Movies in Watchlist</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{new Date(profile.createdAt).toLocaleDateString()}</div>
            <div className="stat-label">Member Since</div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useNavigate } from 'react-router-dom'

function Dashboard({ user, onLogout, statusMessage }) {
  const navigate = useNavigate()

  function handleLogout() {
    navigate('/login', {
      replace: true,
      state: { message: 'You have been logged out.' },
    })
    onLogout()
  }

  const initials = user?.fullName
    ?.split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('') || 'F'

  return (
    <main className="page-shell">
      <section className="auth-card" aria-label="Dashboard">
        <aside className="brand-panel">
          <div className="brand-lockup">
            <span className="brand-mark" aria-hidden="true">f</span>
            <span>FORMA / 05</span>
          </div>
          <div className="brand-copy">
            <p className="eyebrow">Your personal space</p>
            <h1>Good to have you here.</h1>
            <p>Your account is ready. This is the home for your profile details.</p>
          </div>
          <div className="profile-preview" aria-hidden="true">
            <span className="preview-avatar">{initials}</span>
            <span className="preview-copy">
              <strong>{user?.fullName || 'Your profile'}</strong>
              <span>Signed in for this session</span>
            </span>
            <span className="preview-status" />
          </div>
          <p className="brand-footnote">LOCAL DEMO · NO BACKEND</p>
        </aside>

        <div className="auth-content dashboard-content">
          {statusMessage && (
            <div className="status-message success" role="status" aria-live="polite">
              {statusMessage}
            </div>
          )}
          <div className="dashboard-topline">
            <p className="eyebrow">Account overview</p>
            <button className="logout-button" type="button" onClick={handleLogout}>Log out</button>
          </div>

          <div className="dashboard-heading">
            <h2>Welcome, {user?.fullName?.split(' ')[0] || 'there'}.</h2>
            <p>You’re signed in. Here are your profile details.</p>
          </div>

          <section className="profile-card" aria-label="Profile details">
            <div className="profile-card-header">
              <span className="large-avatar" aria-hidden="true">{initials}</span>
              <div>
                <strong>{user?.fullName || 'Registered user'}</strong>
                <span>@{user?.username || 'member'}</span>
              </div>
            </div>
            <div className="profile-details">
              <div>
                <span>Email address</span>
                <strong>{user?.email || 'Not available'}</strong>
              </div>
              <div>
                <span>Account status</span>
                <strong>Active for this session</strong>
              </div>
            </div>
          </section>
        </div>
      </section>
      <p className="page-caption">Your sign-in session ends when this browser session closes.</p>
    </main>
  )
}

export default Dashboard
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput.jsx'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Login({ onLogin, statusMessage }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({
    email: localStorage.getItem('rememberedEmail') || '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(
    Boolean(localStorage.getItem('rememberedEmail')),
  )
  const [isLoading, setIsLoading] = useState(false)
  const [notice, setNotice] = useState(location.state?.message ?? statusMessage)
  const [noticeType, setNoticeType] = useState('success')

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setNotice('')
  }

  function validateForm() {
    const nextErrors = {}

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required'
    } else if (!emailPattern.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      nextErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters'
    }

    return nextErrors
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateForm()
    setErrors(nextErrors)
    setNotice('')

    if (Object.keys(nextErrors).length > 0) return

    setIsLoading(true)
    window.setTimeout(() => {
      let registeredUser = null

      try {
        registeredUser = JSON.parse(localStorage.getItem('registeredUser'))
      } catch {
        registeredUser = null
      }

      const credentialsMatch =
        registeredUser &&
        registeredUser.email?.toLowerCase() === formData.email.trim().toLowerCase() &&
        registeredUser.password === formData.password

      if (!credentialsMatch) {
        setNoticeType('error')
        setNotice('Invalid email or password')
        setIsLoading(false)
        return
      }

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email.trim())
      } else {
        localStorage.removeItem('rememberedEmail')
      }

      onLogin(registeredUser)
      setNoticeType('success')
      setNotice('Login successful!')
      navigate('/dashboard', { replace: true })
    }, 550)
  }

  function showForgotPasswordMessage() {
    setNoticeType('info')
    setNotice('Password recovery is a demo feature and is not connected to a server.')
  }

  return (
    <main className="page-shell">
      <section className="auth-card" aria-label="Login">
        <BrandPanel />
        <div className="auth-content">
          <div className="auth-heading">
            <p className="section-kicker">Account access</p>
            <h2>Welcome back.</h2>
            <p>Sign in to continue to your personal space.</p>
          </div>

          {notice && (
            <div className={`status-message ${noticeType}`} role="status" aria-live="polite">
              {notice}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <FormInput
              id="email"
              label="Email address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              inputMode="email"
              error={errors.email}
            />
            <FormInput
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              error={errors.password}
              action={
                <button
                  className="visibility-button"
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              }
            />

            <div className="form-options">
              <label className="check-label" htmlFor="remember-me">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                Remember me
              </label>
              <button className="text-button" type="button" onClick={showForgotPasswordMessage}>
                Forgot password?
              </button>
            </div>

            <button className="primary-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log in'}
              {!isLoading && <span className="button-arrow" aria-hidden="true">→</span>}
            </button>
          </form>

          <p className="auth-switch">
            New here? <Link className="auth-link" to="/register">Create an account</Link>
          </p>
        </div>
      </section>
      <p className="page-caption">Exp 05 · Front-end authentication demonstration</p>
    </main>
  )
}

function BrandPanel() {
  return (
    <aside className="brand-panel">
      <div className="brand-lockup">
        <span className="brand-mark" aria-hidden="true">f</span>
        <span>FORMA / 05</span>
      </div>
      <div className="brand-copy">
        <p className="eyebrow">A place to begin</p>
        <h1>Your next chapter starts here.</h1>
        <p>A simple, considered space for your account and the things that make it yours.</p>
      </div>
      <div className="profile-preview" aria-hidden="true">
        <span className="preview-avatar">f</span>
        <span className="preview-copy">
          <strong>Your profile</strong>
          <span>Ready when you are</span>
        </span>
        <span className="preview-status" />
      </div>
      <p className="brand-footnote">LOCAL DEMO · NO BACKEND</p>
    </aside>
  )
}

export default Login
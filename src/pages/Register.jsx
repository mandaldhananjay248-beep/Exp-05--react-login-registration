import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput.jsx'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getPasswordStrength(password) {
  if (!password) return ''

  const checks = [
    password.length >= 8,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d/.test(password),
    /[^a-zA-Z0-9]/.test(password),
  ].filter(Boolean).length

  if (password.length < 6 || checks <= 1) return 'weak'
  if (password.length >= 10 && checks >= 3) return 'strong'
  return 'medium'
}

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [notice, setNotice] = useState('')

  const passwordStrength = getPasswordStrength(formData.password)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setNotice('')
  }

  function validateForm() {
    const nextErrors = {}

    if (!formData.fullName.trim()) nextErrors.fullName = 'Full name is required'
    if (!formData.username.trim()) nextErrors.username = 'Username is required'

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

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.confirmPassword !== formData.password) {
      nextErrors.confirmPassword = 'Passwords do not match'
    }

    if (!acceptedTerms) nextErrors.terms = 'Please accept the Terms and Conditions'

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
      const registeredUser = {
        fullName: formData.fullName.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
      }

      localStorage.setItem('registeredUser', JSON.stringify(registeredUser))
      setNotice('Registration successful! Redirecting you to login...')
      window.setTimeout(() => {
        navigate('/login', {
          replace: true,
          state: { message: 'Registration successful! Please log in.' },
        })
      }, 900)
    }, 550)
  }

  return (
    <main className="page-shell">
      <section className="auth-card" aria-label="Registration">
        <aside className="brand-panel">
          <div className="brand-lockup">
            <span className="brand-mark" aria-hidden="true">f</span>
            <span>FORMA / 05</span>
          </div>
          <div className="brand-copy">
            <p className="eyebrow">Make it yours</p>
            <h1>A fresh start, in a few details.</h1>
            <p>Create your profile and keep everything in one place.</p>
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

        <div className="auth-content">
          <div className="auth-heading">
            <p className="section-kicker">Create your account</p>
            <h2>Join Forma.</h2>
            <p>Just a few details to get you started.</p>
          </div>

          {notice && <div className="status-message success" role="status" aria-live="polite">{notice}</div>}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <FormInput id="fullName" label="Full name" value={formData.fullName} onChange={handleChange} placeholder="Jamie Morgan" autoComplete="name" error={errors.fullName} />
              <FormInput id="username" label="Username" value={formData.username} onChange={handleChange} placeholder="jamie.m" autoComplete="username" error={errors.username} />
            </div>

            <FormInput id="email" label="Email address" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" inputMode="email" error={errors.email} />

            <div className="form-grid">
              <div>
                <FormInput
                  id="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  error={errors.password}
                  action={
                    <button className="visibility-button" type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  }
                />
                <div className="strength-row" aria-live="polite">
                  <span className="strength-track">{passwordStrength && <span className={`strength-fill ${passwordStrength}`} />}</span>
                  <span className="strength-label">{passwordStrength ? `${passwordStrength[0].toUpperCase()}${passwordStrength.slice(1)}` : 'Strength'}</span>
                </div>
              </div>
              <FormInput
                id="confirmPassword"
                label="Confirm password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Enter it again"
                autoComplete="new-password"
                error={errors.confirmPassword}
                action={
                  <button className="visibility-button" type="button" onClick={() => setShowConfirmPassword((visible) => !visible)} aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}>
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                }
              />
            </div>

            <div className="terms-row">
              <label className="check-label" htmlFor="terms">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => {
                    setAcceptedTerms(event.target.checked)
                    setErrors((current) => ({ ...current, terms: '' }))
                  }}
                  aria-invalid={Boolean(errors.terms)}
                  aria-describedby={errors.terms ? 'terms-error' : undefined}
                />
                I agree to the Terms and Conditions
              </label>
            </div>
            {errors.terms && <span className="field-error" id="terms-error" role="alert">{errors.terms}</span>}

            <button className="primary-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create account'}
              {!isLoading && <span className="button-arrow" aria-hidden="true">→</span>}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link className="auth-link" to="/login">Log in</Link>
          </p>
        </div>
      </section>
      <p className="page-caption">Demo details are stored in this browser only.</p>
    </main>
  )
}

export default Register
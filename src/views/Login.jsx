import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi'
import { useGsap } from '../hooks/useGsap.js'
import { integrationConfig } from '../integrations/config.js'
import { login as loginApi } from '../integrations/api/authApi.js'
import apple from '../assets/images/apple white.png'
import google from '../assets/images/google3.png'
import twit from '../assets/images/twit black.png'

const heroStats = [['1,250', 'Students'], ['48', 'Teachers'], ['32', 'Courses']]
const socialLinks = [[apple, 'Apple'], [google, 'Google'], [twit, 'X']]

export default function Login() {
  const pageRef = useRef(null)
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()

  useGsap(pageRef, (gsap, scope) => {
    gsap.fromTo(scope.querySelectorAll('.login-brand'),
      { y: -14, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
    )
    gsap.fromTo(scope.querySelectorAll('.login-copy'),
      { y: 18, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1, delay: 0.08, ease: 'power3.out' },
    )
    gsap.fromTo(scope.querySelector('.login-card'),
      { x: 24, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.8, delay: 0.12, ease: 'power3.out' },
    )
    gsap.fromTo(scope.querySelectorAll('.login-stat'),
      { y: 16, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08, delay: 0.3, ease: 'power2.out' },
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      if (integrationConfig.isMock) {
        if (userId !== 'admins' || password !== '!!qwertyk3y') {
          throw new Error('Invalid credentials. Please check your ID and password.')
        }
      } else {
        const session = await loginApi({ userId, password })
        if (session?.token) localStorage.setItem('accessToken', session.token)
      }
      localStorage.setItem('loggedIn', 'true')
      setToast({ text: 'Welcome to EduSuite', ok: true })
      setTimeout(() => navigate('/app/dashboard'), 700)
    } catch (error) {
      setToast({ text: error.message || 'Sign in failed. Please try again.', ok: false })
    }
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <main ref={pageRef} className="min-h-screen bg-(--background) text-(--text)">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,.92fr)]">
        <section className="relative hidden overflow-hidden lg:block">
          <img src="/bg-uni1.jpg" alt="Sunlit university library" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-br from-[#181D31]/65 via-[#181D31]/25 to-[#E5BA73]/20" />
          <div className="login-particles" aria-hidden="true">
            {Array.from({ length: 14 }, (_, index) => (
              <span key={index} style={{ '--delay': `${index * 0.35}s`, '--left': `${8 + index * 6}%` }} />
            ))}
          </div>

          <div className="relative z-10 flex min-h-screen flex-col justify-between p-10 xl:p-14">
            <Brand light />
            <div className="max-w-2xl">
              <p className="login-copy text-sm font-bold uppercase tracking-[.28em] text-[#F7E5C8]">Learning Environment</p>
              <h1 className="login-copy mt-4 text-6xl font-bold leading-none text-white xl:text-7xl">Learning Never Exhausts The Mind</h1>
              <p className="login-copy mt-5 text-lg font-medium text-white/80">- Leonardo da Vinci</p>
              <p className="login-copy mt-6 max-w-xl text-base leading-7 text-white/75">Warm spaces, calm progress, and every academic tool in one premium student dashboard.</p>
            </div>
            <div className="grid max-w-xl grid-cols-3 gap-4">
              {heroStats.map(([value, label]) => (
                <div key={label} className="login-stat rounded-2xl border border-white/20 bg-white/15 p-4 text-white backdrop-blur-xl">
                  <p className="text-2xl font-extrabold">{value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[.18em] text-white/70">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden"><Brand /></div>
            <form onSubmit={handleLogin} className="login-card rounded-[1.75rem] border border-white/80 bg-white/70 p-6 shadow-[0_25px_50px_rgba(0,0,0,.08)] backdrop-blur-xl sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[.22em] text-[#b8860b]">Login</p>
              <h2 className="mt-3 text-5xl font-bold leading-none text-(--navy)">Enter EduSuite</h2>
              <p className="mt-4 text-sm leading-6 text-(--muted)">Continue from campus experience into your learning environment and dashboard.</p>

              <div className="mt-7 grid grid-cols-3 gap-3">
                {socialLinks.map(([src, label]) => (
                  <a key={label} href="#" onClick={(event) => event.preventDefault()} className="grid h-12 place-items-center rounded-2xl bg-(--navy)">
                    <img src={src} alt={label} className="h-6 w-6 object-contain" />
                  </a>
                ))}
              </div>

              <div className="my-7 flex items-center gap-4">
                <span className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-bold uppercase tracking-[.18em] text-(--muted)">or use student ID</span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>

              <label className="mb-5 block">
                <span className="text-sm font-bold">User ID</span>
                <input required value={userId} onChange={(event) => setUserId(event.target.value)} className="mt-2 h-13 w-full rounded-2xl border border-slate-200 bg-white/85 px-4 text-(--navy) outline-none focus:border-(--gold)" placeholder="admins" />
              </label>

              <label className="block">
                <span className="text-sm font-bold">Password</span>
                <div className="relative mt-2">
                  <input required type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} className="h-13 w-full rounded-2xl border border-slate-200 bg-white/85 px-4 pr-12 text-(--navy) outline-none" placeholder="Enter password" />
                  <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute inset-y-0 right-0 grid w-12 place-items-center">
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </label>

              <div className="mt-4 flex justify-between text-sm font-semibold">
                <a href="#" onClick={(event) => event.preventDefault()} className="text-(--muted)">Forgot OTP?</a>
                <a href="#" onClick={(event) => event.preventDefault()} className="text-[#b8860b]">Register</a>
              </div>

              <button className="mt-8 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-(--gold) font-extrabold text-(--navy) shadow-[0_18px_35px_rgba(229,186,115,.35)]">
                <span>Login to Dashboard</span><FiArrowRight />
              </button>
            </form>
            <p className="mt-5 text-center text-xs font-semibold text-(--muted)">Demo access: User ID <span className="text-(--navy)">admins</span></p>
          </div>
        </section>
      </div>

      {toast && (
        <div role="status" className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-2xl px-6 py-3 text-sm font-bold text-white shadow-xl ${toast.ok ? 'bg-(--navy)' : 'bg-red-600'}`}>
          {toast.text}
        </div>
      )}
    </main>
  )
}

function Brand({ light = false }) {
  return (
    <div className="login-brand flex items-center gap-4">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-(--gold) text-(--navy)"><FiArrowRight /></div>
      <div>
        <p className={`display-font text-4xl font-bold ${light ? 'text-white' : 'text-(--navy)'}`}>EduSuite</p>
        <p className={`text-xs font-bold uppercase tracking-[.22em] ${light ? 'text-[#F7E5C8]' : 'text-(--muted)'}`}>Campus Experience</p>
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LogIn,
  UserPlus,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  X,
  Key
} from 'lucide-react';
import './auth.css';

export const AuthPage = ({ initialMode = 'login' }) => {
  const { login, registerUser, profile, showToast } = useApp();

  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [regSuccessBanner, setRegSuccessBanner] = useState('');

  // Login Form State (pre-populated with hostzonebd admin demo credentials)
  const [loginForm, setLoginForm] = useState({
    emailOrUsername: 'admin@gmail.com',
    password: 'admin1234',
    remember: true
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register Form State
  const [registerForm, setRegisterForm] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    role: 'Super Admin',
    password: '',
    confirmPassword: ''
  });
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);

  // Dismiss forgot modal on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showForgotModal) {
        setShowForgotModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showForgotModal]);

  // Handle Login Submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginForm.emailOrUsername.trim()) {
      setLoginError('অনুগ্রহ করে আপনার ইমেইল অথবা ইউজারনেম প্রদান করুন।');
      return;
    }
    if (!loginForm.password) {
      setLoginError('অনুগ্রহ করে আপনার পাসওয়ার্ড প্রদান করুন।');
      return;
    }

    setLoginLoading(true);

    try {
      const result = await login(loginForm.emailOrUsername, loginForm.password, loginForm.remember);
      if (!result.success) {
        setLoginError(result.message);
      }
    } catch (err) {
      setLoginError('লগইন করার সময় একটি সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Registration Submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError('');

    if (!registerForm.name.trim()) {
      setRegisterError('অনুগ্রহ করে আপনার পূর্ণ নাম প্রদান করুন।');
      return;
    }
    if (!registerForm.email.trim() || !registerForm.email.includes('@')) {
      setRegisterError('সঠিক ইমেইল অ্যাড্রেস প্রদান করুন।');
      return;
    }
    if (!registerForm.password || registerForm.password.length < 6) {
      setRegisterError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।');
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterError('পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না!');
      return;
    }

    setRegisterLoading(true);

    try {
      const result = await registerUser({
        name: registerForm.name,
        username: registerForm.username,
        email: registerForm.email,
        phone: registerForm.phone,
        role: registerForm.role,
        password: registerForm.password
      });

      if (result.success) {
        showToast('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! অনুগ্রহ করে লগইন করুন।', 'success');
        setRegSuccessBanner(`অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে (${result.user.name})! প্রবেশ করতে নিচের 'Login to Dashboard' বাটনে ক্লিক করুন।`);
        setLoginForm({
          emailOrUsername: registerForm.email,
          password: registerForm.password,
          remember: true
        });
        setMode('login');
        setRegisterForm({
          name: '',
          username: '',
          email: '',
          phone: '',
          role: 'Super Admin',
          password: '',
          confirmPassword: ''
        });
      } else {
        setRegisterError(result.message);
      }
    } catch (err) {
      setRegisterError('রেজিস্ট্রেশন করার সময় একটি সমস্যা হয়েছে।');
    } finally {
      setRegisterLoading(false);
    }
  };

  // Quick fill demo credentials
  const fillDemoCredentials = () => {
    setLoginForm({
      emailOrUsername: 'admin@gmail.com',
      password: 'admin1234',
      remember: true
    });
    setLoginError('');
    setRegSuccessBanner('');
    showToast('ডেমো তথ্য ইনপুট ফিল্ডে পূরণ করা হয়েছে!', 'success');
  };

  return (
    <div className="auth-page-container">
      {/* Background Animated Floating Bubbles */}
      <div className="auth-bubbles" aria-hidden="true">
        <span className="auth-bubble"></span>
        <span className="auth-bubble"></span>
        <span className="auth-bubble"></span>
        <span className="auth-bubble"></span>
        <span className="auth-bubble"></span>
        <span className="auth-bubble"></span>
        <span className="auth-bubble"></span>
        <span className="auth-bubble"></span>
        <span className="auth-bubble"></span>
        <span className="auth-bubble"></span>
      </div>

      {/* Left Column: Authentic Brand Content */}
      <div className="auth-left">
        <div className="auth-brand-content">
          <div className="auth-brand-logo-wrapper">
            <div className="auth-brand-logo">
              <div className="auth-logo-icon-wrapper">
                <img
                  src="/storage/institute/logos/3kzAKNfcQQrk9Zh5YJC02lWsjNO3QhcDRHKmHDAx.png"
                  alt="মাদ্রাসা মনোগ্রাম"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://madrasha.hostzonebd.com/storage/institute/logos/3kzAKNfcQQrk9Zh5YJC02lWsjNO3QhcDRHKmHDAx.png';
                  }}
                />
              </div>
              <div className="auth-logo-text">
                <h1>{profile?.name || 'জব্বর নগর স্বতন্ত্র ইবতেদায়ী মাদ্রাসা'}</h1>
                <p>Madrasa Management Software</p>
              </div>
            </div>
          </div>

          <div className="auth-building-image-wrapper">
            <img
              src="/assets/images/logo/madrasha-login.jpeg"
              alt="Madrasa Campus"
              className="auth-building-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://madrasha.hostzonebd.com/assets/images/logo/madrasha-login.jpeg';
              }}
            />
          </div>

          <div className="auth-institution-badge">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{profile?.address || 'বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার'} | স্থাপিত: {profile?.established || '১৯৮৩'}</span>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Login & Sign Up Form Card */}
      <div className="auth-right">
        <div className="auth-form-wrapper">
          {/* Mobile-only Brand Header (visible when auth-left is hidden) */}
          <div className="auth-mobile-brand">
            <div className="auth-mobile-brand-inner">
              <div className="auth-mobile-logo-wrapper">
                <img
                  src="/storage/institute/logos/3kzAKNfcQQrk9Zh5YJC02lWsjNO3QhcDRHKmHDAx.png"
                  alt="Madrasa Logo"
                  className="auth-mobile-logo"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://madrasha.hostzonebd.com/storage/institute/logos/3kzAKNfcQQrk9Zh5YJC02lWsjNO3QhcDRHKmHDAx.png';
                  }}
                />
              </div>
              <div className="auth-mobile-text">
                <h2>{profile?.name || 'জব্বর নগর স্বতন্ত্র ইবতেদায়ী মাদ্রাসা'}</h2>
                <p>Madrasa Management Software</p>
              </div>
            </div>
          </div>

          <div className="auth-card">
            {/* Top Navigation Tabs */}
            <div className="auth-tab-pill-container">
              <button
                type="button"
                className={`auth-tab-pill ${mode === 'login' ? 'active' : ''}`}
                onClick={() => {
                  setMode('login');
                  setLoginError('');
                }}
              >
                <LogIn className="w-4 h-4" />
                <span>সাইন ইন (Login)</span>
              </button>
              <button
                type="button"
                className={`auth-tab-pill ${mode === 'register' ? 'active' : ''}`}
                onClick={() => {
                  setMode('register');
                  setRegisterError('');
                  setRegSuccessBanner('');
                }}
              >
                <UserPlus className="w-4 h-4" />
                <span>সাইন আপ (Register)</span>
              </button>
            </div>

            {/* LOGIN FORM VIEW */}
            {mode === 'login' && (
              <div>
                <div className="auth-card-header">
                  <h2>Admin Login</h2>
                  <p>Please login to your account / আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
                </div>

                {regSuccessBanner && (
                  <div className="mb-3 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 flex items-start gap-2.5 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{regSuccessBanner}</span>
                  </div>
                )}

                {loginError && (
                  <div className="auth-error-feedback mb-3 p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleLoginSubmit}>
                  {/* Email / Username */}
                  <div className="auth-input-group">
                    <label htmlFor="login-email">ইমেইল বা ইউজারনেম</label>
                    <div className="auth-input-wrapper">
                      <input
                        id="login-email"
                        type="text"
                        className={`auth-form-input ${loginError ? 'is-invalid' : ''}`}
                        placeholder="Enter your email or username"
                        value={loginForm.emailOrUsername}
                        onChange={(e) => {
                          setLoginForm({ ...loginForm, emailOrUsername: e.target.value });
                          if (loginError) setLoginError('');
                        }}
                        required
                        autoFocus
                      />
                      <Mail className="auth-input-icon" />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="auth-input-group">
                    <label htmlFor="login-password">পাসওয়ার্ড</label>
                    <div className="auth-input-wrapper">
                      <input
                        id="login-password"
                        type={showLoginPassword ? 'text' : 'password'}
                        className={`auth-form-input ${loginError ? 'is-invalid' : ''}`}
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => {
                          setLoginForm({ ...loginForm, password: e.target.value });
                          if (loginError) setLoginError('');
                        }}
                        required
                      />
                      <Lock className="auth-input-icon" />
                      <button
                        type="button"
                        className="auth-password-toggle"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        tabIndex={-1}
                        title={showLoginPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="auth-form-options">
                    <div className="auth-remember-me">
                      <input
                        type="checkbox"
                        id="remember-me-checkbox"
                        checked={loginForm.remember}
                        onChange={(e) => setLoginForm({ ...loginForm, remember: e.target.checked })}
                      />
                      <label htmlFor="remember-me-checkbox">Remember me (মনে রাখুন)</label>
                    </div>

                    <button
                      type="button"
                      className="auth-forgot-password"
                      onClick={() => setShowForgotModal(true)}
                    >
                      পাসওয়ার্ড ভুলে গেছেন?
                    </button>
                  </div>

                  {/* 1:1 Live Demo Credentials Box from hostzonebd */}
                  <div
                    className="auth-demo-box"
                    onClick={fillDemoCredentials}
                    title="ক্লিক করে স্বয়ংক্রিয়ভাবে ইনপুট ফিল্ডে বসান"
                    role="button"
                    tabIndex={0}
                  >
                    <div className="auth-demo-item">
                      <div className="auth-demo-label">
                        <i className="fas fa-user text-primary" style={{ marginRight: '6px' }}></i>
                        <User className="w-3.5 h-3.5 text-sky-600 me-1" />
                        <span style={{ fontWeight: 'bold' }}>Username</span>
                      </div>
                      <span className="auth-demo-val user-select-all font-mono">admin@gmail.com</span>
                    </div>
                    <div className="auth-demo-item">
                      <div className="auth-demo-label">
                        <i className="fas fa-key text-warning" style={{ marginRight: '6px' }}></i>
                        <Key className="w-3.5 h-3.5 text-amber-500 me-1" />
                        <span style={{ fontWeight: 'bold' }}>Password</span>
                      </div>
                      <span className="auth-demo-val user-select-all font-mono">admin1234</span>
                    </div>
                    <div className="text-[11px] text-center text-gray-500 mt-1 font-medium">
                      💡 ডেমো ক্রেডেনশিয়াল ব্যবহার করতে এখানে ক্লিক করুন
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="auth-btn-submit mt-4"
                    disabled={loginLoading}
                  >
                    {loginLoading ? (
                      <span className="inline-block animate-spin mr-2">⏳</span>
                    ) : (
                      <LogIn className="w-4 h-4" />
                    )}
                    <span>{loginLoading ? 'যাচাই করা হচ্ছে...' : 'Login to Dashboard (ড্যাশবোর্ডে প্রবেশ)'}</span>
                  </button>
                </form>

                <div className="auth-divider">অথবা</div>

                <div className="auth-switch-prompt">
                  অ্যাকাউন্ট নেই?
                  <button
                    type="button"
                    onClick={() => {
                      setMode('register');
                      setRegisterError('');
                      setRegSuccessBanner('');
                    }}
                  >
                    নতুন অ্যাকাউন্ট তৈরি করুন
                  </button>
                </div>
              </div>
            )}

            {/* REGISTRATION FORM VIEW */}
            {mode === 'register' && (
              <div>
                <div className="auth-card-header">
                  <h2>Create New Account</h2>
                  <p>মাদ্রাসার এডমিন বা শিক্ষক হিসেবে নিবন্ধন করুন</p>
                </div>

                {registerError && (
                  <div className="auth-error-feedback mb-3 p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{registerError}</span>
                  </div>
                )}

                <form onSubmit={handleRegisterSubmit} className="space-y-3">
                  {/* Full Name */}
                  <div className="auth-input-group mb-2">
                    <label htmlFor="reg-name">পূর্ণ নাম</label>
                    <div className="auth-input-wrapper">
                      <input
                        id="reg-name"
                        type="text"
                        className="auth-form-input"
                        placeholder="আপনার পূর্ণ নাম লিখুন"
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        required
                        autoFocus
                      />
                      <User className="auth-input-icon" />
                    </div>
                  </div>

                  {/* Username (Optional / custom login ID) */}
                  <div className="auth-input-group mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor="reg-username" className="mb-0">ইউজারনেম (লগইন আইডি)</label>
                      <span className="text-[11px] text-gray-500 font-normal">খালি রাখলে ইমেইল থেকে তৈরি হবে</span>
                    </div>
                    <div className="auth-input-wrapper">
                      <input
                        id="reg-username"
                        type="text"
                        className="auth-form-input"
                        placeholder="e.g. admin, teacher1"
                        value={registerForm.username}
                        onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value.toLowerCase().replace(/\s+/g, '') })}
                      />
                      <User className="auth-input-icon" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="auth-input-group mb-2">
                    <label htmlFor="reg-email">ইমেইল অ্যাড্রেস</label>
                    <div className="auth-input-wrapper">
                      <input
                        id="reg-email"
                        type="email"
                        className="auth-form-input"
                        placeholder="example@gmail.com"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        required
                      />
                      <Mail className="auth-input-icon" />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="auth-input-group mb-2">
                    <label htmlFor="reg-phone">মোবাইল নম্বর</label>
                    <div className="auth-input-wrapper">
                      <input
                        id="reg-phone"
                        type="tel"
                        className="auth-form-input"
                        placeholder="01XXXXXXXXX"
                        value={registerForm.phone}
                        onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                      />
                      <Phone className="auth-input-icon" />
                    </div>
                  </div>

                  {/* Role Selector */}
                  <div className="auth-input-group mb-2">
                    <label htmlFor="reg-role">পদবী / রোল</label>
                    <div className="auth-input-wrapper">
                      <select
                        id="reg-role"
                        className="auth-form-input"
                        value={registerForm.role}
                        onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value })}
                      >
                        <option value="Super Admin">Super Admin (সুপার এডমিন / মুহতামিম)</option>
                        <option value="Principal">Principal (অধ্যক্ষ / মোহতামিম)</option>
                        <option value="Cashier / Accountant">Cashier / Accountant (ক্যাশিয়ার / হিসাবরক্ষক)</option>
                        <option value="Teacher">Teacher (শিক্ষক)</option>
                        <option value="Staff">Staff (কর্মচারী)</option>
                      </select>
                      <ShieldCheck className="auth-input-icon" />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="auth-input-group mb-2">
                    <label htmlFor="reg-password">পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)</label>
                    <div className="auth-input-wrapper">
                      <input
                        id="reg-password"
                        type={showRegPassword ? 'text' : 'password'}
                        className="auth-form-input"
                        placeholder="গোপন পাসওয়ার্ড প্রদান করুন"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        required
                      />
                      <Lock className="auth-input-icon" />
                      <button
                        type="button"
                        className="auth-password-toggle"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        tabIndex={-1}
                      >
                        {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="auth-input-group mb-3">
                    <label htmlFor="reg-confirm">পাসওয়ার্ড নিশ্চিত করুন</label>
                    <div className="auth-input-wrapper">
                      <input
                        id="reg-confirm"
                        type={showRegConfirmPassword ? 'text' : 'password'}
                        className="auth-form-input"
                        placeholder="পাসওয়ার্ড পুনরায় লিখুন"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        required
                      />
                      <Lock className="auth-input-icon" />
                      <button
                        type="button"
                        className="auth-password-toggle"
                        onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                        tabIndex={-1}
                      >
                        {showRegConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="auth-btn-submit mt-3"
                    disabled={registerLoading}
                  >
                    {registerLoading ? (
                      <span className="inline-block animate-spin mr-2">⏳</span>
                    ) : (
                      <UserPlus className="w-4 h-4" />
                    )}
                    <span>{registerLoading ? 'অ্যাকাউন্ট তৈরি হচ্ছে...' : 'Create Account (নিবন্ধন সম্পন্ন করুন)'}</span>
                  </button>
                </form>

                <div className="auth-divider">অথবা</div>

                <div className="auth-switch-prompt">
                  ইতিমধ্যে অ্যাকাউন্ট আছে?
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setLoginError('');
                    }}
                  >
                    লগইন করুন
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="auth-modal-overlay" onClick={() => setShowForgotModal(false)}>
          <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-[#0f626a]" />
                <h3 className="font-bold text-[#082f32] text-base">পাসওয়ার্ড পুনরুদ্ধার</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 text-xs text-gray-600 space-y-3 leading-relaxed">
              <p>
                আপনার অ্যাকাউন্টের পাসওয়ার্ড ভুলে গিয়ে থাকলে প্রধান এডমিনের সাথে যোগাযোগ করুন অথবা ডেমো সিস্টেমে প্রবেশ করতে নিচের তথ্য ব্যবহার করুন:
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 font-mono text-xs space-y-1">
                <div><strong>ইউজারনেম / ইমেইল:</strong> admin@gmail.com</div>
                <div><strong>পাসওয়ার্ড:</strong> admin1234</div>
                <div><strong>রোল:</strong> Super Admin</div>
              </div>

              <div className="text-gray-500 pt-1">
                মাদ্রাসা অফিস হটলাইন: <span className="font-semibold text-[#0f626a]">{profile?.phone1 || '01820050095'}</span>, <span className="font-semibold text-[#0f626a]">{profile?.phone2 || '01847657580'}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  fillDemoCredentials();
                  setShowForgotModal(false);
                }}
                className="flex-1 py-2 px-3 bg-[#0f626a] text-white rounded-xl font-bold text-xs hover:bg-[#082f32] transition"
              >
                ডেমো তথ্য দিয়ে স্বয়ংক্রিয় পূরণ করুন
              </button>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="py-2 px-4 border border-gray-200 rounded-xl text-gray-600 font-semibold text-xs hover:bg-gray-50 transition"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

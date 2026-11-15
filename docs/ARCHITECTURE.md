# System Architecture — Madrasa Management Platform

## 1. Executive Architectural Overview

The **Madrasa Management Platform (মাদ্রাসা ম্যানেজমেন্ট সফটওয়্যার)** is designed as an enterprise-grade, offline-resilient, hybrid full-stack application. It can operate both as a high-performance Single Page Application (SPA) on edge networks (Cloudflare Pages) and as a full-stack Server-Side Application (Next.js App Router on Vercel or Node.js Docker containers).

```
+-----------------------------------------------------------------------------------+
|                                 Client Layer                                      |
|  +--------------------+  +--------------------+  +--------------------+           |
|  | Modern Dashboard   |  | Student / Teacher  |  | Accounts & Ledger  |           |
|  | (Tailwind + Lucide)|  | Lifecycle Modules  |  | Financial Modules  |           |
|  +--------------------+  +--------------------+  +--------------------+           |
|  +--------------------+  +--------------------+  +--------------------+           |
|  | Attendance Matrix  |  | SMS & Broadcast    |  | Reports & Vouchers |           |
|  | & Reporting Engine |  | Gateway Engine     |  | Print Renderer     |           |
|  +--------------------+  +--------------------+  +--------------------+           |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                        State & Application Orchestration                          |
|  - AppContext (Central Reactive Store, Action Dispatchers, Mutations)             |
|  - Dual-Layer Persistence (Client-Side LocalStorage + Server Disk Sync)          |
|  - Optimistic UI Updates with Multi-Step Rollback Mechanics                      |
|  - Exact Bengali Currency (টাকা/পয়সা) Math Engine with 0.01 Precision            |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                             Edge / Backend API Layer                              |
|  - Edge Middleware (Cloudflare Workers / Next.js Edge Middleware)                |
|  - Security Layer: Bcrypt Password Hashing, JOSE JWT Tokens, Sliding Rate Limiter|
|  - RESTful Endpoints (/api/auth/*, /api/students, /api/teachers, /api/vouchers)   |
|  - Strict Sanitization (DOMPurify, Anti-XSS, CSRF Protection, Nonce CSP)          |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                              Data & Storage Adapters                              |
|  - Structured Initial Seed Catalog (197 Students, 5 Jamats, 55 Categories)       |
|  - Google Sheets / CSV Bi-Directional Adapter                                     |
|  - Cloudflare D1 / PostgreSQL / SQLite Adapter Compatibility                      |
+-----------------------------------------------------------------------------------+
```

---

## 2. Directory Layout & Organization

The codebase is organized into domain-driven modules, separating presentation, state, domain logic, and infrastructure:

```
madrasha-management-app/
├── docs/                               # Comprehensive System Documentation
│   ├── ARCHITECTURE.md                 # This specification document
│   ├── GOOGLE_SHEETS_INTEGRATION.md    # Google Sheets / CSV workflow guide
│   ├── DEPLOYMENT_CLOUDFLARE.md        # Cloudflare Pages / Workers deployment guide
│   ├── DEPLOYMENT_VERCEL.md            # Vercel production deployment guide
│   ├── API_REFERENCE.md                # Full REST API endpoints documentation
│   └── modules/                        # Detailed 1:1 documentation per module
│       ├── 01-academic-jamat.md
│       ├── 02-student-lifecycle.md
│       ├── 03-teacher-staff.md
│       ├── 04-attendance-system.md
│       ├── 05-accounts-finance.md
│       ├── 06-bazar-mess-management.md
│       ├── 07-donors-zakat-fund.md
│       ├── 08-sms-gateway.md
│       ├── 09-id-card-generator.md
│       ├── 10-certificates-testimonials.md
│       ├── 11-reports-analytics.md
│       └── 12-security-auth.md
├── src/                                # Frontend & Application Source
│   ├── app/                            # Next.js App Router & REST API Routes
│   │   ├── api/auth/                   # Authentication endpoints (login, register, logout, me)
│   │   ├── api/students/               # Student REST endpoints
│   │   ├── api/teachers/               # Teacher REST endpoints
│   │   ├── api/vouchers/               # Financial Voucher REST endpoints
│   │   ├── api/bazar/                  # Bazar & Mess REST endpoints
│   │   └── api/donors/                 # Donor & Zakat REST endpoints
│   ├── components/                     # Domain-specific UI Components
│   │   ├── auth/                       # LoginView, AuthPage, Security modals
│   │   ├── dashboard/                  # KPI Cards, Analytics graphs, Quick actions
│   │   ├── student/                    # Student admission, list, fee matrix, certificate
│   │   ├── teacher/                    # Teacher profile, salary sheet, daily breakdown
│   │   ├── attendance/                 # Student & Teacher attendance matrix
│   │   ├── accounts/                   # Voucher entry, Accounts, Balance Transfer, Balance Sheet
│   │   ├── bazar/                      # Daily & Monthly mess expense tracking
│   │   ├── donors/                     # Donor list, contribution history, zakat funds
│   │   ├── sms/                        # Broadcast SMS, UCS-2 character counter, recipient filters
│   │   ├── idcard/                     # Student & Teacher dual-side printable ID cards
│   │   ├── results/                    # Exam marks entry, grade sheets, tabulations
│   │   ├── reports/                    # 14 dedicated financial, academic, and audit reports
│   │   ├── settings/                   # Institution profile, Jamat, Payment method configuration
│   │   └── layout/                     # Header, Sidebar, Breadcrumbs, Notification toasts
│   ├── context/                        # AppContext, React Context Providers
│   ├── data/                           # Initial Seed Data (197 students, initial transactions)
│   ├── lib/                            # Security primitives (bcrypt, rateLimit, sanitize, tokens)
│   └── utils/                          # Number-to-Bangla in words, routing maps, date formatting
├── public/                             # Public static assets
│   ├── assets/images/logo/             # Login image, branded assets
│   ├── storage/institute/logos/        # Madrasa 360 circular logos
│   ├── storage/institute/banners/      # Cover photos and print headers
│   └── _redirects                      # Cloudflare Pages SPA 200 rewrite rule
├── scripts/                            # Verification & Deep Testing Suites
│   ├── verify.js                       # 8-module system verification suite
│   ├── verify_backend_security.js      # 9-tier backend security test suite
│   ├── test_accounts_module.js         # Accounts & precision verification
│   ├── test_sms_module.js              # SMS UCS-2 formula & route tests
│   ├── test_idcard_module.js           # ID Card layout & filter tests
│   └── test_attendance_module.cjs      # Attendance parity verification
├── package.json                        # Dependencies, scripts (Next.js + Vite + Turbopack)
├── vite.config.js                      # High-speed edge bundler configuration
├── next.config.mjs                     # Next.js security headers & CSP configuration
└── tailwind.config.js                  # Color palettes, typography, responsive breakpoints
```

---

## 3. Core Architectural Principles

### 3.1 Dual-Engine Architecture (Vite + Next.js)
The project supports two optimized build targets:
1. **Cloudflare Pages SPA (`npx vite build` -> `dist/`)**: Generates an ultra-fast, zero-latency static build deployed across Cloudflare's global edge network (275+ cities). Serves `https://madrasha-management.pages.dev` with instantaneous sub-50ms TTFB.
2. **Next.js Full-Stack (`npm run build` -> `.next/`)**: Runs SSR, server actions, and API endpoints for dynamic backend capabilities with persistent file storage and JOSE JWT validation.

### 3.2 State Management & Offline Resilience
The central state is managed via `AppContext.jsx`. All entity mutations follow an optimistic UI pattern:
- Immediate local UI update.
- Real-time persistence to `localStorage` (key: `madrasha_db_v3`).
- Background asynchronous synchronization to `/api/*` endpoints.
- If network failure occurs, the application operates 100% offline seamlessly without blocking user operations.

### 3.3 Security & Anti-Tamper Guarantees
- **Password Protection**: Passwords are never stored in plaintext. Passwords use Bcrypt with configurable salt cost factors.
- **Session Tokens**: Handled via stateless JOSE JWT tokens with strict expiration and signature verification.
- **Rate Limiting**: Multi-dimensional IP and account-targeted sliding window rate limiters protect against brute-force attacks.
- **XSS Sanitization**: User inputs are sanitized prior to DOM rendering.
- **Content Security Policy**: Full CSP header with strict origin controls, disallowing unauthorized object embeds and frame hijacking.

### 3.4 Physical Printing Fidelity
Official certificates, testimonials, student ID cards, vouchers, and reports include dedicated `@media print` CSS rules:
- Interactive headers, navigation sidebars, and action buttons are automatically suppressed (`display: none !important;`).
- Margins, page dimensions (A4, Letter, ID-Card standard), and DPI resolutions (300 DPI) are enforced.
- Colors and typography render faithfully on standard desktop and office printers.

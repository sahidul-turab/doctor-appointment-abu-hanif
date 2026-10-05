# Dr. Abu Hanif: Appointment Website

**A bilingual (Bangla / English) website for a cardiologist's practice.** Patients can read
about the doctor, see chamber details and book a serial through WhatsApp with a pre-filled
message.

**Live:** https://dr-abu-hanif.vercel.app

---

## Features

- **Bangla-first, with an English toggle.** The choice is remembered per device.
- **One-tap booking on WhatsApp** with a ready-made appointment message
- **Floating WhatsApp button** on every screen
- **Light / dark theme**
- **Google Analytics + Vercel Analytics** to track visits and booking clicks
- **Open Graph banner** so links look good when shared on Facebook or WhatsApp
- Mobile-first, responsive layout

## Tech stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS**
- **Lucide** icons
- Deployed on **Vercel**

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project layout

```
src/app/         page + layout (SEO and OG metadata)
src/components/  Navbar, Footer, FloatingContactButtons, Doodles, analytics tracker
src/context/     LanguageContext (BN/EN), ThemeContext
src/lib/         gtag + WhatsApp link helpers
```

---

Built by [Sahidul Turab](https://github.com/sahidul-turab).

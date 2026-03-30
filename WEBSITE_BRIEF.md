# CoverAss — Website Brief

> Complete brief for designing and building the CoverAss marketing/product website. Covers the product, target audience, user workflows, pricing, page structure, and technical details.

---

## 1. What Is CoverAss?

CoverAss is a **property condition inspection app** built for the South African market. It replaces the paper checklists used during move-in/move-out inspections, property sales, and maintenance assessments with a professional digital workflow that includes:

- Room-by-room inspections with condition ratings
- Timestamped, GPS-verified photo evidence
- Video walkthroughs per room
- Automated professional PDF report generation
- Offline support for areas with poor connectivity
- Shareable public report links

**Brand name**: CoverAss (trading as C Y Assets / CYass)
**Domain**: cyass.co.za / app.cyass.co.za
**Tagline**: Professional Property Condition Reports
**Support email**: admin@cyass.co.za
**Primary brand colour**: #0c0e43 (dark navy — used in PDFs) (blue)
**Secondary / accent**: , #88cb11 (lime green — used for CTA/upgrade)

---

## 2. Target Audience

There are **6 distinct user roles**, each with a specific use case:

| Role           | Who they are                     | Why they use CoverAss                                                                      |
| -------------- | -------------------------------- | ------------------------------------------------------------------------------------------ |
| **Tenant**     | Renters moving in or out         | Protect their deposit — document the exact condition of the property on day 1 and day last |
| **Landlord**   | Property owners / managers       | Track property condition between tenants, prove damage, manage maintenance                 |
| **Buyer**      | People purchasing property       | Pre-purchase due diligence — document defects before signing                               |
| **Seller**     | People selling property          | Disclosure reports — prove condition at time of sale, reduce disputes                      |
| **Agent**      | Real estate professionals        | Create reports on behalf of any client using any template — their primary tool             |
| **Contractor** | Builders, plumbers, electricians | Document repair/maintenance work — before/after evidence for quoting and sign-off          |

### Primary target: Agents & Contractors

These are the power users and the subscription revenue driver. They create the most reports, need team features, and benefit from unlimited access.

### Secondary target: Tenants

The highest volume of individual users. Every lease change in South Africa should have a condition report — tenants are the most motivated to protect themselves.

---

## 3. User Workflow (End-to-End)

### Step 1: Sign Up

- User provides: full name, email, password, role
- Agents/contractors can optionally provide their agency name
- Role-specific benefits are shown during signup:
  - **Agents/Contractors**: "2 free reports to try the app" + Pro Plan details
  - **Everyone else**: "Your first property report is FREE" + per-report pricing
- Email verification required before first login
- Google sign-in also supported

### Step 2: Add a Property

- User enters property details:
  - Property name (e.g. "23 Oak Lane")
  - Property type: House, Townhouse, Flat, Cluster, Cottage, Granny Flat, Other
  - Optional: unit number, complex name, estate name
  - Full SA address: street number, street name, suburb, city, province (9 SA provinces dropdown), postal code
- **GPS capture**: Device GPS coordinates are recorded for verification
  - Mobile: Uses device GPS (warns if accuracy > 200m)
  - Desktop: Uses network location (less accurate, "Skip GPS" option for testing)

### Step 3: Create a Report

- Select a property from the list
- **Agents only**: Choose which role's inspection template to use (tenant, landlord, buyer, seller, or contractor perspective)
- Add rooms to the report:
  - Each room has a name (e.g. "Main Bedroom") and a type
  - 7 room types: Standard, Bathroom, Kitchen, Patio, Outbuilding, Exterior, Special Features
  - Each type has its own predefined inspection categories (see Section 7)

### Step 4: Inspect Room by Room

For each room:

**a) Optional Video Walkthrough**

- Record a video walkthrough (max 2 min / 50MB)
- Mobile records at 480p; desktop at 720p (prevents memory crashes)

**b) Rate Each Category**
Each room type has predefined categories (e.g. Kitchen → Walls, Windows, Floors, Cabinets, Counters, Sink, Appliances, Plumbing, Lights, Power). For each:

1. **Rate condition**: Good, Fair, Poor, Urgent Repair, or N/A
2. **Add notes**: Mandatory if condition is not Good or N/A
3. **Take photos**: Multiple photos per category, compressed to 1024px JPEG

**c) Auto-Save**

- All data auto-saves every 1.5 seconds — no "save" button needed
- Photo uploads happen immediately
- If upload fails, it queues in IndexedDB and retries when back online

### Step 5: Review & Complete

- Report Summary page shows:
  - Property details with GPS
  - Room-by-room condition breakdown (colour-coded: green/orange/red)
  - Photo thumbnails per category
  - Overall statistics (total items, condition distribution)
- User marks report as "completed"

### Step 6: Finalize

- Locking step — after finalization the report is **immutable**
- Validation: every room must have at least one inspection item
- Sets a finalized_at timestamp

### Step 7: Generate PDF

- **Client-side** PDF generation (no server required)
- Professional A4 layout with:
  - Company branding, report title, date, status badge
  - Property details card
  - Inspector name and agency
  - Condition overview with statistics and progress bar
  - Room-by-room detail pages with photos, notes, condition badges
  - Legal disclaimer
  - Page numbers
- PDF is uploaded to cloud storage and a download link saved
- Report can be shared via a **public link** (no login needed to view)

### Step 8: Payment

Before accessing the final PDF:

- System checks: active subscription? free reports left? already paid?
- If payment is needed, user is redirected to **Yoco** (SA payment gateway)
- After payment, report status updates to "paid" and PDF is accessible

### Step 9: Settings & Team Management

From the Settings page:

- View account details (name, email, role, agency)
- See subscription status and expiry
- Subscribe to Agent Pro or renew
- **Team management** (agents/contractors only):
  - Invite team members by email (up to 3 included)
  - Team members share the owner's subscription
  - If an invited email hasn't signed up yet, they auto-link on signup

---

## 4. Pricing

### Free Tier

| Role       | Free Reports |
| ---------- | ------------ |
| Tenant     | 1            |
| Landlord   | 1            |
| Buyer      | 1            |
| Seller     | 1            |
| Agent      | 2            |
| Contractor | 2            |

### Pay-Per-Report

|               | Price                    |
| ------------- | ------------------------ |
| Single Report | **R99**                  |
| Currency      | ZAR (South African Rand) |

Available to all roles after free tier is exhausted.

### Agent Pro Subscription

|                         | Details                        |
| ----------------------- | ------------------------------ |
| Price                   | **R499/month**                 |
| Reports                 | Unlimited                      |
| Team members included   | 3                              |
| Additional team members | R100/month each (planned)      |
| Template access         | Any role's inspection template |
| Available to            | Agents & Contractors           |

**What team members get**: Team members share the owner's active subscription — they can create unlimited reports without paying separately.

### Payment Gateway

- **Provider**: Yoco (https://www.yoco.com) — the dominant SA online payment processor
- **Methods**: Credit/debit card, Google Pay, Apple Pay (via Yoco)
- **Flow**: App → Cloud Function creates Yoco checkout session → user redirected to Yoco → webhook confirms payment → app updates

---

## 5. Suggested Website Structure

### Landing Page (`/`)

**Hero Section**

- Headline: "Professional Property Condition Reports"
- Subheadline: "Protect yourself. Document everything. Generate court-ready PDF reports in minutes."
- CTA: "Start Free" → leads to app signup
- Hero image/mockup: phone showing inspection in progress

**Problem/Solution Section**

- Problem: Paper checklists get lost, aren't timestamped, have no photos, won't hold up in disputes
- Solution: CoverAss digitises the entire process with GPS, timestamps, photos, video, and professional PDFs

**How It Works** (3-4 step visual)

1. Add your property
2. Inspect room by room
3. Generate a professional PDF
4. Share or download

**Who It's For** (6 role cards)

- Tenant, Landlord, Buyer, Seller, Agent, Contractor
- Each with a one-line use case (see Section 2)

**Features Grid**

- Room-by-room inspections
- 5-point condition rating (Good → Urgent Repair)
- Photo evidence per item
- Video walkthroughs
- GPS-verified location
- Offline support
- Professional PDF reports
- Shareable public links
- Team management (agents)
- Works on any device (PWA + Android app)

**Pricing Section**

- Free tier callout ("Your first report is FREE")
- Pay-per-report: R99
- Agent Pro: R499/month (with feature list)
- CTA: "Get Started Free"

**Social Proof / Trust**

- "Built for South Africa" — SA address format, SA payment gateway, SA-specific
- POPIA compliant
- Data stored in Europe (Firebase europe-west1)

**Footer**

- Links: Privacy Policy, Terms & Conditions, Support
- Contact: admin@cyass.co.za
- Website: cyass.co.za

### Pricing Page (`/pricing`)

Full pricing comparison table:

| Feature            | Free     | Pay-Per-Report | Agent Pro  |
| ------------------ | -------- | -------------- | ---------- |
| Reports            | 1-2 free | R99 each       | Unlimited  |
| Photo evidence     | Yes      | Yes            | Yes        |
| Video walkthroughs | Yes      | Yes            | Yes        |
| PDF generation     | Yes      | Yes            | Yes        |
| GPS verification   | Yes      | Yes            | Yes        |
| Public sharing     | Yes      | Yes            | Yes        |
| Team members       | —        | —              | 3 included |
| Any template       | —        | —              | Yes        |
| Price              | Free     | R99/report     | R499/month |

### How It Works (`/how-it-works`)

Detailed walkthrough with screenshots/mockups of each step (Steps 1-7 from Section 3).

### For Agents (`/agents`)

Dedicated landing page for agents:

- "Run your inspection business from your phone"
- Team management features
- Use any inspection template
- Unlimited reports
- R499/month
- CTA: "Start Your 2 Free Reports"

### For Tenants (`/tenants`)

- "Protect your deposit"
- Document everything before you move in
- Your first report is free
- CTA: "Create Your Free Report"

### Privacy Policy (`/privacy`)

Already exists in-app at `/privacy`.

### Terms & Conditions (`/terms`)

Already exists in-app at `/terms`.

### Support (`/support`)

Already exists in-app at `/support`. Contact: admin@cyass.co.za.

---

## 6. Inspection Categories by Room Type

These are the exact categories inspected per room type:

### Standard Room (Bedroom, Living Room, etc.)

Walls, Windows, Carpets/Floors, Doors, Ceiling, Light Fittings, Power Points

### Bathroom

Walls, Floors, Basin, Toilet, Shower/Bath, Taps/Plumbing, Ventilation, Light Fittings

### Kitchen

Walls, Windows, Floors, Cabinets, Countertops, Sink, Appliances, Plumbing, Light Fittings, Electrical Points

### Patio

Surface, Railings, Roofing/Cover, Drainage, Lighting

### Outbuilding

Structure, Roofing, Walls, Doors/Windows, Flooring, Electrical, Other

### Exterior

Roof, Gutters, External Walls, Garden/Lawn, Driveway, Fencing, Security Features

### Special Features

Solar Power, Backup Power (generator/UPS), Water Systems (borehole/JoJo tanks), Irrigation, Pool & Equipment, Security Systems (alarms/cameras/electric fence), Air Conditioning, Gas Installations, Smart Home Features, Other

---

## 7. Condition Rating System

Every inspection item is rated on a 5-point scale:

| Rating            | Colour          | Meaning                                                |
| ----------------- | --------------- | ------------------------------------------------------ |
| **Good**          | #277020 (green) | No issues, acceptable condition                        |
| **Fair**          | #f5a409 (amber) | Minor wear, cosmetic issues — comment required         |
| **Poor**          | #c62121 (red)   | Significant damage or deterioration — comment required |
| **Urgent Repair** | #c62121 (red)   | Immediate attention needed — comment required          |
| **N/A**           | #777777 (grey)  | Not applicable to this property                        |

**Rule**: Any rating other than Good or N/A **requires** a written comment explaining the issue.

---

## 8. Report Status Lifecycle

```
draft → completed → finalized → paid
  │         │           │          │
  │         │           │          └── Payment confirmed, PDF accessible
  │         │           └── Locked/immutable, timestamp set
  │         └── All rooms inspected, can still edit
  └── Active editing, rooms and items being added
```

---

## 9. Platform Availability

| Platform      | Status  | Details                                                                            |
| ------------- | ------- | ---------------------------------------------------------------------------------- |
| **Web (PWA)** | Live    | Works on any modern browser. Installable as app on mobile. Offline support.        |
| **Android**   | Built   | Capacitor-wrapped native app. Native camera access. App ID: `co.za.cyass.coverass` |
| **iOS**       | Planned | PWA works on Safari. Native app not yet built.                                     |

---

## 10. Technical Overview (For Web Developer)

The marketing website is **separate** from the app. The app lives at `app.cyass.co.za` and is a React SPA. The marketing website should live at `cyass.co.za` (or `www.cyass.co.za`) and can be built with any static site tool (Next.js, Astro, plain HTML, WordPress, etc.).

**Key integration points:**

- "Sign Up" / "Get Started" buttons should link to: `https://app.cyass.co.za/signup`
- "Login" should link to: `https://app.cyass.co.za/login`
- Privacy/Terms can link to the app's existing pages or be duplicated on the marketing site
- No API integration needed — the website is purely informational/marketing

**Assets needed:**

- App screenshots / mockups (inspection flow, PDF output, dashboard)
- Logo (exists in `app/client/src/assets/`)
- Brand colours: #0c0e43 (dark navy), #88cb11 (CTA green)

---

## 11. Key Selling Points (For Copy)

1. **"Your first report is free"** — zero barrier to entry
2. **"Court-ready documentation"** — GPS-verified, timestamped, photo evidence
3. **"Works offline"** — critical for SA where connectivity is unreliable
4. **"60 seconds to start"** — sign up, add property, start inspecting
5. **"Built for South Africa"** — SA address format, SA provinces, Rand pricing, Yoco payments
6. **"Professional PDF reports"** — not a screenshot or a WhatsApp photo album
7. **"No paper, no disputes"** — digital trail that both parties can access
8. **"Team management for agencies"** — one subscription covers your whole team

---

## 12. Competitive Positioning

CoverAss differentiates from generic inspection tools by being:

- **SA-specific**: Address formats, provinces, Rand pricing, Yoco payments, POPIA compliance
- **Role-aware**: Different inspection templates for tenants vs landlords vs buyers vs contractors
- **Offline-first**: PWA with IndexedDB persistence — works in areas with poor signal
- **Affordable**: R99/report or R499/month unlimited — priced for the SA market
- **No hardware required**: Works on any smartphone — no special equipment needed
- **Agent-focused pro tier**: Team management, template flexibility, subscription model

---

## 13. Legal Pages Summary

### Privacy Policy

- Data stored on Firebase (Google Cloud, europe-west1)
- Photos/videos stored in Firebase Storage under user's account
- GPS coordinates captured for property verification
- No data sold to third parties
- POPIA (Protection of Personal Information Act) compliant
- Users can request data deletion

### Terms & Conditions

- Reports are user-generated — CoverAss is the tool, not the inspector
- "Solo report" disclaimer on PDFs generated without a professional inspector
- Finalized reports are immutable by design
- Payment is non-refundable once report is generated
- Service provided by C Y Assets

---

## 14. Contact & Business Details

|                  |                   |
| ---------------- | ----------------- |
| Trading name     | C Y Assets        |
| App name         | CoverAss          |
| Domain           | cyass.co.za       |
| App URL          | app.cyass.co.za   |
| Support email    | admin@cyass.co.za |
| Firebase project | coverass-9aac1    |
| Region           | europe-west1      |

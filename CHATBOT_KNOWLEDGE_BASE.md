# CoverAss — Chatbot Knowledge Base

> This document contains all questions and answers a prospective user might ask about CoverAss. Feed this to your website chatbot as its knowledge source. Answers are written in a friendly, conversational tone.

---

## GENERAL

### What is CoverAss?
CoverAss is a property condition inspection app built for South Africa. It lets you inspect a property room by room, rate the condition of everything (walls, floors, plumbing, etc.), take photos, record video walkthroughs, and generate a professional PDF report — all from your phone. Think of it as the digital replacement for those paper checklists you fill in when moving in or out of a rental.

### Who is CoverAss for?
CoverAss is for anyone involved in a property transaction or handover in South Africa:
- **Tenants** protecting their deposit during move-in or move-out
- **Landlords** documenting property condition between tenants
- **Buyers** doing due diligence before purchasing
- **Sellers** proving property condition at time of sale
- **Real estate agents** creating professional reports for clients
- **Contractors** documenting repairs, maintenance, and quoting work

### Why do I need a property condition report?
Without a documented report, it's your word against theirs. If a landlord claims you damaged something, or a buyer says you hid defects, you have no proof. CoverAss creates a timestamped, GPS-verified, photo-documented report that holds up in disputes. It's your digital evidence trail.

### Is CoverAss only for South Africa?
CoverAss is built specifically for the South African market — the address format uses SA provinces, pricing is in Rand, and payments go through Yoco (a SA payment provider). However, anyone can use it to inspect any property.

### What does the name CoverAss mean?
It means exactly what you think — cover yourself. Document everything so you're protected when disputes arise. The business trades as C Y Assets.

### Is this an app or a website?
CoverAss is a native Android app. You can download and install it on your phone. It works offline and uses your phone's camera directly.

### Do I need an internet connection to use it?
You need internet to sign up, log in, and sync your data. But once you're in an inspection, the app works offline — your data saves locally and photos queue for upload. Everything syncs automatically when you're back online. This is important in South Africa where connectivity can be unreliable.

### Is my data safe?
Yes. Your data is stored on Google Cloud (Firebase) in the europe-west1 region. Only you can access your own properties, reports, and photos. We don't sell your data to anyone. The app is POPIA (Protection of Personal Information Act) compliant.

### Can I use CoverAss on iPhone?
Currently CoverAss is available as an Android app. An iOS version is planned for the future.

### Can I use it on my computer?
Yes, you can access CoverAss through your web browser at app.cyass.co.za. However, the app is designed primarily for mobile use since you need to take photos and capture GPS at the property.

---

## GETTING STARTED

### How do I sign up?
Download the app, tap "Sign Up", and enter your full name, email, password, and select your role (tenant, landlord, buyer, seller, agent, or contractor). Agents and contractors can also add their agency name. You'll need to verify your email before logging in.

### Can I sign up with Google?
Yes, Google sign-in is supported as an alternative to email/password.

### Which role should I choose?
Choose the role that matches how you'll use the app:
- **Tenant** if you're renting and want to document condition for your deposit
- **Landlord** if you own rental properties
- **Buyer** if you're purchasing a property
- **Seller** if you're selling a property
- **Agent** if you're a real estate professional doing inspections for clients
- **Contractor** if you do repairs, maintenance, or renovations

Your role determines which inspection template you see. Agents get the special ability to use any role's template.

### Can I change my role later?
Your role is set during signup. If you need to change it, contact us at admin@cyass.co.za.

### I didn't receive the verification email.
Check your spam/junk folder. The email comes from Firebase Authentication. If you still can't find it, try signing up again or contact admin@cyass.co.za.

### I forgot my password.
On the login page, tap "Forgot Password" and enter your email. You'll receive a reset link. Follow the link to set a new password.

---

## PRICING & PAYMENTS

### Is CoverAss free?
You get free reports to try the app:
- **Agents and contractors**: 2 free reports
- **All other roles** (tenant, landlord, buyer, seller): 1 free report

After your free reports, you pay per report or subscribe.

### How much does a single report cost?
R99 per report. You pay when you want to access the final PDF.

### What is the Agent Pro subscription?
Agent Pro is a monthly subscription for R499/month that gives you:
- **Unlimited reports** — no per-report charges
- **3 team members included** — they share your subscription
- **Any inspection template** — use tenant, landlord, buyer, seller, or contractor templates
- Best value if you create more than 5 reports per month

### Who can subscribe to Agent Pro?
Agent Pro is available to users with the Agent or Contractor role.

### Can I add more than 3 team members?
The base Agent Pro plan includes 3 team members. Additional team members will be available at R100/month each (coming soon).

### How do I pay?
Payments are processed through Yoco, South Africa's leading online payment provider. You can pay with credit card, debit card, or other methods supported by Yoco.

### When do I need to pay?
You only pay when you want to view or download the final PDF of a finalized report. You can create properties, inspect rooms, take photos, and complete the entire inspection for free. Payment is only required at the final step.

### Is payment once-off or recurring?
- **Single report**: Once-off R99 payment. You pay once and the report is yours forever.
- **Agent Pro subscription**: R499 billed monthly. Cancel anytime.

### Can I get a refund?
Payments are non-refundable once the report PDF has been generated. If you experience a technical issue, contact admin@cyass.co.za and we'll help.

### What happens when my subscription expires?
Your existing reports remain accessible. You just can't create new reports for free — you'd need to renew or pay per report. Your team members also lose unlimited access until you renew.

### Do my team members need to pay separately?
No. If you're subscribed to Agent Pro, your team members share your subscription. They can create unlimited reports at no extra cost.

---

## PROPERTIES

### How do I add a property?
From the dashboard, tap "Add Property." Fill in the property name, type, address, and capture GPS. The app will request your phone's location for GPS verification.

### What property types are supported?
House, Townhouse, Flat, Cluster, Cottage, Granny Flat, and Other.

### Why does the app need my GPS location?
GPS coordinates are captured to verify that the inspection was actually done at the property's location. This adds credibility to the report and can be important in disputes. The coordinates and accuracy are included in the PDF report.

### What if my GPS accuracy is poor?
The app warns you if GPS accuracy is worse than 200m. You can still continue, but the report will reflect the reduced accuracy. For best results, stand outside or near a window when capturing GPS.

### Can I edit a property after creating it?
Yes, you can update property details at any time from the property list.

### Can I delete a property?
Yes. Deleting a property removes it from your list (soft delete). Existing reports linked to that property are not affected.

### What address format is used?
South African format: street number, street name, suburb, city, province (9 SA provinces), and postal code.

---

## REPORTS & INSPECTIONS

### How do I start an inspection?
1. Go to "New Report"
2. Select the property you want to inspect
3. Add rooms (e.g. Main Bedroom, Kitchen, Bathroom 1)
4. Start inspecting room by room

### What rooms can I add?
You can add as many rooms as you need. Each room has a type that determines what gets inspected:
- **Standard** (bedrooms, living rooms, etc.) — walls, windows, floors, doors, ceiling, lights, power
- **Bathroom** — walls, floors, basin, toilet, shower, taps, ventilation, lights
- **Kitchen** — walls, windows, floors, cabinets, counters, sink, appliances, plumbing, lights, power
- **Patio** — surface, railings, roofing, drainage, lighting
- **Outbuilding** — structure, roofing, walls, doors, flooring, electrical
- **Exterior** — roof, gutters, walls, garden, driveway, fencing, security
- **Special Features** — solar, generator, water systems, pool, security systems, aircon, gas, smart home

### What are the condition ratings?
Each item is rated on a 5-point scale:
- **Good** — no issues
- **Fair** — minor wear or cosmetic issues
- **Poor** — significant damage or deterioration
- **Urgent Repair** — needs immediate attention
- **N/A** — not applicable to this property

### Do I have to add comments?
Comments are mandatory for any condition rated Fair, Poor, or Urgent Repair. This ensures every issue is documented with an explanation. Comments are optional for Good and N/A.

### Can I take multiple photos per item?
Yes. You can take as many photos as needed per inspection item. Photos are automatically compressed to save storage and bandwidth.

### Can I record a video?
Yes. Each room supports an optional video walkthrough — up to 2 minutes long, max 50MB. This is great for showing the overall condition of a room.

### What if my photo upload fails?
The app automatically queues failed uploads and retries when your connection improves. You'll see a "pending" indicator on photos that haven't uploaded yet. They'll sync automatically — you don't need to do anything.

### Does the app auto-save?
Yes. All your inspection data saves automatically every 1.5 seconds. You'll never lose work if you accidentally close the app or your phone dies. Photo uploads happen immediately.

### Can I go back and edit a room?
Yes, you can navigate between rooms and edit anything until the report is finalized.

### What does "finalize" mean?
Finalizing locks the report permanently — no more edits. This is by design: a finalized report is tamper-proof evidence. The system checks that every room has at least one inspection item before allowing finalization.

### Can I edit a finalized report?
No. Finalized reports are immutable. This is intentional — it ensures the report is reliable evidence that hasn't been altered after the fact. If you need to make changes, create a new report.

### Can I delete a report?
Yes, you can delete draft or completed reports. Finalized and paid reports cannot be deleted.

### What is the report status flow?
1. **Draft** — you're actively inspecting and adding data
2. **Completed** — all rooms inspected, but you can still make edits
3. **Finalized** — locked, immutable, ready for PDF generation
4. **Paid** — payment confirmed, PDF is accessible

---

## PDF REPORTS

### What does the PDF look like?
The PDF is a professional A4 document that includes:
- Report title, date, and status
- Inspector name and agency (if applicable)
- Property details (address, type, GPS coordinates)
- Condition overview with statistics and a visual progress bar
- Room-by-room detail pages with condition ratings, notes, and photos
- Colour-coded condition badges (green, amber, red)
- Legal disclaimer
- Page numbers

### How do I generate the PDF?
After finalizing your report, tap "Generate PDF" on the Report Summary page. The PDF is generated on your device and uploaded to the cloud. You can then download it or share it.

### Can I share my report?
Yes. Every report has a public shareable link. Anyone with the link can view the report — no login needed. This is perfect for sending to landlords, tenants, agents, or legal representatives.

### Can the other party edit the shared report?
No. Shared reports are read-only. Nobody can modify a finalized report.

### Do the photos appear in the PDF?
Yes. All photos you took during the inspection appear in the PDF, organised by room and category.

### Is the PDF legally valid?
The PDF includes GPS coordinates, timestamps, photo evidence, and condition ratings — all of which support its use as evidence in disputes. However, CoverAss is a documentation tool, not a legal service. The report documents what the inspector observed. For legal matters, consult a professional.

### What does "Solo Report" mean in the PDF?
If a report is generated without a professional inspector (i.e., by the tenant or property owner themselves), the PDF includes a "Solo Report" watermark/disclaimer. This indicates the inspection was self-conducted.

---

## AGENTS & TEAMS

### What extra features do agents get?
Agents can:
- Use **any role's inspection template** (tenant, landlord, buyer, seller, contractor)
- Subscribe to **Agent Pro** for unlimited reports
- **Manage a team** of up to 3 members (included in subscription)
- Add their **agency name** to reports

### How does team management work?
From Settings, you can invite team members by email. If they already have a CoverAss account, they're added to your team immediately. If they haven't signed up yet, they'll be automatically linked to your team when they do sign up. Team members share your Agent Pro subscription — they get unlimited reports at no extra cost.

### Can my team members see my reports?
No. Each user's reports are private to them. Team membership only shares the subscription benefit (unlimited reports). It does not share data between team members.

### Can contractors also have teams?
Yes. Both agents and contractors can subscribe to Agent Pro and manage teams.

### What happens to my team if I cancel my subscription?
Your team members lose unlimited report access when your subscription expires. They'd need to pay per report (R99 each) or you can renew your subscription.

### Can I remove a team member?
Yes. Go to Settings → Team Members and tap "Remove" next to the member you want to remove.

---

## TECHNICAL & TROUBLESHOOTING

### The app is running slowly. What should I do?
For best performance:
- Close other apps to free up memory
- Ensure you have a stable internet connection for uploads
- Avoid inspecting too many rooms in a single session without letting uploads complete
- If photos are queued, wait for them to sync before starting new rooms

### My photos aren't uploading.
Photos are automatically compressed and uploaded. If your connection is poor, they'll queue and retry automatically. Check your internet connection. If uploads remain stuck, try closing and reopening the app.

### The camera isn't working.
Make sure you've granted camera permissions to the app. On Android, go to Settings → Apps → CoverAss → Permissions → Camera → Allow.

### Video recording fails.
Video recording requires camera and microphone permissions. Make sure both are granted. Mobile videos record at 480p to prevent memory issues. If recording still fails, ensure you have enough free storage on your device.

### Can I use CoverAss without GPS?
GPS is required for property verification. On mobile, the app uses your device's GPS. If you're having trouble getting a GPS fix, try stepping outside or near a window. Desktop users can skip GPS for testing purposes.

### I paid but my report still shows as unpaid.
Payment confirmation usually takes a few seconds. If it's been more than a minute, refresh the page. If the issue persists, contact admin@cyass.co.za with your report details and we'll sort it out.

### How do I contact support?
Email us at admin@cyass.co.za. You can also visit the Support page in the app.

---

## ACCOUNT & DATA

### How do I change my password?
You can reset your password from the login page by tapping "Forgot Password."

### Can I delete my account?
To request account deletion, contact admin@cyass.co.za. We'll remove your account and associated data in compliance with POPIA.

### Where is my data stored?
Your data is stored on Google Cloud (Firebase) in the europe-west1 region (Belgium). Photos and videos are stored in Firebase Storage. All data is encrypted in transit and at rest.

### Is CoverAss POPIA compliant?
Yes. We comply with the Protection of Personal Information Act. We only collect data necessary for the service, we don't sell your data, and you can request deletion at any time. See our Privacy Policy for full details.

### Can I export my data?
You can download your PDF reports at any time. For a full data export, contact admin@cyass.co.za.

### What happens if I lose my phone?
Your data is synced to the cloud. Just log in on a new device and everything is there — properties, reports, photos, PDFs. The only data you might lose is photos that were queued but hadn't uploaded yet.

---

## COMPARISON & VALUE

### How is CoverAss different from just taking photos on my phone?
Photos on your phone have no structure, no condition ratings, no GPS verification, and no professional report. CoverAss organises everything by room and category, requires you to rate and comment on each item, timestamps everything, and generates a professional PDF that's shareable and credible.

### How is CoverAss different from a paper checklist?
Paper checklists get lost, can't include photos, aren't timestamped, and don't have GPS verification. CoverAss is digital, backed up to the cloud, includes unlimited photos and video, and produces a professional PDF. It's also much faster — auto-save means you never lose progress.

### Can't I just use WhatsApp to document a property?
You could, but WhatsApp photos have no structure, no condition ratings, and no report. Scrolling through hundreds of WhatsApp photos in a dispute is not practical. CoverAss gives you an organised, professional document that clearly maps every issue to a room and category with photos, ratings, and comments.

### Do I need to hire a professional inspector?
No. CoverAss is designed for anyone to use — you don't need training or qualifications. Tenants, landlords, buyers, and sellers can all create their own reports. That said, agents and contractors may provide more thorough inspections due to their professional experience. Reports created without a professional include a "Solo Report" disclaimer.

### Is R99 per report worth it?
Consider what's at stake. A single report costs R99. A deposit dispute can cost thousands of rands. A property defect discovered after purchase can cost tens of thousands. R99 for timestamped, GPS-verified, photo-documented evidence is a small price for peace of mind.

### Is the Agent Pro plan worth it?
If you create more than 5 reports per month, Agent Pro (R499/month) is cheaper than paying R99 per report. You also get team members included, so your whole team can create unlimited reports. For active agents and contractors, it pays for itself quickly.

---

## MISCELLANEOUS

### Can I use CoverAss for commercial properties?
CoverAss is designed for residential properties, but the inspection categories are general enough to work for many commercial spaces too. The room types (Standard, Kitchen, Bathroom, Exterior, etc.) apply to most property types.

### Can I inspect the same property multiple times?
Yes. You can create multiple reports for the same property — for example, a move-in report and a move-out report, or annual condition checks.

### Can two people inspect the same property at the same time?
Each report belongs to one user. If two people need to inspect, they'd each create their own report. Reports cannot be shared for collaborative editing.

### Is there a limit on how many properties I can add?
No. You can add as many properties as you need.

### Is there a limit on how many rooms per report?
No. Add as many rooms as the property has.

### Is there a limit on how many photos per item?
No hard limit. Take as many photos as needed to document the condition. Photos are compressed automatically to manage storage.

### What languages is CoverAss available in?
Currently English only.

### Do you offer training or onboarding?
The app is designed to be intuitive — most users don't need training. If you're an agency that needs help onboarding your team, contact admin@cyass.co.za and we'll assist.

### How do I give feedback or report a bug?
Email admin@cyass.co.za with details about what happened, what device you're using, and any screenshots if possible. We appreciate all feedback.

### Are there any tutorials or guides?
The app guides you through the process step by step. A "How It Works" page on the website walks through the full workflow with visuals.

---

## QUICK REFERENCE

### Key URLs
- **App**: app.cyass.co.za
- **Website**: cyass.co.za
- **Support**: admin@cyass.co.za

### Pricing Summary
| Plan | Price | Reports | Team |
|------|-------|---------|------|
| Free | R0 | 1-2 reports | — |
| Pay-Per-Report | R99 | 1 report | — |
| Agent Pro | R499/month | Unlimited | 3 members |

### Condition Ratings
| Rating | Meaning | Comment Required? |
|--------|---------|------------------|
| Good | No issues | No |
| Fair | Minor wear | Yes |
| Poor | Significant damage | Yes |
| Urgent Repair | Immediate attention needed | Yes |
| N/A | Not applicable | No |

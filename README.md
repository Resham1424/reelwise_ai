# Reelwise

**Reelwise** is an AI-powered Reels recommendation agent built for **PromptWars x Rgmcet — Build with AI** (Google for Developers). It watches how a student interacts with Reels — what they watch, like, replay, or skip — infers their real underlying interest using a **Latent Intent Engine** powered by **Google Gemini**, and recommends a genuinely useful tech Reel instead of more of the same shallow content. Every recommendation is checked against **HypeShield**, which filters out clickbait and low-substance content before it's ever suggested.

The goal isn't to stop students from scrolling. It's to make the scrolling they're already doing count for something.

---

## The Problem

Students spend significant time on short-form content. Much of it is harmless entertainment, but a lot of it could be nudged toward educational or career value — *if* the recommendation logic actually understood the viewer's interests instead of repeating the same surface-level topic.

## The Trap This Project Solves

A student watches a Java meme, a "day in the life of a software engineer" Reel, a coding interview joke, and a laptop comparison. A shallow recommender sees "Java" and serves up another generic Java Reel. Reelwise instead infers the **broader latent interest** behind the pattern — Software Engineering, not just Java syntax — and recommends something substantive, like a System Design Reel. It also runs every candidate through **HypeShield**, explicitly rejecting hype/clickbait content (e.g. "10 AI Tools That Will Get You a Job in 48 Hours") even when it would otherwise be a topical match.

---

## How It Works

### 1. Reels Feed
The user scrolls a Reel feed and interacts naturally — watch, like, rewatch, or skip. Each Reel shows a live **HypeShield quality score** (e.g. `HypeShield 92% · Quality Verified`) and captures a behavioral signal in the background (e.g. *"developer lifestyle & work culture · context beats keywords"*).

### 2. AI Signal Engine (the reveal moment)
After a few interactions, Reelwise triggers an **AI Signal Engine** moment that walks through three steps:

- **Connecting** — aggregates the behavioral signals from the session (e.g. *Programming Concepts, Developer Career & Culture, Coding Interviews & Algorithms, Workstation Hardware & Tools*) and synthesizes intent beyond keyword matching.
- **Revealed** — separates the **surface signal** (e.g. "Java Programming" — just the language format used) from the **primary interest** (e.g. "Software Engineering" at 96% confidence), and explains how it got there by correlating completion rates across developer lifestyle, interview prep, and hardware content.
- **Recommendation** — declares it won't recommend another Java Reel, and instead surfaces a Reel that expands the real interest (e.g. a High-Level Design Reel on scalable API architecture), with a "Why this?" explanation tied directly to the detected interest.

### 3. HypeShield Decision Layer
Every recommendation is chosen from a set of evaluated candidates, each explicitly marked **SELECTED** or **REJECTED** with a reason — e.g. rejecting a sensationalist "get a job in 48 hours" Reel for low technical depth and zero architectural substance, while selecting a Reel for its architectural depth and verified source.

### 4. Signals Lab
A dashboard view of the session: counts of Watched / Liked / Replayed / Skipped Reels, a **Semantic Cluster Graph** showing cross-Reel affinity across inferred interest categories, and live **HypeShield Defense Engine** stats (percentage of clickbait filtered, overall quality density score).

---

## Output Format

```
CURRENT REEL: [reference]
INTEREST DETECTED: [topic / interest]
WHY: [evidence from content]
RECOMMENDED TECH REEL: [topic/title]
CATEGORY: [AI / DSA / Java / HLD / Cybersecurity / Cloud / Hardware / Career / Other]
WHY THIS RECOMMENDATION: [connection to interest]
DIFFICULTY: [Beginner / Intermediate / Advanced]
CONFIDENCE: [High / Medium / Low]
```

---

## Architecture

```
                       │
              ┌────────▼────────┐
              │  Reel Interface │
              └────────┬────────┘
                       │
              User interactions
             Like / Watch / Skip
                       │
              ┌────────▼────────┐
              │  Backend / API  │
              └────────┬────────┘
                       │
                Google Gemini
                       │
          ┌────────────▼────────────┐
          │ Latent Interest Engine  │
          └────────────┬────────────┘
                       │
             (e.g. Software Engineering)
                       │
                Candidate Reels
                       │
                 HypeShield
                       │
             Useful Recommendation
                       │
                 "Why this?"
```

---

## Demo

**1. Reels Feed** — the demo flow steps through 4 curated Reels (Java → Day-in-the-life → Coding → Laptop), each carrying a live HypeShield quality score.

<img width="500" alt="Reelwise feed showing Java Developer Problems reel with HypeShield 92% quality score" src="https://github.com/user-attachments/assets/106b0dd1-e13d-437d-aa6f-d8dc962ca799" />

**2. Behavioral signal capture** — liking a Reel captures a signal beyond its surface topic (developer lifestyle & work culture), and the user can ask "Why this?" at any point.

<img width="500" alt="Day in the Life of a Software Engineer reel, liked, with captured signal panel" src="https://github.com/user-attachments/assets/e60c146c-7fa8-4e00-9038-245921527411" />

**3. AI Signal Engine — Connecting** — after 4 Reels, Reelwise aggregates the behavioral signals into a matrix before synthesizing intent.

<img width="600" alt="AI Signal Engine connecting step showing aggregated signal matrix across 4 reels" src="https://github.com/user-attachments/assets/81ddc26b-86c2-4a3c-a6ce-85793232330f" />

**4. AI Signal Engine — Revealed** — the surface signal (Java Programming) is separated from the primary latent interest (Software Engineering, 96% confidence), with an explanation of how it was inferred.

<img width="500" alt="Latent discovery screen: Java Programming as surface signal vs Software Engineering as primary interest at 96 percent" src="https://github.com/user-attachments/assets/8421d59a-f8ba-4a47-bc2b-14c91cea3ba1" />

**5. AI Signal Engine — Recommendation & HypeShield** — the final recommendation with a full breakdown of which candidates were rejected (and why) versus selected.

<img width="550" alt="Recommendation screen showing HypeShield decision layer with rejected and selected candidate reels" src="https://github.com/user-attachments/assets/781a1f3e-19d9-4d59-8fd4-4348e677a01c" />

**6. Signals Lab** — session-level dashboard with interaction counts, a semantic cluster graph across inferred interests, and live HypeShield defense stats.

<img width="550" alt="Signals Lab dashboard showing active session signals, semantic cluster graph, and HypeShield defense engine stats" src="https://github.com/user-attachments/assets/1e2636de-3e5e-445b-8b28-21fdce2d411c" />

---

## Key Features

- **Latent intent inference, not keyword matching** — Gemini reasons across a session of interactions to separate surface-level topic (e.g. programming language) from the real underlying interest (e.g. software engineering as a field).
- **HypeShield** — an explicit decision layer that scores and screens every candidate Reel for clickbait, sensationalism, and low technical substance before it can be recommended, and shows its reasoning for every rejection and selection.
- **Transparent reasoning end-to-end** — from per-Reel "Signal Captured" notes, to the AI Signal Engine's step-by-step reveal, to a "Why this?" explanation on every recommendation.
- **Session-level analytics** — a Signals Lab dashboard tracks watched/liked/replayed/skipped counts, a semantic cluster affinity graph, and live clickbait-filtered / quality-density metrics.
- **Mobile-first Reel interface** — built and previewed via Expo, matching the interaction model of real short-form apps (watch/like/rewatch/skip).

---

## Tech Stack

- **Frontend:** React Native (Expo) — mobile-style Reel feed, AI Signal Engine modal, Signals Lab dashboard
- **Backend:** API layer handling interaction events and orchestrating recommendation requests
- **AI:** Google Gemini for latent interest inference and HypeShield candidate scoring
- **Deployment:** Google Cloud Run

---

## Running Locally

```bash
# Clone the repository
git clone https://github.com/Resham1424/reelwise_ai.git
cd reelwise_ai

# Install dependencies
npm install

# Add your Gemini API key
# Create a .env file:
# GEMINI_API_KEY=your_key_here

# Start the app
npm run dev
```

To preview on a phone, scan the QR code served at the app's `/mobile` route using **Expo Go** (available on the App Store / Google Play).

---

## Live Preview

- **Mobile preview (Expo Go):** https://reel-insight-engine--rresham317.replit.app/mobile/

---

## Security Audit

Reelwise has been audited against the following security dimensions, all passing:

| Security Dimension | Result | Verification Notes |
|---|---|---|
| **API Key Protection** | ✅ PASS | `GEMINI_API_KEY` is isolated to `server.ts` / server-side env. Verified zero occurrences in frontend bundles. |
| **PII Sanitization** | ✅ PASS | `sanitizeInteractionData` strips names, emails, phone numbers, device UUIDs, tokens, and HTML tags. |
| **Input Validation** | ✅ PASS | Enforces 0–100% watch constraints, valid types, and payload size bounds; rejects malformed inputs. |
| **Rate Limiting** | ✅ PASS | Sliding-window limiter restricts excessive requests per client IP and returns safe HTTP 429 errors. |
| **Error Handling** | ✅ PASS | Stack traces, file paths, and credentials are redacted from client HTTP responses. |
| **Gemini Safety** | ✅ PASS | Configured safety settings (HarmCategory thresholds) with graceful fallback on model blocking. |
| **Secure Secret Management** | ✅ PASS | `.gitignore` excludes `.env`, `*.key`, `*.pem`, and `credentials.json`. No secrets are committed. |
| **Security Tests** | ✅ PASS | All 7 security tests and 3 inference integrity tests execute green via `npm test`. |
| **Cloud Run Security** | ✅ PASS | Compatible with containerized deployments via `process.env.PORT` and server-side environment secrets. |

Run the security and inference integrity suite locally with:

```bash
npm test
```

---

## Evaluation Context

Built for the **PromptWars x Rgmcet — Build with AI** challenge. Submissions are scored via automated Code Assessment on the platform against:

- Code quality
- Security
- Efficiency
- Testing
- Accessibility
- Problem statement alignment
- Google services usage

Only the final submission's score counts toward the leaderboard (best-attempt scores are not used), and the deployed Cloud Run link must remain functional to qualify for the Top 10.

---

## Example Walkthrough

**Watched:** Java meme → SWE lifestyle Reel → coding interview joke → laptop comparison

**Output:**
```
CURRENT REEL: MacBook Pro vs Dell XPS for Programmers
INTEREST DETECTED: Software Engineering / Career Growth
WHY: Interactions span Java humor, SWE lifestyle content, interview prep, and dev hardware — a pattern of broad software engineering interest, not just Java itself
RECOMMENDED TECH REEL: How Modern Software Engineers Design Scalable APIs
CATEGORY: HLD
WHY THIS RECOMMENDATION: Interactions indicate a broader interest in software engineering, developer careers, and technology. System design expands that interest into core engineering practices instead of looping repetitive Java memes.
DIFFICULTY: Intermediate
CONFIDENCE: High

🚫 HypeShield: "10 AI Tools That Will Get You a Job in 48 Hours" was considered but rejected — sensationalist headline, low technical depth, zero architectural substance.
```

---

## Why This Approach

Most naive recommenders optimize for topical similarity, which risks reinforcing the same shallow content loop it's meant to improve. Reelwise optimizes for **inferred latent interest** and layers HypeShield on top to explicitly guard against low-substance, engagement-bait content — with every step of the reasoning surfaced to the user instead of hidden in a black box.

---

## Roadmap

- Persist interest profiles across sessions
- Expand the Reel catalog with real, moderated tech content
- Track long-term interest drift across multiple sessions
- Let users tune HypeShield sensitivity

---

## License

MIT

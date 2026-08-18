# Reelwise

**Reelwise** is an AI-powered Reels recommendation agent built for **PromptWars x Rgmcet — Build with AI** (Google for Developers). It analyzes the Reels a student watches, likes, or skips, infers their real underlying interest using **Google Gemini**, and recommends a genuinely useful tech Reel instead of more of the same shallow content — while actively filtering out hype/clickbait content along the way.

The goal isn't to stop students from scrolling. It's to make the scrolling they're already doing count for something.

---

## The Problem

Students spend significant time on short-form content. Much of it is harmless entertainment, but a lot of it could be nudged toward educational or career value — *if* the recommendation logic actually understood the viewer's interests instead of repeating the same surface-level topic.

## The Trap This Project Solves

A student watches a Java meme, a "day in the life of a software engineer" Reel, a coding interview joke, and a laptop comparison. A shallow recommender sees "Java" and serves up another generic Java Reel. Reelwise instead infers the **broader latent interest** — Software Engineering / Career Growth — and recommends something substantive, like a system design or DSA Reel. It also explicitly checks any candidate recommendation against **HypeShield**, rejecting clickbait content (e.g. "10 AI Tools That Will Get You a Job") even when it would otherwise be a topical match.

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

**How it flows:**
1. **Reel Interface** — the user watches, likes, or skips Reels in a mobile-style feed.
2. **Backend / API** — captures these interactions and sends the interaction history for reasoning.
3. **Google Gemini** — powers the reasoning layer that looks across interactions rather than matching keywords.
4. **Latent Interest Engine** — infers the underlying interest behind the pattern of interactions (e.g. a Java meme + SWE lifestyle Reel + interview joke + laptop comparison → *Software Engineering*, not just "Java").
5. **Candidate Reels** — the pool of tech Reels that could match the inferred interest.
6. **HypeShield** — filters out hype-driven, clickbait, or low-substance content from the candidates before it's ever recommended.
7. **Useful Recommendation + "Why this?"** — the final Reel is returned along with a transparent explanation of why it was chosen, so the reasoning isn't a black box.

---
DEMO PHOTOS
<img width="500" height="500" alt="Screenshot 2026-08-18 122852" src="https://github.com/user-attachments/assets/106b0dd1-e13d-437d-aa6f-d8dc962ca799" />
<img width="720" height="796" alt="Screenshot 2026-08-18 122922" src="https://github.com/user-attachments/assets/e60c146c-7fa8-4e00-9038-245921527411" />
<img width="1061" height="729" alt="Screenshot 2026-08-18 122944" src="https://github.com/user-attachments/assets/81ddc26b-86c2-4a3c-a6ce-85793232330f" />
<img width="758" height="806" alt="Screenshot 2026-08-18 123003" src="https://github.com/user-attachments/assets/8421d59a-f8ba-4a47-bc2b-14c91cea3ba1" />
<img width="831" height="783" alt="Screenshot 2026-08-18 123023" src="https://github.com/user-attachments/assets/781a1f3e-19d9-4d59-8fd4-4348e677a01c" />
<img width="853" height="806" alt="Screenshot 2026-08-18 123059" src="https://github.com/user-attachments/assets/1e2636de-3e5e-445b-8b28-21fdce2d411c" />

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

## Key Features

- **Latent interest inference, not keyword matching** — Gemini reasons across a sequence of interactions to detect the underlying interest, not just the last topic watched.
- **HypeShield** — an explicit filter layer that screens out clickbait/listicle-style content before it can be recommended, even if it topically matches.
- **Transparent reasoning** — every recommendation ships with a "Why this?" explanation grounded in the user's actual interaction evidence.
- **Difficulty-aware recommendations** — matches content depth to where the student appears to be, nudging them one step up rather than sideways.
- **Mobile-first Reel interface** — built and previewed via Expo, so the interaction model matches real short-form apps (swipe/watch/skip/like).

---

## Tech Stack

- **Frontend:** React Native (Expo) — mobile-style Reel feed
- **Backend:** API layer handling interaction events and orchestrating recommendation requests
- **AI:** Google Gemini for interest inference and recommendation reasoning
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
RECOMMENDED TECH REEL: System Design: How Netflix Handles Millions of Users
CATEGORY: HLD
WHY THIS RECOMMENDATION: Builds on demonstrated interest in the SWE career path with practical system design knowledge relevant to interviews and real engineering roles
DIFFICULTY: Intermediate
CONFIDENCE: High

🚫 HypeShield: "10 AI Tools That Will Get You a Job in 2026" was considered but rejected as clickbait/hype content.
```

---

## Why This Approach

Most naive recommenders optimize for topical similarity, which risks reinforcing the same shallow content loop it's meant to improve. Reelwise optimizes for **inferred latent interest** and layers HypeShield on top to explicitly guard against low-substance, engagement-bait content — with every recommendation staying explainable through the "Why this?" reasoning.

---

## Roadmap

- Persist interest profiles across sessions
- Expand the Reel catalog with real, moderated tech content
- Track long-term interest drift across multiple sessions
- Surface HypeShield rejections directly in the UI for transparency

---

## License

MIT

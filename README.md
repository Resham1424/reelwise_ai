# ReelWise AI

**ReelWise AI** is an intelligent Reels recommendation agent built for a hackathon challenge: students spend hours scrolling short-form content, much of it low-value entertainment. Instead of trying to stop the scrolling, ReelWise AI makes it *smarter* — it analyzes the Reels a student has already watched, infers their real underlying interest (not just surface keywords), and recommends a tech Reel that genuinely deepens that interest.

It does **not** do simple keyword matching (e.g. "watched a Java meme → recommend another Java meme"). It reasons across a sequence of watched Reels to detect a broader theme — like *Software Engineering / Career Growth* — and it actively filters out hype/clickbait content (e.g. "10 AI Tools That Will Get You a Job") even when that content would superficially match.

---

## The Problem

Short-form content (Reels/Shorts) is a major time sink for students. Much of it is harmless entertainment, but a lot of it could be redirected toward educational or career value — *if* the recommendation logic actually understood what the student cares about, instead of just repeating the same topic.

## The Trap This Project Solves

A student watches:
1. A Java meme
2. A "day in the life of a software engineer" Reel
3. A coding interview joke
4. A laptop comparison video

A shallow recommender sees "Java" and suggests another generic Java Reel. ReelWise AI instead recognizes the **pattern across all four Reels** — software engineering and career interest — and recommends something substantive like a System Design or DSA Reel. It also explicitly checks for and rejects hype-bait content (e.g. AI listicles promising quick job wins) even if it would otherwise be an obvious topical match.

---

## How It Works

1. **Watch history input** — the user "watches" a sequence of Reels from a seed catalog.
2. **Interest inference** — the engine looks across the watched Reels' categories, summaries, and tone (not just keywords) to infer a broader interest and a confidence level.
3. **Hype filter** — any Reel flagged as clickbait/hype-bait is excluded from recommendations, even if it topically matches.
4. **Recommendation** — the engine selects a tech Reel that deepens the inferred interest, one difficulty step above the simplest Reel already watched.
5. **Structured output** — every recommendation returns the same structured fields, so results are consistent and explainable.

### Output Format

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

- **Interest inference, not keyword matching** — clusters signals across multiple Reels into a single underlying interest.
- **Anti-hype filter** — explicitly detects and excludes clickbait/listicle-style content from recommendations, and surfaces *why* it was rejected.
- **Difficulty-aware recommendations** — matches content depth to where the student appears to be (Beginner → Intermediate progression).
- **Explainable reasoning** — every recommendation includes the evidence behind the inferred interest, not a black-box output.
- **Rule-based core with optional LLM enhancement** — works fully offline/without any API key using a deterministic rule-based engine; if an LLM API key is available, it enhances the reasoning quality without ever being a single point of failure.

---

## Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express
- **Data:** local JSON seed file (`reels.json`) — no external database required
- **AI enhancement (optional):** Anthropic/OpenAI API, used only to enrich reasoning text; falls back gracefully to rule-based logic if unavailable

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Resham1424/reelwise_ai.git
cd reelwise_ai

# Install dependencies
npm install

# (Optional) Enable LLM-enhanced reasoning
# Create a .env file and add one of the following:
# ANTHROPIC_API_KEY=your_key_here
# OPENAI_API_KEY=your_key_here

# Run the app
npm run dev
```

The app runs fully functional with **no API key required** — the rule-based inference engine is the default and does not depend on any external service.

---

## Project Structure

```
/server
  index.js        # Express server, serves API + frontend
  reels.json      # seed Reel catalog
  engine.js        # recommendation engine (rule-based + optional LLM enhancement)
/src
  App.jsx
  components/
    Feed.jsx            # scrollable Reel feed, tap to "watch"
    ReasoningPanel.jsx   # live interest confidence display
    ResultCard.jsx       # final structured recommendation output
  index.css
```

---

## Example Walkthrough

**Watched:** Java meme → SWE lifestyle Reel → coding interview joke → laptop comparison

**Output:**
```
CURRENT REEL: MacBook Pro vs Dell XPS for Programmers
INTEREST DETECTED: Software Engineering / Career Growth
WHY: Watched Reels span Java humor, SWE lifestyle content, interview prep, and dev hardware — a pattern of general software engineering career interest, not just Java itself
RECOMMENDED TECH REEL: System Design: How Netflix Handles Millions of Users
CATEGORY: HLD
WHY THIS RECOMMENDATION: Builds on demonstrated interest in the SWE career path with practical system design knowledge relevant to interviews and real engineering roles
DIFFICULTY: Intermediate
CONFIDENCE: High

🚫 Hype Filter: "10 AI Tools That Will Get You a Job in 2026" was considered but rejected as clickbait/hype content.
```

---

## Why This Approach

Most naive recommenders optimize for topical similarity. ReelWise AI optimizes for **inferred underlying interest** and explicitly guards against recommending low-substance, hype-driven content — directly addressing the risk that an AI recommender could just amplify the same shallow content loop it's meant to improve.

---

## Roadmap / Future Improvements

- Persist watch history across sessions per user
- Expand the seed catalog and support user-submitted Reels
- Track long-term interest drift over multiple sessions
- A/B test rule-based vs. LLM-enhanced recommendation quality

---

## License

MIT

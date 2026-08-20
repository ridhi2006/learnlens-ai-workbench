# LearnLens AI Studio

Build a **complete, polished, production-quality frontend UI** for a web application called:

# LearnLens AI

### A Multi-Video Personal Knowledge & Learning Intelligence Agent

Use:

* **React**
* **Vite**
* **Tailwind CSS**
* React Router
* Framer Motion / Motion for animations
* Lucide React for icons
* React Flow / `@xyflow/react` for the interactive knowledge graph
* Recharts only where learning analytics actually need charts
* Sonner for refined toast notifications
* shadcn/ui-style accessible primitives where useful
* Any other lightweight React library only when it genuinely improves the UX

This task is primarily about building the **frontend and UI system**. Use realistic mock data where backend/AI functionality is not yet connected.

Do NOT turn this into a generic AI landing-page template.

The website should feel like a real modern AI learning product that could compete visually with products such as **Linear, Notion, ChatGPT, Perplexity, Raycast, Vercel, Stripe, Arc, and modern education SaaS products**, while still having its **own original identity**.

---

# 1. PRODUCT IDEA

LearnLens AI transforms educational YouTube videos into an intelligent, personalized learning experience.

A student pastes a YouTube video link.

LearnLens then helps them:

* view the transcript
* generate an AI summary
* create cheat notes
* generate quizzes
* export study material as PDF
* explore an interactive knowledge graph
* ask questions about any exact video timestamp
* use an AI tutor
* take an AI interview/assessment
* detect weak or missing concepts
* generate a personalized learning roadmap
* track learning history
* save videos
* share learning sessions like ChatGPT shared conversations

The core idea is:

> LearnLens does not simply summarize a YouTube video. It understands the video, helps the learner study it, tests the learner, identifies knowledge gaps, and recommends what they should learn next.

The UI should communicate this clearly.

---

# 2. OVERALL DESIGN DIRECTION

The application should feel:

* premium
* intelligent
* calm
* modern
* futuristic without becoming sci-fi
* educational but not childish
* professional enough for university students, developers and lifelong learners
* visually impressive enough for a university AI/ML project evaluation
* clean enough to realistically become a startup product

Avoid:

* excessive gradients everywhere
* giant blobs
* random glowing cards
* excessive glassmorphism
* childish illustrations
* generic blue-purple AI design
* excessive rounded cards
* every section floating independently
* overly large headings everywhere
* random icon decoration
* visually noisy dashboards
* animations just for decoration
* a design that obviously looks AI-generated

Use originality and restraint.

---

# 3. COLOR THEME

Create a sophisticated dark-first AI learning theme.

## Primary background

Use deep near-black/navy backgrounds such as:

`#070A10`
`#0B0F17`
`#0F1420`

Do not use pure black everywhere.

## Surface colors

Use slightly lighter layered surfaces:

`#111722`
`#151C28`
`#182130`

Borders should be subtle:

`rgba(255,255,255,0.07)`

## Main brand color

Use an intelligent **electric indigo / violet** as the primary brand accent.

Examples:

`#7C6CF2`
`#8B7CF6`

## Secondary accent

Use a controlled cyan/blue accent:

`#42C7F5`

This may be used for:

* knowledge graph relations
* active indicators
* AI intelligence visualizations
* progress
* subtle gradients

## Success / mastered

Use:

`#35D07F`

## Warning / learning gap

Use warm amber:

`#F4B860`

## Error

Use restrained coral/red.

## Text

Primary:

`#F5F7FB`

Secondary:

`#A6B0C3`

Muted:

`#707C91`

---

# 4. BRAND GRADIENT

Use the primary gradient selectively:

```text
violet → indigo → cyan
```

Example:

`#8B7CF6 → #6366F1 → #42C7F5`

Use it primarily for:

* logo accents
* primary CTA
* hero visual
* selected knowledge graph nodes
* progress highlights

Do NOT apply the gradient to every card, heading and button.

---

# 5. TYPOGRAPHY

Use a clean modern sans-serif.

Preferred:

* Inter
* Geist
* Manrope

Use one main family consistently.

Typography hierarchy should feel similar to Linear / Vercel.

Landing-page hero:

large but controlled.

Desktop:

approximately 64–76px.

Mobile:

40–48px.

Dashboard headings should be significantly smaller.

Use strong contrast between:

* page title
* section title
* body
* metadata
* labels

Do not make every piece of text bold.

---

# 6. SPACING + STRUCTURE

Use a disciplined spacing system.

Prefer:

* spacious landing page
* denser application workspace
* 12-column responsive grid where useful
* consistent max-width around `1280px–1440px`
* strong alignment between sections

Use borders and spacing more often than shadows.

Shadows should be subtle.

Cards should not all look identical.

Some information should live directly in the layout without containers.

---

# 7. BORDER RADIUS

Use medium rounded corners:

* buttons: 10–12px
* cards: 14–18px
* large panels: around 20px
* pills: full rounded when appropriate

Avoid making everything extremely round.

---

# 8. LIGHT MODE

Primary design should be dark.

However, implement a working light/dark theme toggle if reasonable.

Light mode should use:

* warm off-white background
* white surfaces
* dark navy text
* same violet/indigo brand identity

Dark mode should remain the visual showcase.

---

# 9. MOTION SYSTEM

Animations are extremely important, especially on the landing page.

Use **Framer Motion / Motion**.

Animations should feel smooth, premium and intentional.

Do not make every component bounce.

Use:

* opacity fades
* blur-to-sharp reveals
* subtle translateY
* staggered children
* spring hover interactions
* layout transitions
* animated tabs
* animated progress
* number count-up
* smooth page transitions
* animated knowledge graph
* subtle background motion

Typical timing:

`150ms–450ms`

Landing hero can use slightly longer cinematic sequences.

Respect `prefers-reduced-motion`.

---

# 10. LANDING PAGE

Route:

`/`

This page must be the most visually impressive area of the product.

It should immediately communicate:

> Turn any educational YouTube video into an interactive AI learning experience.

---

## LANDING NAVBAR

Sticky transparent navbar.

Initially transparent.

When user scrolls:

* slight background blur
* darker translucent surface
* subtle bottom border

Structure:

LEFT:

LearnLens AI logo

CENTER:

* Product
* Features
* How It Works
* Learning Intelligence
* About

RIGHT:

* Sign In
* Get Started

Use a polished mobile hamburger menu.

### Logo

Create a minimal logo mark that feels related to:

* learning
* connections
* intelligence
* knowledge graph

Possible idea:

a small connected-node symbol forming an abstract `L`.

Do not use a cliché robot icon.

---

# 11. HERO SECTION

Hero should occupy most of the first viewport.

Suggested content:

Small badge:

`AI-Powered Learning Intelligence`

Main heading:

# Stop Just Watching.

# Start Actually Learning.

or

# Turn Every YouTube Video Into Your Personal AI Learning Space.

Supporting copy:

> LearnLens transforms educational videos into summaries, smart notes, quizzes, knowledge graphs, AI tutoring and personalized learning paths.

Primary CTA:

`Analyze a Video`

Secondary CTA:

`See How It Works`

Below CTA place the main product input:

```text
Paste a YouTube learning video

[ https://youtube.com/...                 ] [ Analyze ]
```

Add a small message:

`No installation required · Start learning in seconds`

---

# 12. HERO VISUAL

Do NOT use a stock illustration.

Create an animated mock LearnLens workspace.

The hero visual should show a realistic product UI preview.

For example:

LEFT:

small YouTube video player

CENTER:

animated knowledge graph

RIGHT:

AI Tutor panel

BOTTOM:

tabs:

`Summary · Transcript · Quiz · Roadmap`

Example concepts:

```text
                    Binary Search
                         |
        --------------------------------
        |               |              |
    Search Space     Lower Bound     Complexity
                         |
                    Upper Bound
```

Animate graph nodes gently.

Show an AI answer card appearing:

`At 17:32 the instructor explains why...`

This visually explains the product without requiring lots of text.

---

# 13. HERO BACKGROUND

Use a subtle animated background.

Possible elements:

* faint radial violet glow
* soft blue glow
* barely-visible grid
* slow-moving gradient mesh
* tiny connected-node lines
* mouse-following glow on desktop

Keep opacity very low.

No excessive particles.

---

# 14. TRUST / PRODUCT VALUE STRIP

Below hero add:

```text
From passive watching → active understanding
```

Show four compact items:

`Understand`

`Explore`

`Practice`

`Improve`

Use subtle animated connecting line.

---

# 15. PROBLEM SECTION

Heading:

# Watching is not the same as learning.

Show the normal YouTube learning problem.

For example:

```text
Watch a 60-minute tutorial
↓
Take scattered notes
↓
Search doubts elsewhere
↓
Forget important concepts
↓
Wonder what to learn next
```

Opposite side:

LearnLens flow:

```text
Watch
↓
Understand
↓
Practice
↓
Detect gaps
↓
Learn next
```

Use a tasteful before/after visual.

---

# 16. CORE FEATURE SHOWCASE

Do not simply make eight identical cards.

Create alternating large showcase sections.

---

## Feature 1 — Interactive Knowledge Graph

Large visual.

Show nodes:

```text
Binary Search
  ├ Search Space
  ├ Complexity
  ├ Lower Bound
  └ Upper Bound
```

Allow hover/click interaction in demo form.

Description:

> Transform linear video content into an explorable map of concepts and relationships.

Add small labels:

`Explore concepts`

`Jump to timestamps`

`Ask AI`

---

## Feature 2 — Ask Any Timestamp

Show:

```text
17:32

"What exactly is being explained here?"
```

AI response appears.

Include a small transcript segment beside it.

---

## Feature 3 — Intelligent Study Material

Show tabs:

* Summary
* Cheat Sheet
* Quiz
* PDF Notes

Animate tab switching.

---

## Feature 4 — Adaptive AI Tutor

Show mode switcher:

`Learn`

`Ask`

`Interview`

Conversation preview:

AI:

`Why is Binary Search O(log n)?`

Student answer.

AI assessment.

---

## Feature 5 — Knowledge Gaps + Roadmap

Visual:

```text
MASTERED
✓ Binary Search Basics
✓ Upper Bound

WEAK
⚠ Lower Bound

NOT COVERED
○ Rotated Sorted Array
○ Binary Search on Answer
```

Then:

```text
Recommended next step
Rotated Sorted Array
```

Connect the concepts visually.

---

# 17. HOW IT WORKS SECTION

Use four steps.

### 01

Paste a YouTube URL

### 02

LearnLens understands the video

### 03

Study interactively

### 04

Get your personalized learning path

Use a timeline or connected layout.

Animate each stage as it enters viewport.

---

# 18. AI INTELLIGENCE SECTION

Make it clear LearnLens does more than prompt an LLM.

Visual architecture:

```text
Video Transcript
       ↓
Topic Understanding
       ↓
Semantic Retrieval
       ↓
AI Tutor
       ↓
Learning Assessment
       ↓
Knowledge Gap Detection
       ↓
Personalized Roadmap
```

Do not make this overly technical on the landing page.

Present it beautifully.

---

# 19. PRODUCT PREVIEW SECTION

Create a full-browser style mockup showing the actual LearnLens Learning Workspace.

This should resemble the real `/learn/:videoId` page.

Add subtle parallax / scale effect on scroll.

---

# 20. FINAL CTA

Heading:

# Your next video can become your next mastered topic.

Input again:

```text
[ Paste a YouTube link                        ]

[ Start Learning ]
```

Background may have subtle knowledge-network animation.

---

# 21. LANDING FOOTER

Professional footer.

Columns:

### Product

* Features
* AI Tutor
* Knowledge Graph
* Learning Roadmap

### Resources

* How It Works
* Help
* Documentation

### Company

* About
* Contact

Bottom:

`© LearnLens AI`

Include GitHub if appropriate.

Do not overpopulate.

---

# 22. AUTHENTICATION PAGES

Routes:

`/login`

`/signup`

Use a split layout on desktop.

LEFT:

branding + subtle LearnLens visualization.

RIGHT:

authentication card.

Login:

* email
* password
* remember me
* forgot password
* Sign In
* Continue with Google
* create account

Signup:

* name
* email
* password
* confirm password

Keep consistency with landing theme.

Use proper form states:

* focus
* error
* loading
* disabled
* success

---

# 23. APPLICATION SHELL

After login, use an application layout different from the marketing navbar.

Desktop:

persistent left sidebar.

Mobile/tablet:

collapsible drawer.

Do NOT keep the full landing navigation inside the logged-in app.

---

# 24. MAIN SIDEBAR

Width approximately `240–270px`.

Structure:

```text
LearnLens AI

[ + Analyze New Video ]

MAIN
Dashboard
My Learning
Library

RECENT
Binary Search
Graph BFS & DFS
React Hooks

-----------------

Settings
Profile
```

Allow collapse into icon-only mode.

Active navigation should use:

* subtle tinted background
* thin violet accent
* high contrast text

Recent sessions should be slightly muted.

---

# 25. APPLICATION TOP BAR

Inside the main content area:

LEFT:

page title / breadcrumb

CENTER or available space:

global search if appropriate

RIGHT:

* notifications
* theme toggle
* user avatar

Keep height consistent throughout application pages.

---

# 26. DASHBOARD

Route:

`/dashboard`

Purpose:

personal learning overview.

Header:

```text
Good evening, Alex

Ready to continue learning?
```

Primary CTA:

`Analyze New Video`

---

## Continue Learning

Create one larger featured card.

Example:

`Binary Search Complete Tutorial`

Progress:

`72%`

Last studied:

`Today`

Button:

`Continue Learning`

Use thumbnail and subtle progress ring/bar.

---

## Learning Statistics

Show:

* Videos Analyzed
* Concepts Learned
* Quiz Average
* Current Learning Streak

Use minimal metric cards.

Avoid huge dashboard-style enterprise charts.

---

## Recent Learning

Horizontal or responsive card grid:

* Binary Search
* BFS & DFS
* React Hooks

Each card:

thumbnail

topic

progress

last accessed

continue button

---

## Weak Topics

Show:

```text
Lower Bound
Boundary Conditions
Graph Cycles
```

Use amber accent.

Button:

`Review Weak Topics`

---

## Recommended Next

Use a standout recommendation card:

```text
Recommended next

Rotated Sorted Array

Based on your Binary Search progress
```

CTA:

`Start Learning`

---

# 27. ANALYZE VIDEO PAGE

Route:

`/analyze`

This page should be simple and focused.

Center content with ample whitespace.

Heading:

# What do you want to learn today?

Subtext:

`Paste an educational YouTube video and let LearnLens build your learning workspace.`

Large URL input.

Include YouTube icon.

Placeholder:

`https://www.youtube.com/watch?v=...`

Primary:

`Analyze Video`

---

# 28. LEARNING MODE SELECTOR

Below URL:

`How should LearnLens teach you?`

Options:

### Beginner

Simple explanations and analogies.

### College

Structured academic learning.

### Revision

Concise high-value review.

### Interview

Interview-focused concepts and questions.

Use selectable cards.

Selection should animate.

---

# 29. ANALYZING STATE

After submission, create a premium intermediate screen.

Do not use just a basic spinner.

Show stages:

```text
✓ Video detected

✓ Transcript extracted

● Understanding concepts

○ Building knowledge graph

○ Preparing your learning space
```

Include animated progress line.

Small rotating insights:

`Identifying key concepts...`

`Finding topic relationships...`

`Preparing your quiz...`

Then transition smoothly to the workspace.

---

# 30. LEARNING WORKSPACE

Route:

`/learn/:videoId`

THIS IS THE MOST IMPORTANT SCREEN.

It should feel like a professional AI productivity application.

Use the application sidebar.

Inside the learning workspace, include a secondary workspace navigation.

Possible structure:

```text
Overview
Transcript
Notes
Knowledge Graph
Quiz
AI Tutor
Learning Path
```

On desktop this can be:

* secondary left sub-navigation
  or
* compact horizontal segmented navigation

Choose whichever keeps the interface spacious.

---

# 31. WORKSPACE HEADER

Top area:

Video thumbnail small

Title:

`Binary Search Complete Tutorial`

Metadata:

`46 min · 7 concepts · Intermediate`

Actions:

* Save
* Share
* Export
* More

Show learning mode pill:

`College Mode`

Allow changing mode.

---

# 32. OVERVIEW TAB

Route may remain:

`/learn/:videoId`

or nested state.

Layout:

LEFT / primary:

embedded video mock player

RIGHT:

AI Overview panel

Show:

### AI Summary

Short summary.

### Key Concepts

Clickable concept chips.

Examples:

`Binary Search`

`Search Space`

`Lower Bound`

`Upper Bound`

`O(log n)`

### Video Intelligence

* 7 concepts detected
* 2 examples
* 1 algorithm
* intermediate level

At bottom:

`Continue Learning`

with quick shortcuts:

`Open Notes`

`Take Quiz`

`Explore Graph`

---

# 33. TRANSCRIPT TAB

Make this highly usable.

Header:

`Transcript`

Actions:

* Search
* Copy
* Filter by chapter
* optional auto-scroll toggle

Transcript rows:

```text
00:00
Introduction

02:14
Binary Search is an efficient searching algorithm...
```

Timestamps must be clickable.

Active timestamp should highlight.

When user hovers a transcript paragraph:

show actions:

* Ask AI
* Copy
* Save note

---

# 34. ASK ABOUT TIMESTAMP

When timestamp is clicked, open a right-side drawer or contextual AI panel.

Example:

```text
Ask LearnLens about 17:32
```

Input:

`What does the instructor mean here?`

Suggestions:

* Explain simply
* Give an example
* Why is this important?
* Show code

Response card:

```text
At 17:32, the instructor explains why...
```

Below:

`Based on transcript 16:58–18:15`

CTA:

`Jump to Video`

Maintain chat context if user asks a follow-up.

---

# 35. NOTES TAB

Header:

`Study Notes`

Secondary tabs:

```text
Summary
Cheat Sheet
Revision Notes
```

---

## Summary

Structured sections:

* Overview
* Key Ideas
* Important Concepts
* Examples
* Takeaways

---

## Cheat Sheet

More compact.

Example:

```text
BINARY SEARCH

Requirement
Sorted search space

Formula
mid = left + (right-left)/2

Move right
target > arr[mid]

Complexity
O(log n)
```

Include copy buttons.

---

## Revision Notes

Ultra-short bullet-oriented study material.

Actions:

* Copy
* Regenerate
* Export PDF

---

# 36. PDF EXPORT

Do not create a separate page.

When clicking `Export PDF`, open a modal.

Options:

```text
Study Pack

✓ Summary
✓ Cheat Sheet
✓ Key Concepts
✓ Quiz
✓ Learning Roadmap
```

Button:

`Generate PDF`

Show nice generation state.

---

# 37. KNOWLEDGE GRAPH TAB

This should be one of the most visually impressive application features.

Use `@xyflow/react`.

Full interactive canvas.

Example:

```text
                        Binary Search
                              |
             --------------------------------
             |              |               |
       Fundamentals      Variations      Complexity
             |              |               |
       Search Space      Lower Bound        O(log n)
                         Upper Bound
```

Node categories should have subtle visual differences.

Do not use random rainbow colors.

Primary topic:

violet.

Related concepts:

blue/cyan.

Mastered:

green indicator.

Weak:

amber indicator.

---

# 38. GRAPH INTERACTIONS

Support:

* pan
* zoom
* fit view
* hover
* click
* node focus
* reset
* fullscreen

On node click open a right-side detail panel.

Example:

```text
Lower Bound

Status
Learning

Definition
Find the first position where...

Explained in video
31:20–35:48

Confidence
72%
```

Actions:

`Jump to Video`

`Ask AI`

`Practice`

Animate edges very subtly.

---

# 39. QUIZ TAB

Initial screen:

```text
Test your understanding

10 questions
Estimated 6 min
```

Difficulty options:

* Easy
* Medium
* Hard

CTA:

`Start Quiz`

---

# 40. QUIZ EXPERIENCE

Show one question at a time.

Top progress:

`Question 4 of 10`

Progress bar.

Question.

Answers.

After selecting:

do not immediately give distracting animation.

On submit show:

* correct
* incorrect
* explanation

Navigation:

Previous / Next

---

# 41. QUIZ RESULTS

Create an engaging result page inside the tab.

Large score:

`8 / 10`

or progress ring.

Sections:

### Strong

Binary Search Basics

Complexity

### Needs Improvement

Lower Bound

Boundary Conditions

CTA:

`Improve Weak Topics`

Secondary:

`Review Answers`

`Try Again`

This result should visually connect to the Learning Path feature.

---

# 42. AI TUTOR TAB

This should resemble a sophisticated AI conversation interface.

Header:

`LearnLens Tutor`

Mode control:

```text
Learn
Ask
Interview
```

---

# 43. LEARN MODE

AI proactively teaches concepts based on the current video.

Use conversational cards but do not clone ChatGPT exactly.

Provide quick suggestions:

* Explain this simply
* Give me an analogy
* Show another example
* Test me

---

# 44. ASK MODE

User can ask free-form questions.

Input fixed near bottom.

Placeholder:

`Ask anything about this video...`

Support:

* multiline
* send button
* timestamp reference
* concept reference

Example:

`Why is the array required to be sorted?`

AI response should display relevant timestamp sources.

---

# 45. INTERVIEW MODE

Make this feel different from normal chat.

Header:

`AI Interview`

Description:

`LearnLens will test how well you understood this topic.`

Show:

`Question 2 of 5`

AI asks:

`Why is Binary Search O(log n)?`

Student textarea.

Button:

`Submit Answer`

After answer:

show compact evaluation:

```text
Understanding 8/10

Good:
You correctly explained halving.

Improve:
Explain how the number of halvings relates to log₂(n).
```

Continue.

---

# 46. INTERVIEW RESULT

At end:

```text
Interview Complete
```

Metrics:

* Concept Understanding
* Explanation Quality
* Complexity
* Application

Use clean progress bars.

Show:

`Detected Weak Area: Boundary Conditions`

CTA:

`Update Learning Path`

---

# 47. LEARNING PATH TAB

Combine:

* Knowledge Gap Detector
* Roadmap Generator

Header:

# Your Learning Path

Subtext:

`Based on this video, your quiz results and learning history.`

---

# 48. COVERAGE ANALYSIS

Three sections.

### Mastered

Green.

```text
✓ Binary Search Basics
✓ Time Complexity
✓ Upper Bound
```

### Needs Work

Amber.

```text
⚠ Lower Bound
⚠ Boundary Conditions
```

### Not Covered

Neutral/muted.

```text
○ Rotated Sorted Array
○ Peak Element
○ Binary Search on Answer
```

---

# 49. ROADMAP VISUAL

Create a vertical or horizontal connected learning roadmap.

Example:

```text
Binary Search Basics
MASTERED
     ↓

Lower Bound
REVISE
     ↓

Rotated Sorted Array
NEXT
     ↓

Peak Element
LOCKED
     ↓

Binary Search on Answer
LOCKED
```

Use elegant connecting lines.

Current recommendation should be visually dominant.

CTA:

`Start Next Topic`

---

# 50. MY LEARNING PAGE

Route:

`/my-learning`

Purpose:

show long-term learner knowledge.

Header:

`My Learning`

Subtext:

`See what you've mastered, what you're learning and what needs attention.`

---

# 51. KNOWLEDGE OVERVIEW

Use a clean topic hierarchy.

Example:

```text
Data Structures & Algorithms

Arrays             92%
Strings            80%
Binary Search      72%
Linked Lists       64%
Trees              43%
Graphs             20%
```

Use restrained progress bars.

Do not make it look like a finance dashboard.

---

# 52. KNOWLEDGE GRAPH OVERVIEW

Optional large visual:

`Your Knowledge Map`

Show nodes across learned topics.

Use React Flow.

Mastered nodes have subtle green status.

Weak nodes amber.

Unlearned nodes muted.

---

# 53. RECENTLY MASTERED

Show compact list/cards.

```text
Binary Search Basics
Mastered today

Sliding Window
Mastered 2 days ago
```

---

# 54. REVISION NEEDED

Example:

```text
Lower Bound
Last score: 40%

Tree Diameter
Last score: 55%
```

Buttons:

`Revise`

---

# 55. LIBRARY PAGE

Route:

`/library`

Header:

`My Library`

Subtext:

`All of your analyzed learning videos.`

Search.

Filters:

```text
All
In Progress
Completed
Recently Added
```

View toggle:

grid/list.

---

# 56. VIDEO CARD

Each saved-video card should include:

thumbnail

topic/title

creator

duration

learning progress

quiz score if available

concept count

last studied

Buttons:

`Continue`

three-dot menu.

Actions:

* Share
* Export
* Remove

---

# 57. SHARED SESSION PAGE

Route:

`/share/:shareId`

This route should NOT display the logged-in sidebar.

Use simplified header:

LearnLens logo

`Shared Learning Session`

Optional:

`Open in LearnLens`

---

# 58. SHARED SESSION CONTENT

Show:

Video title

thumbnail

shared by

summary

selected notes

knowledge graph

selected AI discussion

Do not expose:

private learning history

all quiz attempts

account information

Make it clearly:

`View-only`

---

# 59. SHARE MODAL

Inside workspace when user clicks Share:

```text
Share this learning session
```

Options:

* include Summary
* include Notes
* include Knowledge Graph
* include AI Conversation

Button:

`Create Link`

Then:

```text
learnlens.ai/share/abc123
```

Copy button with toast.

---

# 60. PROFILE PAGE

Route:

`/profile`

Show:

avatar

name

email

learning level

total topics learned

joined date

Keep this simple.

---

# 61. SETTINGS PAGE

Route:

`/settings`

Sections:

### Appearance

Dark / Light / System

### Learning Preferences

Default mode:

* Beginner
* College
* Revision
* Interview

### AI Preferences

response depth

concise / balanced / detailed

### Account

basic settings

Do not overbuild.

---

# 62. MOBILE EXPERIENCE

The entire application must be responsive.

Landing:

* stack hero
* reduce large decorative effects
* horizontally scroll feature demos only where appropriate

App:

main sidebar becomes drawer.

Workspace navigation can become:

horizontal scrollable tabs.

Knowledge graph:

full-width canvas.

AI Tutor:

mobile-friendly chat.

Quiz:

large touch targets.

No horizontal overflow.

---

# 63. MICROINTERACTIONS

Use polished interactions throughout.

Examples:

Buttons:

slight lift + highlight.

Cards:

border becomes slightly brighter.

Knowledge nodes:

scale 1.02 + glow.

Tabs:

animated indicator.

Sidebar:

smooth collapse.

Tooltips:

fade/scale.

Copy:

icon changes to check.

Quiz:

selected options animate subtly.

Progress:

smooth width interpolation.

Roadmap:

current node pulses extremely subtly.

Do not make interfaces constantly move.

---

# 64. LOADING STATES

Every data-heavy area should have intentional loading states.

Use skeletons instead of generic spinners where appropriate.

Examples:

Dashboard cards skeleton.

Transcript skeleton lines.

AI response shimmer.

Knowledge graph building state.

Quiz-generation state.

Roadmap-generation state.

---

# 65. EMPTY STATES

Design thoughtful empty states.

Examples:

### Dashboard new user

`Your learning journey starts with one video.`

CTA:

`Analyze Your First Video`

### Library

`No saved videos yet.`

### My Learning

`LearnLens will build your knowledge map as you study.`

Avoid goofy illustrations.

---

# 66. ERROR STATES

Create polished errors.

Examples:

Invalid URL:

`That doesn't look like a valid YouTube video.`

Transcript unavailable:

`We couldn't access a transcript for this video.`

AI failure:

`LearnLens couldn't generate this section. Try again.`

Use retry actions.

---

# 67. TOASTS

Examples:

`Video saved`

`PDF generated`

`Learning mode changed`

`Share link copied`

`Progress updated`

Use Sonner.

---

# 68. ACCESSIBILITY

Ensure:

* keyboard navigation
* visible focus states
* sufficient contrast
* semantic buttons
* accessible forms
* accessible dialogs
* aria labels where needed
* reduced-motion support

---

# 69. ROUTING

Set up React Router.

Routes:

```text
/
 /login
 /signup
 /dashboard
 /analyze
 /learn/:videoId
 /my-learning
 /library
 /share/:shareId
 /profile
 /settings
```

Protected routes should conceptually include:

```text
/dashboard
/analyze
/learn/*
/my-learning
/library
/profile
/settings
```

Mock authentication is acceptable for now.

---

# 70. RECOMMENDED FRONTEND STRUCTURE

Use a scalable component structure such as:

```text
src/
│
├── assets/
│
├── components/
│   │
│   ├── common/
│   ├── layout/
│   ├── landing/
│   ├── dashboard/
│   ├── video/
│   ├── transcript/
│   ├── notes/
│   ├── quiz/
│   ├── graph/
│   ├── tutor/
│   ├── roadmap/
│   └── learning/
│
├── pages/
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── DashboardPage.jsx
│   ├── AnalyzePage.jsx
│   ├── LearningWorkspacePage.jsx
│   ├── MyLearningPage.jsx
│   ├── LibraryPage.jsx
│   ├── SharedSessionPage.jsx
│   ├── ProfilePage.jsx
│   └── SettingsPage.jsx
│
├── layouts/
│   ├── MarketingLayout.jsx
│   ├── AppLayout.jsx
│   └── WorkspaceLayout.jsx
│
├── data/
│   └── mockData.js
│
├── services/
│   └── api.js
│
├── hooks/
├── context/
├── utils/
├── App.jsx
└── main.jsx
```

Do not put the entire application in `App.jsx`.

---

# 71. REUSABLE COMPONENTS

Create reusable components such as:

```text
AppSidebar
TopBar
PageHeader
PrimaryButton
SecondaryButton
VideoCard
ProgressBar
MetricCard
ConceptChip
LearningStatusBadge
TranscriptRow
TimestampButton
AIMessage
QuizOption
KnowledgeNode
RoadmapNode
EmptyState
SkeletonCard
ShareModal
PDFModal
ModeSelector
```

Reuse them consistently.

---

# 72. MOCK DATA

Populate UI with realistic data rather than lorem ipsum.

Primary demonstration video:

`Binary Search Complete Tutorial`

Use concepts:

* Binary Search
* Search Space
* Mid Calculation
* Lower Bound
* Upper Bound
* Time Complexity
* Rotated Sorted Array
* Binary Search on Answer

Other recent videos:

`Graph BFS & DFS`

`React Hooks`

`Operating Systems: Deadlocks`

`Dynamic Programming Basics`

---

# 73. SAMPLE USER DATA

Use a neutral demo user such as:

`Alex`

Do not hardcode personal information.

Example:

Videos analyzed:

12

Concepts learned:

34

Quiz average:

78%

Learning streak:

6 days

---

# 74. IMPORTANT UX CONNECTIONS

The app must feel like ONE SYSTEM.

Connect features logically.

For example:

Quiz:

```text
Score 6/10
↓
Weak concept detected
↓
Learning Path updated
```

Interview:

```text
Boundary conditions weak
↓
Roadmap recommendation
```

Knowledge graph:

```text
Click Lower Bound
↓
Explain
↓
Jump to Timestamp
↓
Practice
```

Dashboard:

```text
Recommended next:
Rotated Sorted Array
```

Click it:

opens relevant learning path.

This cross-feature continuity is extremely important.

---

# 75. PAGE CONSISTENCY

Keep the same:

* typography
* spacing
* button system
* accent colors
* sidebar
* top bar
* hover patterns
* card styles
* border language
* loading states
* modals
* icon style

Do NOT make different pages appear like separate templates.

---

# 76. LANDING VS APPLICATION

The landing page may be more cinematic.

Use:

* larger typography
* scroll animation
* visual storytelling
* glowing gradients
* animated product previews

The application itself should become calmer and more functional.

Use:

* restrained motion
* clear information hierarchy
* lower visual noise
* tighter spacing

Do not carry excessive hero-style effects into Dashboard or Learning Workspace.

---

# 77. ORIGINALITY

Avoid patterns that make the design feel automatically generated:

* giant gradient text on every heading
* Bento grid used everywhere
* hundreds of floating rounded cards
* emojis in every section
* random stars and sparkles
* generic robot artwork
* identical section layouts
* meaningless "Trusted by 10,000+" claims
* fake company logos
* fake testimonials
* fake user numbers

Focus instead on a believable product experience.

---

# 78. IMPORTANT PRODUCT PERSONALITY

LearnLens should visually communicate:

```text
Curiosity
Clarity
Intelligence
Progress
Focus
Mastery
```

It should NOT communicate:

```text
gaming
crypto
cyberpunk
children's learning
corporate HR software
generic chatbot
```

---

# 79. LANDING PAGE ANIMATION IDEAS

Use these selectively:

### Hero title

stagger words upward with blur removal.

### Product mockup

scale from `0.96 → 1` and fade.

### Knowledge graph

nodes connect after load.

### AI chat

text response appears gradually.

### Feature sections

animate visual from one side and copy from other.

### Roadmap

line draws down as user scrolls.

### Background

subtle gradient drift.

### Navbar

transparent → blurred surface while scrolling.

---

# 80. APP TRANSITIONS

When changing workspace tabs:

use short cross-fade / layout transition.

When opening knowledge node:

right drawer slides in.

When entering quiz:

smooth transition from intro → question.

When completing quiz:

progress transforms into results.

When generating roadmap:

nodes appear sequentially.

Keep durations short.

---

# 81. DESKTOP WORKSPACE QUALITY

The Learning Workspace should work particularly well at:

* 1440px
* 1366px
* 1280px

Do not waste horizontal space.

Allow the video and AI panels to use meaningful width.

Knowledge Graph should have a real large canvas.

---

# 82. DESIGN QUALITY BAR

Before considering a page finished, ask:

Would this screen look believable if shown as a screenshot from a funded AI startup?

Would a student immediately understand what to do?

Are the main actions obvious?

Is there enough whitespace?

Does the page feel connected to every other page?

Does motion improve understanding rather than distract?

Does the app look handcrafted rather than template-generated?

---

# 83. MOST IMPORTANT SCREENS TO PERFECT

Spend the greatest design effort on:

1. Landing Page
2. Analyze Video experience
3. Learning Workspace Overview
4. Knowledge Graph
5. AI Tutor
6. Quiz Results
7. Learning Path / Knowledge Gap view
8. Dashboard

These screens will be shown prominently during project evaluation.

---

# 84. FINAL USER FLOW

Implement UI so the user can navigate through this full mock flow:

```text
Landing
↓
Get Started
↓
Login
↓
Dashboard
↓
Analyze New Video
↓
Paste YouTube URL
↓
Select College Mode
↓
Analyzing Animation
↓
Learning Workspace
↓
View Summary
↓
Open Transcript
↓
Click 17:32
↓
Ask AI about Timestamp
↓
Explore Knowledge Graph
↓
Open Lower Bound
↓
Generate Notes
↓
Take Quiz
↓
Score 7/10
↓
Weak Concept Detected
↓
Open AI Tutor
↓
Take Interview
↓
Learning Path Updated
↓
Recommended Next Topic
↓
Save Session
↓
Share Session
```

All of these interactions can use realistic mock data for now.

---

# 85. FINAL REQUIREMENTS

Build the frontend as a cohesive real application, not static screenshots.

Requirements:

* React
* Vite
* Tailwind CSS
* responsive
* reusable components
* React Router
* working navigation
* animated transitions
* functional tabs
* modals
* dropdowns
* mock AI interactions
* mock quiz interactions
* interactive knowledge graph
* realistic loading states
* polished empty/error states
* consistent sidebar
* consistent navbar
* consistent design system
* no broken buttons
* no placeholder lorem ipsum
* no fake random content
* clean source structure

The final product should look like a serious **AI learning platform**, not a university CRUD project and not a generic AI website template.

The strongest feeling the user should get is:

> "This turns passive YouTube watching into an intelligent, personalized learning system."

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/11793792-df81-4d72-b6f0-572e24656d2d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

# 💪 FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion built with Next.js and Tailwind CSS. Pick a lift from the library, lock it into today's plan, save lifts for later, and watch the week's work add up.

## 🔗 Links

- **Live Site:** [https://ferduslabs.github.io/B14-A6-FitLog/](https://ferduslabs.github.io/B14-A6-FitLog/)
- **GitHub Repository:** [https://github.com/ferduslabs/B14-A6-FitLog](https://github.com/ferduslabs/B14-A6-FitLog)

## 🛠️ Technologies Used

- **Next.js (App Router)** — UI and page routing
- **React** — interactive components
- **Tailwind CSS** — styling and responsive design
- **FitLog API** — workout data (`https://api.abcz.workers.dev/api/fitlog`)
- **localStorage** — plan, saved, and done data persistence

## ✨ Key Features

1. **Workout Library** — twelve lifts in a responsive 3-column grid with category tags, equipment, duration, calories, and rating on every card.
2. **Workout Details Page** — two-column layout with a large illustration, key specs panel, ordered instructions, and add/save actions.
3. **Today's Plan & Saved** — add up to five lifts to today's plan (cap enforced), save workouts for later, and track everything with live navbar badge counters.
4. **Plan Metrics** — exercises, minutes, and calories summary cards that update live as lifts are added, finished, or removed.
5. **Sort & Search** — sort the plan by duration, calories, or rating, and search entries by workout name or muscle tag.
6. **Mark as Done & Remove** — finish a lift with one click and clean up your list with instant toast notifications.
7. **Persistence** — plan, saved, and done state survives page reloads via localStorage.
8. **Responsive & Complete** — mobile, tablet, and desktop layouts, a 404 page for unknown routes, and loading states on every data fetch.

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
app/
  layout.js            Root layout, fonts, navbar, footer
  page.js              Home page (hero + workout library)
  my-plan/page.js      Plan page (tabs, metrics, sort, search)
  workout/[id]/page.js Workout details page
  not-found.js         404 page
components/            Navbar, Footer, cards, toast, icons
context/PlanContext.js Plan, saved, and toast state with localStorage
lib/api.js             API base URL
lib/asset.js          Public asset paths (deployment base path aware)
public/                Logo and banner images
```

## 📬 API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

---

Train hard, log honest. © 2026 FitLog

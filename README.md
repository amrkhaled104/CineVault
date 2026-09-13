# 🎬 CineVault

> A sleek, modern movie discovery and favourites app built with **React 19**, **TypeScript**, and **Firebase**, following the clean **MVVM (Model-View-ViewModel)** architecture.

---

##  What is CineVault?

**CineVault** allows movie lovers to explore trending titles, search across millions of films and series, and curate a personal collection of favourites linked directly to their user account.

---


##  Architecture: The MVVM Pattern

The codebase is strictly separated into three distinct layers to keep the code clean, modular, and easy to maintain:

```
┌──────────────┐       ┌──────────────────────┐       ┌──────────────────┐
│     View     │  ───> │      ViewModel       │  ───> │      Model       │
│  (React UI)  │ <───  │    (Custom Hooks)    │ <───  │ (Data & Services)│
└──────────────┘       └──────────────────────┘       └──────────────────┘
```

1. **Model** (`*Model.ts` & `services/`):
   - Pure data structures, validation, and API/Firebase operations.
   - Independent of React — no hooks, no JSX.
2. **ViewModel** (`use*ViewModel.ts`):
   - Custom React hooks managing state (`loading`, `error`, `data`), events, and form actions.
3. **View** (`*View.tsx` & components):
   - Presentational React components rendering UI and forwarding user events to the ViewModel.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | Modern UI library with functional components |
| **TypeScript** | Strict end-to-end type safety |
| **Vite 8** | Lightning-fast development server & bundler |
| **React Router 7** | Client-side routing & route protection |
| **Firebase 12** | Auth & Realtime Database per user |
| **OMDb API** | Global movie & series metadata provider |

## 📜 Development & Prompt History

This app was built step-by-step using prompt-driven **Vibe Coding**.  
To review every single prompt and architectural evolution from start to finish, see **[prompts.md](prompts.md)**.
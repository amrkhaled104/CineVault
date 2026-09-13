# 📝 Project Prompt History

Here is the step-by-step prompt engineering used to build this project through Vibe Coding.

---

### Step 1: Header Component
**Prompt:**
> Create a reusable Header component.
> The Header should contain:
> - a Home navigation link
> - a Favourites navigation link
> - a search input
> - a Search button
> 
> Use React Router links for navigation.
> Only create and display the Header.
> Do not create the Home or Favourites screens yet.
> Do not connect the search input to any functionality.

---
---

### Step 2: Home MVVM Structure
**Prompt:**
> Create the empty MVVM file structure for the Home screen.
> Create:
> src/pages/Home/HomeModel.ts
> src/pages/Home/useHomeViewModel.ts
> src/pages/Home/HomeView.tsx
> Requirements:
> - HomeModel.ts will later contain Home-specific data and business logic.
> - useHomeViewModel.ts will later contain React state and actions.
> - HomeView.tsx will later render the Home interface.
> Create only minimal placeholder exports so the application can compile.
> Do not add API requests, React state, or movie UI.

---

### Step 3: Favourites MVVM Structure
**Prompt:**
> Create the empty MVVM file structure for the Favourites screen.
> Create:
> src/pages/Favourites/FavouritesModel.ts
> src/pages/Favourites/useFavouritesViewModel.ts
> src/pages/Favourites/FavouritesView.tsx
> Create only minimal placeholder exports so the application can compile.
> Do not add Firebase, state, movie cards, or other functionality.

---
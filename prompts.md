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
---

### Step 4: OMDb Movie Service Placeholder
**Prompt:**
> Create a services folder and an empty OMDb movie service file:
> src/services/omdbMovieService.ts
> Add a short comment explaining that this file will contain communication with the OMDb API.
> Do not implement the API request yet.

---
---

### Step 5: Implement OMDb Movie Search Service
**Prompt:**
> Implement the OMDb movie search request inside:
> src/services/omdbMovieService.ts
> Create an exported async function:
> searchMovies(query: string): Promise<Movie[]>
> Requirements:
> - use the OMDb API
> - read the API key from VITE_OMDB_API_KEY
> - encode the search query
> - use the Movie and OmdbSearchResponse types
> - return the Search array as Movie[]
> - throw a readable error when the HTTP request fails
> - throw a readable error when OMDb returns Response: "False"
> For the API_URL use https://www.omdbapi.com/
> Do not use React hooks.
> Do not use useEffect.
> Do not manage loading, error, or component state.

---
---

### Step 6: Implement Home Model
**Prompt:**
> Implement the Home model inside:
> src/pages/Home/HomeModel.ts
> Import searchMovies from omdbMovieService.
> Create and export:
> getMovies(query: string): Promise<Movie[]>
> Responsibilities:
> - trim the query
> - validate that the query contains at least two characters
> - call searchMovies with the cleaned query
> - return the movie list
> Do not use React hooks.
> Do not use useState or useEffect.
> Do not call fetch directly.

---
---

### Step 7: Implement Home ViewModel Custom Hook
**Prompt:**
> Implement a custom hook inside:
> src/pages/Home/useHomeViewModel.ts
> Create and export:
> useHomeViewModel()
> Manage these properties using useState:
> - query
> - movies
> - loading
> - error
> Create a function:
> handleSearch()
> The function should:
> - set loading to true
> - clear the previous error
> - call getMovies from HomeModel using the current query
> - save the returned movie list in movies state
> - store a readable error if the request fails
> - set loading to false when finished
> Return:
> - query
> - setQuery
> - movies
> - loading
> - error
> - handleSearch
> Do not render JSX.
> Do not call fetch directly.
> Do not import omdbMovieService directly.

---
---

### Step 8: Implement Home View UI
**Prompt:**
> Implement the Home view inside:
> src/pages/Home/HomeView.tsx
> Requirements:
> - import and use useHomeViewModel
> - display the current search input
> - connect the input value to query
> - update query using setQuery
> - call handleSearch when the Search button is clicked
> - also allow searching by submitting the form
> - display a loading message while loading is true
> - display the error message when error exists
> - render the movie list using .map()
> - display the movie title, year, type, and poster
> Do not call fetch directly.
> Do not import HomeModel or omdbMovieService.
> Do not implement favourites yet.
> Do not create a reusable MovieCard component yet.

---
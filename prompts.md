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
---

### Step 9: Add initialMovies Function to HomeModel
**Prompt:**
> Create an initialMovies() function inside HomeModel.
> Requirements:
> - automatically fetch at least 20 movies when the Home screen opens
> - every application launch should display a different selection of movies
> - generate the movie list by randomly selecting search keywords from a predefined seed list (for example: Batman, Avengers, Harry Potter, Star Wars, Spider-Man, Marvel, Disney, Matrix, Lord of the Rings, Fast, Mission Impossible, Pixar, Horror, Comedy, Action)
> - use Promise.all to execute requests in parallel
> - merge all results into a single array
> - remove duplicate movies using imdbID
> - shuffle the final array
> - return exactly 20 unique movies
> - keep all fetching logic inside HomeModel
> - use the existing omdbMovieService
> - do not use React hooks
> - do not call fetch directly

---
---

### Step 10: Create Reusable MovieCard Component & Update HomeView
**Prompt:**
> Create a reusable MovieCard component.
> Create:
> src/components/MovieCard/MovieCard.tsx
> Requirements:
> - receive one Movie object through props
> - display:
>   - poster
>   - title
>   - year
>   - type
> - add a Favourite button, but do not connect it yet
> - use the shared Movie type
> - keep the component presentational
> - do not call APIs
> - do not use Firebase
> - do not manage the movie list
> Update HomeView to render MovieCard using .map().

---
---

### Step 11: Initialize Firebase Configuration Service
**Prompt:**
> Create and configure Firebase for the application.
> Create:
> src/services/firebaseService.ts
> Requirements:
> - initialize Firebase using environment variables
> - export the database instance
> - do not save or load any favourites yet
> - do not modify HomeView
> - do not add authentication

---
---

### Step 12: Add Favourite Management Functions to Firebase Service
**Prompt:**
> Inside src/services/firebaseService.ts, add functions for managing favourite movies.
> Create:
> - addFavourite(movie: Movie): Promise<void>
> - removeFavourite(imdbID: string): Promise<void>
> - getFavourites(): Promise<Movie[]>
> Requirements:
> - use imdbID as the unique movie identifier
> - keep all Firebase communication inside this service
> - return typed data
> - throw readable errors when operations fail
> - do not use React hooks
> - do not update the UI yet

---
---

### Step 13: Implement Favourites Model
**Prompt:**
> Implement the Favourites model inside:
> src/pages/Favourites/FavouritesModel.ts
> Import the Firebase service functions.
> Create and export:
> - loadFavourites(): Promise<Movie[]>
> - saveFavourite(movie: Movie): Promise<void>
> - deleteFavourite(imdbID: string): Promise<void>
> Requirements:
> - act as a wrapper around firebaseService
> - do not call Firebase directly outside the service
> - do not use React hooks
> - do not manage loading or error state

---
Implement a custom hook inside:

src/pages/Favourites/useFavouritesViewModel.ts

Create and export:

useFavouritesViewModel()

Manage with useState:

- favourites
- loading
- error

Create functions:

- loadMovies()
- removeMovie(imdbID)

Requirements:

- use FavouritesModel only
- load favourites when the screen opens
- use useEffect for the initial load
- update local state after a movie is removed
- return all state and actions required by FavouritesView
- do not render JSX
- do not import firebaseService directly
---

### Step 15: Implement Favourites View UI
**Prompt:**
> Implement the Favourites view inside:
> src/pages/Favourites/FavouritesView.tsx
> Requirements:
> - use useFavouritesViewModel
> - display a loading message while loading
> - display an error message when error exists
> - render favourites using MovieCard and .map()
> - show a friendly empty message when there are no favourites
> - allow removing a movie from favourites
> - do not call Firebase directly
> - do not import FavouritesModel directly

---

---

### Step 16: Install and Configure Firebase Auth and Firestore
**Prompt:**
> Install Firebase and update the existing Firebase configuration.
> Requirements:
> * initialize Firebase Authentication using getAuth
> * initialize Cloud Firestore using getFirestore
> * export auth and db
> * read Firebase configuration from Vite environment variables
> * use the modern modular Firebase SDK
> * do not add registration or login UI yet
> * do not add anything new regarding favourites logic yet
> Create or update:
> src/services/firebaseService.ts
> Also create an .env.example file containing placeholder Firebase environment variables.

---
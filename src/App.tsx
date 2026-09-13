import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomeView from './pages/Home/HomeView'
import FavouritesView from './pages/Favourites/FavouritesView'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/favourites" element={<FavouritesView />} />
        <Route path="*" element={<HomeView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

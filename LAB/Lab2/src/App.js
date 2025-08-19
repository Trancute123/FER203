import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarMenu from "./components/NavbarMenu";
import HeroCarousel from "./components/HeroCarousel";
import MovieList from "./components/MovieList";
import FavouritesPage from "./components/FavouritesPage";
import MovieRequestForm from "./components/MovieRequestForm";
import { movies, allGenres } from "./movies";
import { Toast, ToastContainer } from "react-bootstrap";
import "./App.css";

export default function App() {
  const [favourites, setFavourites] = useState([]);
  const [toast, setToast] = useState({ show: false, text: "", variant: "success" });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favourites") || "[]");
    setFavourites(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (id) => {
    setFavourites((prev) => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      const added = !prev.includes(id);
      setToast({ show: true, text: added ? "Added to favourites!" : "Removed from favourites.", variant: added ? "success" : "warning" });
      return next;
    });
  };

  return (
    <Router>
      <div className="app-dark">
        <NavbarMenu />
        <Routes>
          <Route path="/" element={
            <>
              <HeroCarousel items={[movies[2], movies[0], movies[3], movies[7]]} />
              <MovieList
                data={movies}
                allGenres={allGenres}
                favourites={favourites}
                toggleFavourite={toggleFavourite}
              />
            </>
          } />
          <Route path="/favourites" element={
            <FavouritesPage
              data={movies}
              allGenres={allGenres}
              favourites={favourites}
              toggleFavourite={toggleFavourite}
            />
          } />
          <Route path="/request" element={<MovieRequestForm />} />
        </Routes>

        <ToastContainer position="bottom-end" className="p-3">
          <Toast bg={toast.variant} onClose={() => setToast(s=>({ ...s, show:false}))} show={toast.show} delay={1800} autohide>
            <Toast.Body className="text-dark fw-semibold">{toast.text}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </Router>
  );
}

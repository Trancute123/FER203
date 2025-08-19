import { Container, Alert } from "react-bootstrap";
import MovieList from "./MovieList";

export default function FavouritesPage({ data, allGenres, favourites, toggleFavourite }) {
  const favMovies = data.filter(x => favourites.includes(x.id));
  return (
    <Container className="py-4">
      {favMovies.length === 0
        ? <Alert variant="info">No favourites yet.</Alert>
        : <MovieList data={favMovies} allGenres={allGenres} favourites={favourites} toggleFavourite={toggleFavourite} />
      }
    </Container>
  );
}

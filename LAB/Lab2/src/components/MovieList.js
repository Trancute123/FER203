import { useMemo, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import SearchFilterBar from "./SearchFilterBar";
import MovieCard from "./MovieCard";
import DetailsModal from "./DetailsModal";

export default function MovieList({ data, allGenres, favourites, toggleFavourite }) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState("none");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const kw = search.trim().toLowerCase();
    return data.filter(m => {
      const okGenre = genre === "All" || m.genre === genre;
      const okText = !kw || m.title.toLowerCase().includes(kw) || m.description.toLowerCase().includes(kw);
      return okGenre && okText;
    });
  }, [data, search, genre]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "dur-asc") arr.sort((a,b)=>a.duration - b.duration);
    if (sort === "dur-desc") arr.sort((a,b)=>b.duration - a.duration);
    return arr;
  }, [filtered, sort]);

  return (
    <Container className="py-4">
      <SearchFilterBar
        search={search} onSearchChange={setSearch}
        genre={genre} onGenreChange={setGenre}
        sort={sort} onSortChange={setSort}
        genres={allGenres} resultCount={sorted.length}
      />

      {sorted.length === 0 && <Alert variant="warning">No movies found.</Alert>}

      <Row xs={1} sm={2} md={3} className="g-4">
        {sorted.map(m => (
          <Col key={m.id}>
            <MovieCard
              movie={m}
              isFav={favourites.includes(m.id)}
              onToggleFav={toggleFavourite}
              onDetails={setSelected}
            />
          </Col>
        ))}
      </Row>

      <DetailsModal
        show={!!selected}
        onHide={()=>setSelected(null)}
        movie={selected}
        isFav={selected ? favourites.includes(selected.id) : false}
        onToggleFav={toggleFavourite}
      />
    </Container>
  );
}

import PropTypes from "prop-types";
import { Card, Badge, Button } from "react-bootstrap";

export default function MovieCard({ movie, isFav, onToggleFav, onDetails }) {
  return (
    <Card className="h-100 bg-dark text-light movie-card shadow-sm border-0 rounded-3">
      {/* Poster ảnh cao */}
      <Card.Img
        variant="top"
        src={movie.poster}
        alt={movie.title}
        className="movie-poster"
      />
      {/* Thông tin phim */}
      <Card.Body className="d-flex flex-column text-center p-3">
        <Card.Title className="mb-1 fw-bold fs-6">{movie.title}</Card.Title>
        <div className="small mb-2 text-light">
          {movie.duration} Minutes •{" "}
          <Badge bg="warning" text="dark">
            {movie.genre}
          </Badge>
        </div>

        <div className="mt-auto d-flex gap-2 justify-content-center">
          <Button
            className="btn-custom"
            variant="outline-light"
            size="sm"
            onClick={() => onDetails(movie)}
          >
            Details
          </Button>
          <Button
            className="btn-custom"
            variant={isFav ? "danger" : "warning"}
            size="sm"
            onClick={() => onToggleFav(movie.id)}
          >
            {isFav ? "Remove" : "Add to Favourites"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
  isFav: PropTypes.bool.isRequired,
  onToggleFav: PropTypes.func.isRequired,
  onDetails: PropTypes.func.isRequired,
};

// CSS lồng trong file
const style = document.createElement("style");
style.innerHTML = `
.movie-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.5);
}
.movie-poster {
  height: 400px;       /* ảnh cao hơn */
  object-fit: cover;   /* giữ tỉ lệ */
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
}
.btn-custom {
  font-weight: 600;
  border-radius: 20px !important;
  padding: 4px 12px;
  transition: all 0.2s ease;
}
.btn-custom:hover {
  opacity: 0.9;
  transform: scale(1.05);
}
`;
document.head.appendChild(style);

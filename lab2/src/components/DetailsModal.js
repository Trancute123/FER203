import { Modal, Button, Badge } from "react-bootstrap";

export default function DetailsModal({ show, onHide, movie, isFav, onToggleFav }) {
  if (!movie) return null;

  return (
    <>
      <style>{`
        .movie-modal .modal-content{
          background:#1b222c;
          color:#e9ecef;
          border:1px solid #263447;
          font-size: 1.05rem; /* tăng cỡ chữ mặc định */
        }
        .movie-modal .modal-header{
          border-bottom:1px solid #263447;
        }
        .movie-modal .modal-title{
          font-size:1.5rem; /* tiêu đề to hơn */
          font-weight:700;
        }
        .movie-modal .modal-body{
          background:#1b222c;
        }
        .movie-modal .modal-body h5{
          font-size:1.25rem;
          font-weight:600;
        }
        .movie-modal .modal-footer{
          background:#020B1A;
          border-top:1px solid #263447;
        }
        .movie-modal .meta strong{
          color:#ffc107;
          font-size:1.1rem; /* label DESCRIPTION, YEAR... to hơn */
        }
        .movie-modal .btn-pill{
          border-radius: 999px;
          font-weight: 600;
          padding: 8px 16px;
          font-size:1rem; /* chữ nút to hơn */
        }
      `}</style>

      <Modal show={show} onHide={onHide} size="lg" centered className="movie-modal">
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row g-3">
            <div className="col-md-5">
              <img src={movie.poster} alt={movie.title} className="img-fluid rounded" />
            </div>
            <div className="col-md-7 meta">
              <h5 className="border-bottom pb-2">{movie.title}</h5>
              <p><strong>DESCRIPTION:</strong> {movie.description}</p>
              <p><strong>GENRE:</strong> <Badge bg="warning" text="dark">{movie.genre}</Badge></p>
              <p><strong>YEAR:</strong> {movie.year}</p>
              <p><strong>COUNTRY:</strong> {movie.country}</p>
              <p><strong>DURATION:</strong> {movie.duration} minutes</p>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className="btn-pill"
            variant={isFav ? "danger" : "warning"}
            onClick={() => onToggleFav(movie.id)}
          >
            {isFav ? "Remove from Favourites" : "Add to Favourites"}
          </Button>
          <Button className="btn-pill" variant="outline-light" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

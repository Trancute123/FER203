import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button, Badge } from "react-bootstrap";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useFav } from "../context/FavouritesContext";
import { useAuth } from "../context/AuthContext";

export default function ProductDetails() {
  const { id } = useParams();
  const p = products.find((x) => String(x.id) === id);

  const navigate = useNavigate();
  const location = useLocation();

  const { addToCart } = useCart();
  const { favourites, toggleFav } = useFav();
  const { user } = useAuth();

  if (!p) return <div className="container py-4">Not found</div>;

  const inFav = favourites.some((f) => f.id === p.id);

  const handleFav = () => {
    // Chưa đăng nhập → đưa tới /login, lưu lại đường dẫn hiện tại
    if (!user) {
      navigate("/login", {
        state: { from: location.pathname, intent: { type: "fav", productId: p.id } },
      });
      return;
    }
    // Đã đăng nhập → toggle thêm/xóa yêu thích
    toggleFav(p);
  };

  const handleAdd = () =>
    addToCart({ id: p.id, name: p.title, image: p.image, price: p.price });

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-md-6">
          <img src={p.image} alt={p.title} className="img-fluid rounded-4 shadow-sm" />
        </div>

        <div className="col-md-6">
          <h3 className="mb-2">{p.title}</h3>
          <Badge bg="success" className="mb-3">
            ${Number(p.price).toFixed(2)}
          </Badge>
          <p className="text-muted">{p.description}</p>

          <div className="d-flex gap-2 mt-3">
            <Button variant="success" onClick={handleAdd}>
              Add to Cart
            </Button>

            {inFav ? (
              <Button variant="outline-danger" onClick={() => navigate("/favourites")}>
                Browse My Favourites
              </Button>
            ) : (
              <Button variant="outline-secondary" onClick={handleFav}>
                Like
              </Button>
            )}

            <Button variant="outline-primary" onClick={() => navigate("/products")}>
              Back to List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

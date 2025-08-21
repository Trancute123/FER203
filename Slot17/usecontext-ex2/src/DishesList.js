import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import { FaCartPlus, FaDollarSign } from "react-icons/fa";
import { CartContext } from "./Cart/CartContext";

const DishesList = ({ dishes }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <>
      <section className="dish-sec container py-4">
        <h2 className="dish-sec__title mb-4">Danh sách món ăn</h2>

        <Row className="g-4">
          {dishes.map((dish) => (
            <Col key={dish.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="dish-card h-100 border-0 rounded-4">
                <div className="dish-card__img-wrap">
                  <Card.Img
                    variant="top"
                    src={dish.image}
                    alt={dish.name}
                    className="dish-card__img"
                  />
                  <div className="dish-card__price-chip">
                    <FaDollarSign className="me-1" />
                    {parseFloat(dish.price).toFixed(2)}
                  </div>
                </div>

                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold text-success mb-2">
                    {dish.name}
                  </Card.Title>

                  <Card.Text className="text-muted small flex-grow-1">
                    {dish.description}
                  </Card.Text>

                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <Badge bg="success" className="badge-soft">
                      ${parseFloat(dish.price).toFixed(2)}
                    </Badge>

                    <Button
                      variant="success"
                      className="btn-add"
                      onClick={() => addToCart(dish)}
                    >
                      <FaCartPlus className="me-1" />
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* ================== Styles (green + red theme) ================== */}
      <style>{`
        :root {
          --green: #2e7d32;
          --green-600: #1b5e20;
          --red: #c62828;
          --card-shadow: 0 10px 22px rgba(0,0,0,.12);
          --card-shadow-hover: 0 16px 36px rgba(0,0,0,.18);
        }

        .dish-sec__title{
          font-weight: 800;
          color: var(--green);
          letter-spacing: .2px;
        }

        .dish-card{
          background: #fff;
          box-shadow: var(--card-shadow);
          transition: transform .2s ease, box-shadow .2s ease;
          overflow: hidden;
        }
        .dish-card:hover{
          transform: translateY(-4px);
          box-shadow: var(--card-shadow-hover);
        }

        .dish-card__img-wrap{
          position: relative;
          overflow: hidden;
          max-height: 200px;
        }
        .dish-card__img{
          height: 200px;
          width: 100%;
          object-fit: cover;
          display: block;
          transition: transform .5s ease;
        }
        .dish-card:hover .dish-card__img{
          transform: scale(1.05);
        }

        /* Price chip nổi góc ảnh */
        .dish-card__price-chip{
          position: absolute;
          right: 12px;
          bottom: 12px;
          background: linear-gradient(135deg, var(--red), #ff5252);
          color: #fff;
          font-weight: 700;
          padding: 6px 10px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          box-shadow: 0 6px 16px rgba(198,40,40,.35);
          font-size: .9rem;
        }

        .badge-soft{
          background: rgba(46,125,50,.1) !important;
          color: var(--green) !important;
          border: 1px solid rgba(46,125,50,.2);
          padding: 6px 10px;
          border-radius: 999px;
          font-weight: 700;
        }

        .btn-add{
          background: var(--green);
          border: none;
          font-weight: 700;
          padding: 8px 14px;
          border-radius: 10px;
        }
        .btn-add:hover{
          background: var(--green-600);
        }

        /* Nhẹ nhàng bo góc cho ảnh */
        .dish-card .card-img-top{
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
        }
      `}</style>
    </>
  );
};

DishesList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DishesList;

import React, { useEffect, useState } from 'react'; 
import { Container, Row, Col, Form, InputGroup, Button, Card } from 'react-bootstrap';
import { FaSearch, FaTimesCircle, FaFilter, FaSort } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { useProductFilters } from '../hooks/useProductFilters';
import api from '../services/api';
import HeroCarousel from '../components/HeroCarousel';   // 👈 thêm import

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/products');
      const normalized = (data || []).map(p => ({
        id: p.id,
        name: p.title || p.name,
        image: p.image?.startsWith("/") ? p.image : `/${p.image}`, // chuẩn hoá ảnh
        price: p.price,
        description: p.description,
        category: p.category
      }));
      setProducts(normalized);
    })();
  }, []);

  const filteredProducts = useProductFilters(products, searchQuery, sortBy, filterBy);

  return (
    <>
      {/* HeroCarousel hiển thị banner sản phẩm */}
      <HeroCarousel
        items={products}
        take={4}
        itemKeys={{ src: "image", caption: "name", sub: "description" }}
        height={400}
      />

      <Container className="py-4">
        <h1 className="mb-4">Products</h1>

        <Card className="mb-4">
          <Card.Body>
            <Row className="g-3">
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text><FaSearch /></InputGroup.Text>
                  <Form.Control
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <Button variant="outline-secondary" onClick={() => setSearchQuery('')}>
                      <FaTimesCircle />
                    </Button>
                  )}
                </InputGroup>
              </Col>
              <Col md={3}>
                <InputGroup>
                  <InputGroup.Text><FaFilter /></InputGroup.Text>
                  <Form.Select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                    <option value="all">All Categories</option>
                    <option value="iphone">iPhone</option>
                    <option value="samsung">Samsung</option>
                    <option value="google">Google</option>
                    <option value="oppo">Oppo</option>
                  </Form.Select>
                </InputGroup>
              </Col>
              <Col md={3}>
                <InputGroup>
                  <InputGroup.Text><FaSort /></InputGroup.Text>
                  <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="name-asc">Name A→Z</option>
                    <option value="name-desc">Name Z→A</option>
                    <option value="price-asc">Price ↑</option>
                    <option value="price-desc">Price ↓</option>
                  </Form.Select>
                </InputGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Row className="g-4">
          {filteredProducts.map(p => (
            <Col key={p.id} xs={12} sm={6} md={4}>
              <ProductCard product={p} />
            </Col>
          ))}
        </Row>

        {filteredProducts.length === 0 && (
          <Row className="mt-4">
            <Col>
              <Card className="text-center">
                <Card.Body>No mobile found.</Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Badge, ButtonGroup, Card } from 'react-bootstrap';
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import { formatPrice } from '../utils/format';

const ProductDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios.get('/db.json')
			.then(res => {
				const found = res.data.products.find(p => String(p.id) === String(id));
				setProduct(found);
				setLoading(false);
			})
			.catch(() => {
				setError('Không thể tải dữ liệu sản phẩm');
				setLoading(false);
			});
	}, [id]);

	if (loading) return <div className="text-center py-5">Đang tải...</div>;
	if (error || !product) return <div className="text-center py-5">Sản phẩm không tồn tại</div>;

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-12 mt-3 mb-2">
					<Button
						variant="outline-primary"
						size="md"
						className="d-inline-flex align-items-center"
						onClick={() => navigate('/products')}
						style={{ position: 'absolute', left: 24, top: 70, zIndex: 1100 }}
					>
						<span className="me-2">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
								<path fillRule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H3.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L3.707 7.5H14.5A.5.5 0 0 1 15 8z"/>
							</svg>
						</span>
						Back to List
					</Button>
				</div>
			</div>
			<div className="row align-items-center" style={{ minHeight: '70vh' }}>
				<div className="col-md-6 text-center">
					<img
						src={`/${product.image}`}
						alt={product.name}
						style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
					/>
				</div>
				<div className="col-md-6">
					<h2>{product.name}</h2>
					<p className="text-muted">{product.description}</p>
					<Badge bg="primary" className="fs-5 mb-3">{formatPrice(product.price)}</Badge>
					<div className="mt-4">
						<ButtonGroup className="w-100">
							<Button variant="success" size="lg" className="flex-fill">
								<FaCartPlus className="me-2" />
								Add to Cart
							</Button>
							<Button variant="outline-danger" size="lg" className="flex-fill">
								<FaHeart className="me-2" />
								Favourite
							</Button>
						</ButtonGroup>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;

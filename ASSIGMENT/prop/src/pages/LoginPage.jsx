import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Button, Form, Alert, Card } from 'react-bootstrap';
import { useToast } from '../contexts/ToastContext';

const LoginPage = () => {
	const { login, loading } = useAuth();
	const navigate = useNavigate();
	const toast = useToast();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');
	const [fieldErrors, setFieldErrors] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		let errors = {};
		if (!email) errors.email = 'Vui lòng nhập email';
		if (!password) errors.password = 'Vui lòng nhập mật khẩu';
		setFieldErrors(errors);
		if (Object.keys(errors).length > 0) return;

		const result = await login(email, password);
		if (result.success) {
			setError('');
			toast('Đăng nhập thành công!', { type: 'success' });
			navigate('/products');
		} else {
			setError(result.message);
		}
	};

	return (
		<div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
			<Card style={{ minWidth: 350, maxWidth: 400 }} className="shadow p-4">
				<h3 className="mb-4 text-center">Đăng nhập</h3>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formEmail">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							isInvalid={!!fieldErrors.email}
							placeholder="Nhập email"
						/>
						{fieldErrors.email && <Form.Control.Feedback type="invalid">{fieldErrors.email}</Form.Control.Feedback>}
					</Form.Group>
					<Form.Group className="mb-3" controlId="formPassword">
						<Form.Label>Mật khẩu</Form.Label>
						<div style={{ position: 'relative' }}>
							<Form.Control
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={e => setPassword(e.target.value)}
								isInvalid={!!fieldErrors.password}
								placeholder="Nhập mật khẩu"
							/>
							<span
								style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#888' }}
								onClick={() => setShowPassword(s => !s)}
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</span>
						</div>
						{fieldErrors.password && <Form.Control.Feedback type="invalid">{fieldErrors.password}</Form.Control.Feedback>}
					</Form.Group>
					<Button type="submit" variant="primary" className="w-100 mb-2" disabled={loading}>
						Đăng nhập
					</Button>
					<Button
						type="button"
						variant="outline-secondary"
						className="w-100"
						onClick={() => navigate('/register')}
					>
						Đăng ký
					</Button>
					{error && <Alert variant="danger" className="mt-3">{error}</Alert>}
				</Form>
			</Card>
		</div>
	);
};

export default LoginPage;

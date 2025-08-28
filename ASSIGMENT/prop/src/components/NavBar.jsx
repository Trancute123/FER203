import React from 'react';
import { FaHeart, FaShoppingCart, FaUser, FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './NavBar.css';

const NavBar = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	return (
		<nav className="navbar">
			<div className="navbar__left">
				<span className="navbar__brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/products')}>Name</span>
			</div>
			<div className="navbar__right">
				{user && (
					<span style={{ marginRight: 16, fontWeight: 500, color: '#000000ff' }}>
						Chào mừng, {user.name ? user.name : user.email}
					</span>
				)}
				<FaHeart className="navbar__icon" title="Favourites" />
				<FaShoppingCart className="navbar__icon" title="Cart" />
				<FaUser
					className="navbar__icon"
					title="Login"
					style={{ cursor: 'pointer' }}
					onClick={() => navigate('/login')}
				/>
				<FaUserPlus
					className="navbar__icon"
					title="Register"
					style={{ cursor: 'pointer' }}
					onClick={() => navigate('/register')}
				/>
			</div>
		</nav>
	);
};

export default NavBar;

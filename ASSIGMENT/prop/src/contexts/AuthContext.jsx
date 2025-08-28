import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	const login = async (email, password) => {
		setLoading(true);
		try {
			const res = await axios.get('http://localhost:3001/accounts');
			const found = res.data.find(
				acc => acc.email === email && acc.password === password && acc.isActive
			);
			if (found) {
				setUser(found);
				setLoading(false);
				return { success: true };
			} else {
				setLoading(false);
				return { success: false, message: 'Email hoặc mật khẩu không đúng hoặc tài khoản chưa kích hoạt.' };
			}
		} catch (err) {
			setLoading(false);
			console.error(err);
			return { success: false, message: 'Lỗi hệ thống, vui lòng thử lại.' };
		}
	};

	const value = { user, login, loading };
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

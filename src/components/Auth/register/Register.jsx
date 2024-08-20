import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            if (res.status === 200) {
                navigate('/login');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div onSubmit={handleSubmit} className="flex-col bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="mb-3 p-2 w-full border-black border-2 rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mb-3 p-2 w-full border-2 rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mb-3 p-2 w-full border-2 rounded"
                />

            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Register
            </button>
        </div>
    );
}

export default Register;
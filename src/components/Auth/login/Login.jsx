// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import FilledButton from "../../Buttons/FilledButton";
//
// const Login = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const navigate = useNavigate();
//
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:5000/api/auth/login', formData);
//             if (res.status === 200) {
//                 localStorage.setItem('token', res.data.token);
//                 navigate('/quiz');
//             }
//         } catch (err) {
//             console.error(err);
//         }
//     };
//
//     return (
//         <div className="">
//             <form onSubmit={handleSubmit}
//                   className=""
//             >
//                 <h2 className="">Login</h2>
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className=""
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className=""
//                 />
//                 <button type="submit" className="">
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// }
//
// export default Login;

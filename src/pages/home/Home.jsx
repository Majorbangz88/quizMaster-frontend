import React, {useEffect, useState} from 'react';
import {json, useNavigate} from 'react-router-dom';
import FilledButton from "../../components/Buttons/FilledButton";
import styles from "./index.module.css";
import axios from "axios";

function Home() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [regFormData, setRegFormData] = useState({ username: '', email: '', password: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegChange = (e) => {
        const { name, value } = e.target;
        setRegFormData({ ...regFormData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            console.log(res);
            if (res.status === 200) {

                const username = localStorage.getItem('username');
                const userDetail = {
                    username: username,
                    token: res.data.token,
                }
                localStorage.setItem('detail', JSON.stringify(userDetail));
                console.log(userDetail);

                setSuccessMessage('Login Successful');
                navigate('/quiz');
            } else {
                console.log(res)
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleRegSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', regFormData);
            if (res.status === 200) {
                setSuccessMessage('Registration Successful');
                setIsRegistering(false);
                navigate('/login');
                localStorage.setItem('username', res.data.username);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const toggleForm = () => {
        setIsRegistering(!isRegistering);
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [successMessage]);


    return (
        <div className={styles.homeMainContainer}>
            {successMessage && (
                <div className={styles.successMessage}>
                    {successMessage}
                </div>
            )}
            <div className={styles.welcomeDiv}>
                <div className={styles.welcomeMsgDiv}>
                    <h1 className={styles.welcomeText}>WELCOME <br/>TO QUIZ MASTER</h1>
                    <p className={styles.fullMessage}>
                        YOUR ULTIMATE TRIVIA
                        <br/>CHALLENGE! <br/> <br/>

                        Get ready to embark on an exciting journey of<br/>
                        knowledge, fun, and competition! Whether you're <br/>
                        a trivia buff, a curious learner, or just looking <br/>
                        for a fun way to pass the time, QuizMaster has <br/>
                        something for everyone. <br/> <br/>

                        So, what are you waiting for? <br/>
                        Dive in, challenge yourself, <br/>
                        and most importantly, have fun! <br/>

                        <br/>
                        <FilledButton
                            text={'Let the games begin!'}
                            background={'rgb(82, 125, 198)'}
                            color={'white'}
                            padding={'10px'}
                            cursor={'pointer'}
                            border={'none'}
                        />
                    </p>
                </div>
            </div>
            <div className={styles.actionDiv}>
                {isRegistering ? (
                    <form onSubmit={handleRegSubmit} className={styles.loginForm}>
                        <h2 className={styles.formName}>SIGN UP</h2>
                        <label className={styles.labels}>Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={regFormData.username}
                            onChange={handleRegChange}
                            className={styles.inputFields}
                        />
                        <label className={styles.labels}>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={regFormData.email}
                            onChange={handleRegChange}
                            className={styles.inputFields}
                        />
                        <label className={styles.labels}>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={regFormData.password}
                            onChange={handleRegChange}
                            className={styles.inputFields}
                        />
                        <div className={styles.buttons}>
                            <FilledButton
                                text={'SIGN UP'}
                                background={'rgb(82, 125, 198)'}
                                padding={'12px 42px'}
                                color={'white'}
                                fontWeight={'bolder'}
                                cursor={'pointer'}
                                border={'none'}
                                fontSize={'15px'}
                            />
                            <p>OR</p>
                            <FilledButton
                                text={'LOG IN'}
                                background={'rgb(82, 125, 198)'}
                                padding={'12px 45px'}
                                color={'white'}
                                fontWeight={'bolder'}
                                cursor={'pointer'}
                                border={'none'}
                                fontSize={'15px'}
                                onclick={toggleForm}
                            />
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        <h2 className={styles.formName}>LOG IN</h2>
                        <label className={styles.labels}>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className={styles.inputFields}
                        />
                        <label className={styles.labels}>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={styles.inputFields}
                        />
                        <div className={styles.buttons}>
                            <FilledButton
                                text={'LOG IN'}
                                background={'rgb(82, 125, 198)'}
                                padding={'12px 45px'}
                                color={'white'}
                                fontWeight={'bold'}
                                cursor={'pointer'}
                                border={'none'}
                            />
                            <p>OR</p>
                            <FilledButton
                                text={'SIGN UP'}
                                background={'rgb(82, 125, 198)'}
                                padding={'12px 42px'}
                                color={'white'}
                                fontWeight={'bold'}
                                cursor={'pointer'}
                                border={'none'}
                                onclick={toggleForm}
                            />
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Home;

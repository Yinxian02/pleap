import { useRef, useState, useEffect } from 'react';
import {useAuthContext} from '../hooks/useAuthContext';
import { Link, useNavigate, useLocation} from 'react-router-dom';

import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuthContext();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setError('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    mode: 'cors',
                    withCredentials: true,

                }
            );
            console.log(JSON.stringify(response));
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            console.log(roles)
            setAuth({ email, password, roles, accessToken });
            setEmail('');
            setPassword('');

            navigate(from, { replace: true });
        } catch (err) {
            console.error(err)
            if (!err?.response) {
                setError('No Server Response');
            } else if (err.response?.status === 400) {
                setError('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setError('Unauthorized');
            } else {
                setError('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (

        <section>
            <p ref={errRef} className={error ? "errmsg" : "offscreen"} aria-live="assertive">{error}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Email:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Register to be a builder<br />
                <span className="line">
                    <Link to="/signup">Sign Up</Link>
                </span>
            </p>
        </section>

    )
}

export default Login
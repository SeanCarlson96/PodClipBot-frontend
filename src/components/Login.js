import { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Store the access token and use it for authenticated requests
                // console.log('Access Token:', data.access_token);
                localStorage.setItem('access_token', data.access_token);
                setUser(data.user);
                setMessage('Login successful');
            } else {
                setMessage('Invalid email or password.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex flex-col gap-4 w-96 mx-auto items-center">

            <h1>Sign In</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center w-full">
                
                <input
                    className="form-control"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    className="form-control"
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className="btn btn-primary w-36" type="submit">Sign In</button>

            </form>
            
            {message && (<p className="text-red-500">{message}</p>)}

            <a href="/registration">Register</a>

        </div>
    );
};

export default Login;

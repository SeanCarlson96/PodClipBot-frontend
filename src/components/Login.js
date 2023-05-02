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
        <div className="container mt-5">
            <h1 className="text-center my-4 text-3xl font-bold">Sign In</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
                <div className="mb-4">
                    {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label> */}
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label> */}
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="text-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
                {message && (
                    <div className="mt-4 text-center text-red-500">
                        <p>{message}</p>
                    </div>
                )}
            </form>
            <p className="text-center mt-2"><a href="/registration">Register</a></p>

        </div>
    );
};

export default Login;

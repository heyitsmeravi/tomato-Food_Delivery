
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Login.css";

const Login = ({ setToken, url }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${url}/api/admin/login`,
                { email, password }
            );

            if (response.data.success) {
                setToken(response.data.token);
                toast.success("Login successful");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login failed"
            );
        }
    };

    return (
        <div className="login">
            
            <form onSubmit={handleLogin} className="login-container">
                <h2>Admin Login</h2>

                <input
                    type="email"
                    placeholder="Admin email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

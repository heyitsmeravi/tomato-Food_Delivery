
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
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
            <div className="login-showcase">
                <img src={assets.logo} alt="Tomato" className="login-logo" />
                <div>
                    <p className="login-kicker">Tomato partner workspace</p>
                    <h1>Make every order<br /><span>feel like home.</span></h1>
                    <p className="login-description">
                        Manage your menu, keep orders moving, and give your customers a better food experience.
                    </p>
                </div>
                <div className="login-highlights">
                    <span><b>01</b> Menu management</span>
                    <span><b>02</b> Order operations</span>
                </div>
            </div>
            <form onSubmit={handleLogin} className="login-container">
                <div className="login-heading">
                    <p className="login-kicker">Welcome back</p>
                    <h2>Sign in to Admin</h2>
                    <p>Use your administrator account to continue.</p>
                </div>

                <label>
                    Email address
                    <input
                        type="email"
                        placeholder="you@tomato.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Password
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                <button type="submit">Enter dashboard <span>→</span></button>
                <p className="login-footer">Private workspace · Authorized staff only</p>
            </form>
        </div>
    );
};

export default Login;

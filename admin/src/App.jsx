
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Order from "./pages/Orders/Order";
import Login from "./pages/Login/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    const url = import.meta.env.VITE_API_URL;

    const [token, setToken] = useState(
        localStorage.getItem("adminToken") || ""
    );

    const updateToken = (newToken) => {
        localStorage.setItem("adminToken", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("adminToken");
        setToken("");
    };

    return (
        <div>
            <ToastContainer />

            {!token ? (
                <Login setToken={updateToken} url={url} />
            ) : (
                <>
                    <Navbar logout={logout} />
                    <hr />

                    <div className="app-content">
                        <Sidebar />

                        <Routes>
                            <Route path="/" element={<Navigate to="/add" replace />} />
                            <Route path="/add" element={<Add url={url} />} />
                            <Route path="/list" element={<List url={url} />} />
                            <Route path="/orders" element={<Order url={url} />} />
                            <Route path="*" element={<Navigate to="/add" replace />} />
                        </Routes>
                    </div>
                </>
            )}
        </div>
    );
};

export default App;

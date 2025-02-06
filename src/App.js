import logo from './logo.svg';
import './App.scss';
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/DTR/Dashboard";
import { useAuth } from "./components/AuthContext";

function App() {
  const { user } = useAuth();
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot_pass" element={<ForgotPassword />} />
        <Route path="/home" element={<Dashboard user={user} />} />
      </Routes>
    </div>
  );
}

export default App;

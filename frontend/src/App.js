import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import { useState } from "react";
import RefreshHandler from "./refreshHandler";

function App() {
  const [ isAuthinticated, setIsAuthinticated ] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isAuthinticated ? element : <Navigate to="/login" />;
  };
  return (
    <div className="App">
      <RefreshHandler setIsAuthinticated={setIsAuthinticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </div>
  );
}

export default App;

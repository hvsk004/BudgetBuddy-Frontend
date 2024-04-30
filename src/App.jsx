import { Routes, Route, BrowserRouter } from "react-router-dom";
// import "./App.css";
import Signup from "./components/Signup";
import { LoginForm } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import Homepage from "./components/Homepage";
import Analytics from "./components/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

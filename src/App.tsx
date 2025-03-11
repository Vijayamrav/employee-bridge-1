

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/SignUpPage";
import Login from "./Components/LoginPage"; 
import Dashboard from './Components/DashBoard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;


import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Contact from "./pages/contact/Contact";
import AdminAuth from "./pages/Admin/AdminAuth";
import PatientsList from "./pages/CRUD/PatientList";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importa BrowserRouter
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/admin" element={<AdminAuth />} />
        <Route path="/patients" element={<PatientsList />} />
      </Routes>
    </Router>
  );
}

export default App;

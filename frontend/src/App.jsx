import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Contact from "./pages/contact/Contact";
import AdminAuth from "./pages/Admin/AdminAuth";
import PatientsList from "./pages/CRUD/PatientList";
import { CompleteRegister } from "./components/CompleteRegister/CompleteRegister";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importa BrowserRouter
import "./App.css";
import AppointmentsPage from "./pages/AppointmentsPage/AppointmentsPage";
import { AuthProvider } from "./context/AuthPatientContext";
import DoctorsPage from "./pages/DoctorPage/DoctorsPage";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Ruta protegida para CompleteRegister */}
          <Route
            path="/complete-register/:id"
            element={
              <ProtectedRoute>
                <CompleteRegister />
              </ProtectedRoute>
            }
          />

          {/* Ruta protegida para AppointmentsPage */}
          <Route
            path="/appointment/:id"
            element={
              <ProtectedRoute>
                <AppointmentsPage />
              </ProtectedRoute>
            }
          />

          {/* Rutas públicas (sin autenticación requerida) */}
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/create-doctor/"
            element={
              <ProtectedRoute>
                <DoctorsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminAuth />} />
          <Route path="/patients" element={<PatientsList />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

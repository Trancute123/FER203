import "./App.css";
import AppRoutes from "./routes/AppRoutes.jsx";
import NavBar from "./components/Navbar.jsx";   

export default function App() {
  return (
    <>
      <NavBar />
      <div className="container py-4">
        <AppRoutes />
      </div>
    
    </>
  );
}

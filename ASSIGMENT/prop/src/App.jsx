import './App.css';
import AppRoutes from './routes/AppRoutes.jsx';
import NavBar from './components/NavBar.jsx';

function App() {
  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
        <NavBar />
      </div>
      <div className='container py-4' style={{ marginTop: '70px' }}>
        <AppRoutes />
      </div>
    </>
  );
}

export default App;


import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Dashboard from './Dashboard/Dashboard';
import LandingPage from './LandingPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;

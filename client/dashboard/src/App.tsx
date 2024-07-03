
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Dashboard from './Dashboard/Dashboard';
import LandingPage from './LandingPage';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  );
}


export default App;

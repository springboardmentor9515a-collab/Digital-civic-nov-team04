import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRouter from './router/AppRouter';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* AuthProvider makes user state available to the whole app */}
      <AuthProvider>
        {/* AppRouter handles switching between Login, Dashboard, Petitions, etc. */}
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from 'react-router';

import { AuthProvider } from './context/AuthContext';

import Nav from './components/Nav';
import Home from './pages/Home';
import Users from './pages/Users';
import User from './pages/User';
import Events from './pages/Events';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

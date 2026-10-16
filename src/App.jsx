import { BrowserRouter, Routes, Route } from 'react-router';

import { AuthProvider } from './context/AuthContext';

import Nav from './components/Nav';
import Home from './pages/Home';
import Users from './pages/Users';
import User from './pages/User';
import Events from './pages/Events';
import Event from './pages/Event';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<Event />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import { useState, use } from 'react';
import { useNavigate } from 'react-router';
import { Auth } from '../context/AuthContext';

const Login = () => {
  const { setLocalUser, setToken } = use(Auth);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch(`http://localhost:3001/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setToken(localStorage.getItem('token'));
      setLocalUser(JSON.parse(localStorage.getItem('user')));

      setEmail('');
      setPassword('');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-2xl border-2 mx-auto"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary max-w-2xs mx-auto" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

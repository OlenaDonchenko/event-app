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
  <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
    <div className="card bg-base-100 w-full max-w-md shadow-xl border border-base-300">
      <div className="card-body gap-5">
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-base-content/60 mt-2">
            Login to your Event Up account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <label className="form-control w-full">
            <span className="label-text font-medium mb-2">
              Email
            </span>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full focus:input-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text font-medium mb-2">
              Password
            </span>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full focus:input-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button
            className="btn btn-primary w-full mt-2"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
);

};

export default Login;

import { useState } from 'react';
import { useNavigate } from 'react-router';

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3001/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email, //email:email
        password, //password:password
      }),
    });

    const data = await res.json();
    console.log(data);
    setEmail('');
    setPassword('');
    navigate(-1);
    // navigate('/users');
  };


return (
  <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
    <div className="card bg-base-100 w-full max-w-md shadow-xl border border-base-300">
      <div className="card-body gap-5">
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-base-content/60 mt-2">
            Join Event Up and discover events
          </p>
        </div>

        <form
          onSubmit={(e) => handleSubmit(e)}
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
            Sign up
          </button>
        </form>
      </div>
    </div>
  </div>
);

};

export default SignUp;

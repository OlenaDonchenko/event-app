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
    <div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col justify-center border-2 max-w-[20rem] mx-auto"
      >
        <input
          placeholder="your name"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          placeholder="your password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SignUp;

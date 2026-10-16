import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

const User = () => {
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:3001/api/users/${id}`);
      const data = await res.json();
      console.log(data);
      setUser(data);
    };
    fetchUsers();
  }, []);

  const deleteAccount = async () => {
    try {
      if (!localStorage.getItem('token')) {
        console.log(`Sign up first`);
        return;
      }
      await fetch(`http://localhost:3001/api/users/${id}`, {
        method: 'DELETE',
        headers: { authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card card-border bg-base-100 w-96">
      <div className="card-body">
        {user?.name ? (
          <h2 className="card-title">User Name: {user?.name} </h2>
        ) : (
          <h2 className="card-title">
            User Name: <span className="text-error">missing</span>
          </h2>
        )}
        <p>{user?.email}</p>
      </div>
      <button className="btn btn-error w-50" onClick={deleteAccount}>
        Delete Account
      </button>
    </div>
  );
};

export default User;

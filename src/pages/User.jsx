import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

const User = () => {
  const { id } = useParams();

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
    </div>
  );
};

export default User;

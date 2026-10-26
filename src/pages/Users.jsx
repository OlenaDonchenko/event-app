import { Link } from 'react-router';
import { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`);
      const data = await res.json();
      console.log(data);
      setUsers(data.results);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      {users?.map((user) => {
        return (
          <div className="card card-border bg-base-100 w-96">
            <div className="card-body">
              {user.name ? (
                <h2 className="card-title">User Name: {user?.name} </h2>
              ) : (
                <h2 className="card-title">
                  User Name: <span className="text-error">missing</span>
                </h2>
              )}

              <div className="card-actions justify-end">
                <Link to={`/users/${user.id}`} className="btn btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Users;

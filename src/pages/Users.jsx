import { useState, useEffect, use } from 'react';
import { Auth } from '../context/AuthContext';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:3001/api/users`);
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
          <div key={user.id}>
            user Email: {user.email}
            <br />
            user name: {user?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Users;

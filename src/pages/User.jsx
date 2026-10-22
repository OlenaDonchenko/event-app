import { useState, useEffect, use } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Auth } from '../context/AuthContext';

const User = () => {
  const { token } = use(Auth);
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(undefined);
  const [showForm, setShowForm] = useState(false);

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

  const updateUser = async (formData) => {
    try {
      if (!token) {
        console.log(`Login first`);
        return;
      }
      const name = formData.get('name');
      const email = formData.get('email');

      const updatedUser = {
        name: name || user.name,
        email: email || user.email,
      };
      const res = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });
      if (!res.ok) {
        throw new Error('Failed to update user');
      }

      const data = await res.json();
      console.log(data);
      setUser(data);
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

      {!showForm && (
        <button
          className="btn btn-info w-50 mt-3"
          onClick={() => setShowForm(true)}
        >
          Edit User
        </button>
      )}

      {showForm && (
        <div className="relative border border-base-300 rounded-xl bg-base-100 shadow-md flex flex-col gap-4 max-w-md mt-4 p-6">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setShowForm(false)}
            aria-label="Close form"
          >
            ×
          </button>

          <h2 className="text-xl font-bold text-center">Edit User</h2>

          <form action={updateUser} className="flex flex-col gap-3">
            <label className="form-control w-full">
              <span className="label-text mb-1">Name</span>
              <input
                className="input input-bordered w-full"
                name="name"
                type="text"
                placeholder="Name"
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-1">Email</span>
              <input
                className="input input-bordered w-full"
                name="email"
                type="email"
                placeholder="Email"
              />
            </label>

            <button className="btn btn-info w-full mt-2" type="submit">
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default User;

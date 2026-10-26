import { useState, useEffect, use } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Auth } from '../context/AuthContext';

const Event = () => {
  const { token } = use(Auth);
  const { id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [event, setEvent] = useState(undefined);

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events/${id}`);
      const data = await response.json();
      console.log(data);
      setEvent(data);
    };

    fetchEvent();
  }, [id]);

  const deleteEvent = async () => {
    try {
      if (!token) {
        console.log('Login first');
        return;
      }
      await fetch(`${import.meta.env.VITE_API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: { authorization: `Bearer ${token}` },
      });
      navigate(`/events`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateEvent = async (formData) => {
    try {
      if (!token) {
        console.log('Login first');
        return;
      }

      const title = formData.get('title');
      const description = formData.get('description');
      const location = formData.get('location');
      const localUser = JSON.parse(localStorage.getItem('user'));
      console.log(event.title);
      const updatedEvent = {
        title: title || event.title,
        description: description || event.description,
        location: location || event.location,
        date: new Date(),
        latitude: 40.785091,
        longitude: -73.968285,
        organizerId: localUser.id,
      };
      console.log(updatedEvent);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedEvent),
      });

      const data = await res.json();
      console.log(data);
      setEvent(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card card-border bg-base-100">
      <div className="card-body">
        <h2 className="card-title">{event?.title}</h2>
        <p>{event?.description}</p>
        <p>{event?.date}</p>
        <p>{event?.location}</p>
        <button className="btn btn-error w-50" onClick={deleteEvent}>
          Delete Event
        </button>
        {!showForm && (
          <button
            className="btn btn-info w-50"
            onClick={() => setShowForm(!showForm)}
          >
            Edit
          </button>
        )}
      </div>
      {showForm && (
        <div>
          <form
            className=" border-1 flex flex-col gap-3 mx-auto p-5"
            action={updateEvent}
          >
            <span
              className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer  bg-black text-white"
              onClick={() => setShowForm(!showForm)}
            >
              X
            </span>
            <input
              className="input input-primary mx-auto"
              name="title"
              type="text"
              placeholder="Title"
            />
            <input
              className="input input-primary mx-auto"
              name="description"
              type="text"
              placeholder="Description"
            />
            <input
              className="input input-primary mx-auto"
              name="location"
              type="text"
              placeholder="location"
            />
            <button className="btn btn-info max-w-[50%] mx-auto">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Event;

import { Link } from 'react-router';

import { useState, useEffect } from 'react';
const Events = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const response = await fetch(`http://localhost:3001/api/events`);
    const data = await response.json();
    setEvents(data.results);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const submitAction = async (formData) => {
    try {
      if (!localStorage.getItem('token')) {
        return 'Login in first';
      }
      const token = localStorage.getItem('token');
      const localUser = JSON.parse(localStorage.getItem('user'));
      const title = formData.get('title');
      const description = formData.get('description');
      const location = formData.get('location');
      const myEvent = {
        title,
        description,
        location,
        date: new Date(),
        latitude: 40.785091,
        longitude: -73.968285,
        organizerId: localUser.id,
      };
      console.log(myEvent);
      const res = await fetch(`http://localhost:3001/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(myEvent),
      });
      const data = await res.json();
      console.log(data);
      fetchEvents();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid gap-4">
      <div>
        <form
          className="flex flex-col max-w-[50%] mx-auto p-5"
          action={submitAction}
        >
          <input name="title" type="text" placeholder="Title" />
          <input name="description" type="text" placeholder="Description" />
          <input name="location" type="text" placeholder="location" />
          <button>Submit</button>
        </form>
      </div>
      {events.map((event) => (
        <div key={event.id} className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{event.title}</h2>
            <div className="card-actions justify-end">
              <Link to={`/events/${event.id}`} className="btn btn-primary">
                Read more
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Events;

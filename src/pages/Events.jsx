import { Link } from 'react-router';

import { useState, useEffect } from 'react';
const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(`http://localhost:3001/api/events`);
      const data = await response.json();
      console.log(data);
      setEvents(data.results);
    };

    fetchEvents();
  }, []);

  const submitAction = async (formData) => {
    const title = formData.get('title');
    const description = formData.get('description');
    const location = formData.get('location');
    const myEvent = { title, description, location, date: new Date() };
    console.log(myEvent);
  };

  // {
  //     title: 'Summer Festival',
  //     description: 'A fun summer festival with music and food',
  //     date: new Date(),
  //     location: 'Central Park',
  //     latitude: 40.785091,
  //     longitude: -73.968285,
  //     organizerId: 1,
  //   },

  return (
    <div className="grid gap-4">
      <div>
        <form action={submitAction}>
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

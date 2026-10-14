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

  return (
    
  <div className="grid gap-4">
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

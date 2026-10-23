import { useState, useEffect, use } from 'react';
import { Link } from 'react-router';
import { Auth } from '../context/AuthContext';

const Events = () => {
  const { token, localUser } = use(Auth);
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
      if (!token) {
        return 'Login in first';
      }
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
 
      <div className="flex justify-center px-4 py-8">
        <form
          className="flex flex-col gap-4 w-full max-w-xl bg-base-100 p-6 sm:p-8 rounded-2xl border border-base-300 shadow-sm"
          action={submitAction}
        >
          <div className="mb-2">
            <h2 className="text-2xl font-bold">Create an event</h2>
            <p className="text-base-content/60 mt-1">
              Share something special with others.
            </p>
          </div>

          <label className="form-control w-full">
            <span className="label-text font-medium mb-2">
              Event title
            </span>
            <input
              name="title"
              type="text"
              placeholder="Enter event title"
              className="input input-bordered w-full focus:input-primary"
              required
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text font-medium mb-2">
              Description
            </span>
            <textarea
              name="description"
              placeholder="Tell us about your event"
              className="textarea textarea-bordered w-full h-10 min-h-0 focus:textarea-primary"
              required
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text font-medium mb-2">
              Location
            </span>
            <input
              name="location"
              type="text"
              placeholder="Where will it take place?"
              className="input input-bordered w-full focus:input-primary"
              required
            />
          </label>

          <button type="submit" className="btn btn-primary w-full mt-2">
            Create event
          </button>
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

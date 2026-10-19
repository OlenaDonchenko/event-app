import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

const Event = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [event, setEvent] = useState(undefined);

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(`http://localhost:3001/api/events/${id}`);
      const data = await response.json();
      console.log(data);
      setEvent(data);
    };

    fetchEvent();
  }, [id]);

  const deleteEvent = async () => {
    try {
      if (!token) {
        console.log('Sign up first');
        return;
      }
      await fetch(`http://localhost:3001/api/events/${id}`, {
        method: 'DELETE',
        headers: { authorization: `Bearer ${token}` },
      });
      navigate(`/events`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card card-border bg-base-100 w-96">
      <div className="card-body">
        <h2 className="card-title">{event?.title}</h2>
        <p>{event?.description}</p>
        <p>{event?.date}</p>
        <p>{event?.location}</p>
        <button className="btn btn-error w-50" onClick={deleteEvent}>
          Delete Event
        </button>
      </div>
    </div>
  );
};

export default Event;

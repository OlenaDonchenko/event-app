import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

const Event = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(undefined);
  
  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(`http://localhost:3001/api/events/${id}`);
      const data = await response.json();
      console.log(data);
      setEvent(data);
    }

    fetchEvent();
  }, [id]);

  return (
    <div className="card card-border bg-base-100 w-96">
        <div className="card-body">
            <h2 className="card-title">{event?.title}</h2>
            <p>{event?.description}</p>
            <p>{event?.date}</p>
            <p>{event?.location}</p>
        </div>
    </div>
  );
};

export default Event;
    
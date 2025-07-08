import { useEffect, useState } from 'react';
import "../../styles/events.css";  // Regular CSS import
import { eventsData } from '../../data/events';

const Events = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        setEvents(eventsData);
    }, []);

    return (
        <div className="container">
            {/* Hero Section */}
            <section className="heroContainer">
                <div className="heroContent">
                    <h1 className="heroTitle">Events at Geberew Farms</h1>
                    <p className="heroSubtitle">
                        Engage with nature and your community through our exciting events. 
                        From workshops to tours, there's something for everyone!
                    </p>
                </div>
            </section>

            {/* Events Section */}
            <main>
                <section className="eventsList">
                    {events.map(event => (
                        <div key={event.id} className="eventCard">
                            <img 
                                src={event.image} 
                                alt={event.title} 
                                className="eventImage"
                                loading="lazy"
                            />
                            <div className="eventDetails">
                                <h2>{event.title}</h2>
                                <p><strong>Date:</strong> {event.date}</p>
                                <p><strong>Time:</strong> {event.time}</p>
                                <p>{event.description}</p>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default Events;
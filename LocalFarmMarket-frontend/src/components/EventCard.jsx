import styles from '../styles/events.css';

const EventCard = ({ event }) => {
    return (
        <div className={styles.eventCard}>
            <img 
                src={event.image} 
                alt={event.title} 
                className={styles.eventImage}
                loading="lazy"
            />
            <div className={styles.eventDetails}>
                <h2>{event.title}</h2>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p>{event.description}</p>
                <a href={event.link} className={styles.eventButton}>
                    View Event
                </a>
            </div>
        </div>
    );
};

export default EventCard;
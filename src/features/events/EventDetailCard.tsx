import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './EventDetailCard.module.css';

const eventImageUrl = 'https://images.unsplash.com/photo-1519671482722-4fa523b9b9b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDEwfHxwYXJ0eSUyMGNvbmNlcnR8ZW58MHx8fHwxNzMwNzQwNzM5fDA&ixlib=rb-4.0.3&q=80&w=400';

interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
}

const EventDetailCard: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`http://localhost:3001/events/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setEvent(data);
                } else {
                    console.error('Failed to fetch event');
                }
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        };
        fetchEvent();
    }, [id]);

    const handleRsvp = async () => {
        try {
            const response = await fetch(`http://localhost:3001/events/${id}/rsvp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });

            if (response.ok) {
                setShowModal(false);
            } else {
                console.error('Failed to RSVP');
            }
        } catch (error) {
            console.error('Error RSVPing:', error);
        }
    };

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.logo}>LetsMeet</div>
            <div className={styles.card}>
                <img src={eventImageUrl} alt={event.title} className={styles.headerImage} />
                <div className={styles.content}>
                    <h2 className={styles.title}>{event.title}</h2>
                    <p className={styles.detail}>{event.date}</p>
                    <p className={styles.detail}>{event.location}</p>
                    <p className={styles.description}>{event.description}</p>
                    <Link to={`/events/${id}/rsvps`}>View RSVPs</Link>
                </div>
                <div className={styles.footer}>
                    <Button variant="link">Decline</Button>
                    <Button variant="primary" onClick={() => setShowModal(true)}>R.S.V.P</Button>
                </div>
            </div>

            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>RSVP for {event.title}</h2>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button variant="primary" onClick={handleRsvp}>Confirm</Button>
                        <Button variant="link" onClick={() => setShowModal(false)}>Cancel</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventDetailCard;
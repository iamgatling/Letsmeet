import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './RsvpListPage.module.css';

interface RSVP {
    name: string;
    email: string;
}

const RsvpListPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [rsvps, setRsvps] = useState<RSVP[]>([]);

    useEffect(() => {
        const fetchRsvps = async () => {
            try {
                const response = await fetch(`http://localhost:3001/events/${id}/rsvps`);
                if (response.ok) {
                    const data = await response.json();
                    setRsvps(data);
                } else {
                    console.error('Failed to fetch RSVPs');
                }
            } catch (error) {
                console.error('Error fetching RSVPs:', error);
            }
        };
        fetchRsvps();
    }, [id]);

    return (
        <div className={styles.container}>
            <h2>RSVPs</h2>
            <ul>
                {rsvps.map((rsvp, index) => (
                    <li key={index}>
                        {rsvp.name} ({rsvp.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RsvpListPage;

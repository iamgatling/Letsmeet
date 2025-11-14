import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import ColorPicker from '../../components/ColorPicker/ColorPicker'; // <-- Import ColorPicker
import styles from './CreateEventForm.module.css';

// You would typically import icons from a library like 'react-icons'
// For example: import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
const CalendarIcon = () => <span>📅</span>; // Placeholder
const LocationIcon = () => <span>📍</span>; // Placeholder
const UploadIcon = () => <span>⬆️</span>; // Placeholder

// Define the colors from your design
const eventColors = [
  '#000000', // Black
  '#D1D5DB', // Gray
  '#F3F4F6', // Light Gray
  '#A855F7', // Purple
  '#EC4899', // Pink
  '#84CC16', // Lime
  '#F9FAFB', // White-ish
];

const CreateEventForm: React.FC = () => {
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(eventColors[0]); // <-- Add state for color
  const [nameError, setNameError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName) {
      setNameError('Sorry, this field is required');
    } else {
      setNameError('');
      const eventData = {
        title: eventName,
        date: `${date} ${time}`,
        location,
        description,
        color: selectedColor,
      };

      try {
        const response = await fetch('http://localhost:3001/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        });

        if (response.ok) {
          const newEvent = await response.json();
          console.log('Event created:', newEvent);
          navigate(`/events/${newEvent.id}`);
        } else {
          console.error('Failed to create event');
        }
      } catch (error) {
        console.error('Error creating event:', error);
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.logo}>LetsMeet</div>
        <h1 className={styles.title}>Create an event</h1>

        {/* --- Add ColorPicker Here --- */}
        <div className={styles.colorPickerSection}>
          <label className={styles.label}>Event Color</label>
          <ColorPicker
            name="event-color"
            colors={eventColors}
            selectedColor={selectedColor}
            onChange={setSelectedColor}
          />
        </div>
        {/* ------------------------------ */}

        <TextInput
          label="Event's Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="David's Game Night"
          error={nameError}
        />

        <div className={styles.row}>
          <div className={styles.halfWidth}>
            <TextInput
              label="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="DD/MM/YY"
              icon={<CalendarIcon />}
            />
          </div>
          <div className={styles.halfWidth}>
            <TextInput
              label="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="00:00"
            />
          </div>
        </div>

        <TextInput
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="David's Room"
          icon={<LocationIcon />}
        />

        <div className={styles.textareaWrapper}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a short description of your event"
            className={styles.textarea}
            rows={4}
          />
        </div>

        <div className={styles.uploadBox}>
          <UploadIcon />
          <p>Include any image that describes the event</p>
        </div>

        <Button type="submit" variant="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateEventForm;
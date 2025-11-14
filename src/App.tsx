import React from 'react';
import CreateEventForm from './features/events/CreateEventForm';
import EventDetailCard from './features/events/EventDetailCard';
import './App.css'; // We'll create this file for the layout
import Calendar from './components/Calender/Calender';

function App() {
  return (
    <div className="appLayout">
      <div className="leftColumn">
        {/* Displaying the components from your design */}
        <Calendar />
        <EventDetailCard />
      </div>
      <div className="rightColumn">
        <CreateEventForm />
      </div>
    </div>
  );
}

export default App;
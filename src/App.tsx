import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateEventForm from './features/events/CreateEventForm';
import EventDetailCard from './features/events/EventDetailCard';
import RsvpListPage from './features/events/RsvpListPage'; // Assuming you create this component
import './App.css';
import Calendar from './components/Calender/Calender';

function App() {
  return (
    <Router>
      <div className="appLayout">
        <div className="leftColumn">
          <Calendar />
          <Routes>
            <Route path="/events/:id" element={<EventDetailCard />} />
            <Route path="/events/:id/rsvps" element={<RsvpListPage />} />
          </Routes>
        </div>
        <div className="rightColumn">
          <Routes>
            <Route path="/create-event" element={<CreateEventForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

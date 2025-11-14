import React from 'react';
import styles from './Calendar.module.css';

const Calendar: React.FC = () => {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  // Logic specifically for July 2025
  const year = 2025;
  const month = 6; // 0-indexed (6 is July)
  
  // Get the first day of the month (Tuesday, which is index 2)
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // Get the total number of days in the month (31)
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create an array for the grid
  const calendarGrid = [];

  // 1. Add empty cells for days before the 1st
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarGrid.push(<div key={`empty-${i}`} className={styles.day}></div>);
  }

  // 2. Add all the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarGrid.push(
      <div key={`day-${day}`} className={styles.day}>
        {day}
      </div>
    );
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>Jul 2025</div>
      <div className={styles.daysOfWeek}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.weekDay}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.grid}>
        {calendarGrid}
      </div>
    </div>
  );
};

export default Calendar;
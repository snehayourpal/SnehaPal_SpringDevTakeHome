// VolunteerNotes.js

import React, { useState, useEffect } from 'react';
import styles from "../styles/VolunteerNotes.module.css";

const VolunteerNotes = ({ volunteerId, onClose }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch notes data for the volunteer using the volunteerId
    const fetchNotes = async () => {
      try {
        console.log(volunteerId)
        const response = await fetch(`http://localhost:5001/api/bog/users/${volunteerId}/notes`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setNotes(data.notes);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, [volunteerId]);

  return (
    <div className={styles.volunteerNotesContainer}>
        <h2>Volunteer Notes</h2>
        <div className={styles.volunteerNotesContent}>{notes}</div>
        <div className={styles.volunteerNotesButtons}>
            <button onClick={onClose}>Close</button>
        </div>
        </div>
  );
};

export default VolunteerNotes;

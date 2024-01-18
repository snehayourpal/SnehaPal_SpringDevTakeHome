// ViewerPage.js
import React, { useState, useEffect } from 'react';
import styles from '../styles/VolunteerTable.module.css';
import VolunteerNotes from '../components/VolunteerNotes';
import down from '../down.png';

const PaginationControls = ({ currentPage, totalPages, handleNextPage, handlePrevPage }) => {
  return (
    <div className={`${styles.PaginationControls} PaginationControls`}>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
      <span>{currentPage}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
};

const ViewerPage = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalVolunteers, setTotalVolunteers] = useState(0);
  const volunteersPerPage = 10;
  const [selectedVolunteerId, setSelectedVolunteerId] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [sortOrder, setSortOrder] = useState(false);

  const [clickCounts, setClickCounts] = useState({});

  useEffect(() => {
    fetchData();
    fetchTotalVolunteers();
  }, [currentPage, filterText, sortOrder]);

  const fetchTotalVolunteers = () => {
    fetch('http://localhost:5001/api/bog/users/count')
      .then(response => response.json())
      .then(data => setTotalVolunteers(data.count))
      .catch(error => console.error('Error fetching total volunteers:', error));
  };

  const fetchData = () => {
    const sortParam = sortOrder ? `&_sort=hero_project&_order=asc` : '';
    
    const offset = (currentPage - 1) * volunteersPerPage;
    const url = `http://localhost:5001/api/bog/users?${sortParam}&offset=${offset}&limit=${volunteersPerPage}`;

    fetch(url)
      .then(response => response.json())
      .then(data => setVolunteers(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleRowClick = (volunteerId) => {
    setClickCounts((prevClickCounts) => ({
      ...prevClickCounts,
      [volunteerId]: (prevClickCounts[volunteerId] || 0) + 1,
    }));
  };

  const handleNextPage = () => {
    if (currentPage >= 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.volunteerTableContainer}>
      <div className={styles.volunteerTableHeader}>
        <h1>VOLUNTEER TABLE</h1>
        
      </div>

      <div className={styles.bigPage}>
      <label className={styles.filterBar}>
          Filter by Hero Project:
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </label>

        <table className={styles.volunteerTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Profile Picture</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Status</th>
              <th className = {styles.sort}>
                  Hero Project
                  <button className={styles.sortButton} onClick={() => setSortOrder(!sortOrder)}> 
                    <img src={down} alt="Edit" className={styles.downIcon} />
                  </button>
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {volunteers
                .sort((a, b) => {
                if (sortOrder) {
                  return a.hero_project.localeCompare(b.hero_project);
                }
                return 0;
              })
              .filter((volunteer) =>
                volunteer.hero_project && volunteer.hero_project.toLowerCase().includes(filterText.toLowerCase())
              )
              .map((volunteer) => (
                <tr key={volunteer.id} onClick={() => handleRowClick(volunteer.id)}>
                  <td>{volunteer.name}</td>
                  <td><img src={volunteer.avatar} alt="Profile" className={styles.volunteerTableImage} /></td>
                  <td>{volunteer.phone}</td>
                  <td>{volunteer.email}</td>
                  <td>{volunteer.rating}</td>
                  <td>{volunteer.status ? 'Active' : 'Inactive'}</td>
                  <td>{volunteer.hero_project}</td>
                  <td></td>
                  <td></td>
                  {console.log(clickCounts)/* <td>{clickCounts[volunteer.id] || 0}</td> */}
                </tr>
              ))}
          </tbody>
        </table>
        <PaginationControls
          currentPage={currentPage}
          totalPages={Math.ceil(totalVolunteers / volunteersPerPage) || 1}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      </div>
    </div>
  );
};

export default ViewerPage;

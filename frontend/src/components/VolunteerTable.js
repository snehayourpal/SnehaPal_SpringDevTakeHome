import React, { useState, useEffect } from 'react';
import styles from "../styles/VolunteerTable.module.css";
import UserForm from './UserForm';
import UpdateUserForm from './UpdateUserForm';
import VolunteerNotes from './VolunteerNotes';
import editIcon from "../edit.png";
import delIcon from "../del.png";
import notesIcon from "../notes.png";
import down from "../down.png";

const PaginationControls = ({ currentPage, totalPages, handleNextPage, handlePrevPage }) => {
  console.log('total' + totalPages)
  return (
    <div className={`${styles.PaginationControls} PaginationControls`}>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
      <span>{currentPage}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
};


const VolunteerTable = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [editingVolunteer, setEditingVolunteer] = useState(null);


  const [newUser, setNewUser] = useState({
    name: '',
    phone: '',
    email: '',
    rating: '',
    status: '',
    hero_project: '',
    avatar: '',
  });
  const [showUserForm, setShowUserForm] = useState(false);
  const defaultProfilePicture = "https://i.pinimg.com/736x/11/0e/6a/110e6affbed02f3f1b2d864832423fdc.jpg";

  const [currentPage, setCurrentPage] = useState(1);
  const [totalVolunteers, setTotalVolunteers] = useState(0);
  const volunteersPerPage = 10;
  const [selectedVolunteerId, setSelectedVolunteerId] = useState(null);

  const [clickCounts, setClickCounts] = useState({});

  const [sortOrder, setSortOrder] = useState(false); // true for asc, false for none
  const [filterText, setFilterText] = useState('');  

  const handleRowClick = (volunteerId) => {
    setClickCounts((prevClickCounts) => ({
      ...prevClickCounts,
      [volunteerId]: (prevClickCounts[volunteerId] || 0) + 1,
    }));
  };

  useEffect(() => {
    fetchData();
    fetchTotalVolunteers();
  }, [currentPage, sortOrder, filterText]);

  const fetchTotalVolunteers = () => {
    fetch('http://localhost:5001/api/bog/users/count')
      .then(response => response.json())
      .then(data => setTotalVolunteers(data.count))
      .catch(error => console.error('Error fetching total volunteers:', error));
  };

  const fetchData = () => {
    const sortParam = sortOrder ? `&_sort=hero_project&_order=asc` : '';
    const filterParam = filterText ? `&hero_project_like=${filterText}` : '';
    
    const offset = (currentPage - 1) * volunteersPerPage;
    const url = `http://localhost:5001/api/bog/users?${sortParam}&offset=${offset}&limit=${volunteersPerPage}`;

  
    fetch(url)
      .then(response => response.json())
      .then(data => setVolunteers(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  //SORTING ALPHABETICALLY DOESNT SORT EVERYTHING
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (showUserForm) {
      setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
    } else if (editingVolunteer) {
      setEditingVolunteer((prevVolunteer) => ({ ...prevVolunteer, [name]: value }));
      console.log('edited');
    }
  };

  const handleAddUser = () => {
    setShowUserForm(true);
  };

  const handleFormSubmitSuccess = () => {
    fetch('http://localhost:5001/api/bog/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(response => {
        console.log('yay');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Response from server:', data);
        setVolunteers(prevVolunteers => [...prevVolunteers, data]);
        setNewUser({
          name: '',
          phone: '',
          email: '',
          rating: '',
          status: '',
          hero_project: '',
          avatar: defaultProfilePicture,
        });
        setShowUserForm(false);
      })
      .catch(error => console.error('Error adding user:', error));
  };

  const handleUpdateUser = (userId) => {
    fetch(`http://localhost:5001/api/bog/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingVolunteer),
    })
      .then(response => response.json())
      .then(data => {
        setVolunteers(prevVolunteers => prevVolunteers.map(user => (user.id === userId ? data : user)));
        setEditingVolunteer(null);
        setShowUserForm(false);
        fetchData();
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const handleDeleteUser = (userId) => {
    fetch(`http://localhost:5001/api/bog/users/${userId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setVolunteers(prevVolunteers => prevVolunteers.filter(user => user.id !== userId));
        console.log('Response from server:', data);
        fetchData();
        fetchTotalVolunteers();
      })
      .catch(error => console.error('Error deleting user:', error));
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

  const handleRetrieveNotes = (userId) => {
    setSelectedVolunteerId(userId);
  };

  return (
    <div className={styles.volunteerTableContainer}>
      <div className={styles.volunteerTableHeader}>
        <h1>VOLUNTEER TABLE</h1>
        {!showUserForm && (
          <button className={styles.addButton} onClick={handleAddUser}> + </button>
        )}
      </div>

      {showUserForm && (
        <UserForm
          onCancel={() => setShowUserForm(false)}
          onAddUser={handleFormSubmitSuccess}
          handleInputChange={handleInputChange}
          newUser={newUser}
        />
      )}

      {editingVolunteer && (
        <UpdateUserForm
          onCancel={() => setEditingVolunteer(null)}
          onUpdateUser={handleUpdateUser}
          handleInputChange={handleInputChange}
          volunteer={editingVolunteer}
        />
      )}

      {selectedVolunteerId && (
        <VolunteerNotes
          volunteerId={selectedVolunteerId}
          onClose={() => setSelectedVolunteerId(null)}
        />
      )}

      {!showUserForm && !editingVolunteer && !selectedVolunteerId &&(
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
                <td>
                  <button onClick={() => setEditingVolunteer(volunteer)} className={styles.editDelButton}>
                    <img src={editIcon} alt="Edit" className={styles.editDelIcon} />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(volunteer.id)} className={styles.editDelButton}>
                    <img src={delIcon} alt="Edit" className={styles.editDelIcon} />
                  </button>
                </td>
                <td>
                      <button onClick={() => handleRetrieveNotes(volunteer.id)} className={styles.editDelButton}>
                      <img src={notesIcon} alt="Edit" className={styles.editDelIcon} />
                      </button>
                  </td>
                  <td>{clickCounts[volunteer.id] || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationControls
        currentPage={currentPage}
        totalPages= {Math.ceil(totalVolunteers / volunteersPerPage) || 1}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
        </div>
      )}
    </div>
  );
};

export default VolunteerTable;

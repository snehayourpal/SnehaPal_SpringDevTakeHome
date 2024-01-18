import React from 'react';
import styles from "../styles/UpdateUserForm.module.css";

const UpdateUserForm = ({ onCancel, onUpdateUser, handleInputChange, volunteer }) => {
  const defaultProfilePicture = "https://i.pinimg.com/736x/11/0e/6a/110e6affbed02f3f1b2d864832423fdc.jpg";

  return (
    <div className={styles.updateUserFormContainer}>
      <h2>UPDATE USER FORM</h2>
      <form className={styles.updateUserForm}>
        <div>
          <label>
            Name:
            <input type="text" name="name" value={volunteer.name} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Phone:
            <input type="text" name="phone" value={volunteer.phone} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type="text" name="email" value={volunteer.email} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Rating:
            <input type="text" name="rating" value={volunteer.rating} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Status:
            <input type="checkbox" name="status" checked={volunteer.status} onChange={handleInputChange} />
            Active
          </label>
        </div>
        <div>
          <label>
            Hero Project:
            <input type="text" name="hero_project" value={volunteer.hero_project} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Profile Picture:
            <input type="text" name="avatar" placeholder="Enter image URL" value={volunteer.avatar || defaultProfilePicture} onChange={handleInputChange} />
          </label>
        </div>

        <div className={styles.updateUserFormButtons}>
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="button" onClick={() => onUpdateUser(volunteer.id)}>Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserForm;

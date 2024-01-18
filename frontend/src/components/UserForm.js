// UserForm.js
import React from 'react';
import styles from "../styles/UserForm.module.css";

const UserForm = ({ onCancel, onAddUser, handleInputChange, newUser }) => {
    const defaultProfilePicture = "https://i.pinimg.com/736x/11/0e/6a/110e6affbed02f3f1b2d864832423fdc.jpg";

  return (
    <div className={styles.userFormContainer}>
      <h2>USER FORM</h2>
      <form className={styles.userForm}>
        <div>
          <label>
            Name:
            <input type="text" name="name" value={newUser.name} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Phone:
            <input type="text" name="phone" value={newUser.phone} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type="text" name="email" value={newUser.email} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Rating:
            <input type="text" name="rating" value={newUser.rating} onChange={handleInputChange} />
          </label>
        </div>
        <div>
  <label>
    Status:
    <input type="checkbox" name="status" checked={newUser.status} onChange={handleInputChange} />
    Active
  </label>
</div>


        <div>
          <label>
            Hero Project:
            <input type="text" name="hero_project" value={newUser.hero_project} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Profile Picture:
            <input type="text" name="avatar" placeholder="Enter image URL" value={newUser.avatar || defaultProfilePicture} onChange={handleInputChange} />
          </label>
        </div>
        <div className={styles.userFormButtons}>
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="button" onClick={onAddUser}>Done</button>
        </div>
      </form>
      
    </div>
  );
};

export default UserForm;

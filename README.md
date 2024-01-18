# HaHa Heroes Volunteer Management System

## Introduction

Welcome to the HaHa Heroes Volunteer Management System (VMS)! This system is designed to help HaHa Heroes, a fictional local non-profit in the greater Atlanta area, manage their volunteers and their Hero Projects effectively.

## Usage Guide

### Adding Volunteers
Click the "+" button to add a new volunteer. Fill in the details and click "Done."

### Updating Volunteers
Click the edit icon to update volunteer information. Make changes and click "Update."

### Deleting Volunteers
Click the delete icon to remove a volunteer from the table.

### Notes
Click on the notes icon to retrieve additional notes for a specific volunteer.

### Pagination
Navigate through pages using the "Previous" and "Next" buttons.

### Filtering
Use the input field to filter volunteers based on the Hero Project.

### Sorting
Click the sorting button on the Hero Project column to toggle into ascending order.

### Authorization
Different routes (`/admin/`, `/viewer/`) provide varying levels of access.

### Statistics
- Admin Page: Click counts for each volunteer are displayed as a column on the table.
- Viewer Page: Click counts are displayed in the console.

## How to Run

1. Clone the repository.
2. Install dependencies with `yarn install`.
3. Start the servers with `yarn start`.
4. Access the application at `http://localhost:3000`.
5. The server runs on port '5001;

## Project Structure

- `src/components`: Contains React components for different features.
- `src/api`: Houses the Express API for retrieving volunteer data.

## Future Areas for Improvement
- Implement Sorting and Filtering across the entire dataset as opposed to only in each page
- Implement WebWorks to log Usage Statistics
- Implement Unit Testing

Extra Notes: I tried to make the website in BoG colors :)

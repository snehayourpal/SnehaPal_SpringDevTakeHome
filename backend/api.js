import express from 'express';
import { database } from './database.js';
import cors from 'cors';

const app = express();
const port = 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/bog/users', (req, res) => {
  const { offset, limit } = req.query;

  const startIndex = offset ? parseInt(offset, 10) : 0;
  const endIndex = limit ? Math.min(startIndex + parseInt(limit, 10), database.length) : database.length;

  const paginatedUsers = database.slice(startIndex, endIndex);

  res.json(paginatedUsers).status(200);
});


app.get('/api/bog/users/count', (req, res) => {
  const totalCount = database.length;
  res.json({ count: totalCount }).status(200);
});

app.get('/api/bog/users/:id', (req, res) => {
  const user = database.find((user) => user.id === req.params.id);
  if (user) {
    res.json(user).status(200);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

const defaultProfilePicture = "https://i.pinimg.com/736x/11/0e/6a/110e6affbed02f3f1b2d864832423fdc.jpg";

app.post('/api/bog/users', (req, res) => {
  try {
    const { name, phone, email, rating, status, hero_project, avatar, notes } = req.body;

    const newUser = {
      id: generateUserId(phone),
      name,
      phone,
      email,
      rating,
      status,
      hero_project,
      avatar: avatar || defaultProfilePicture,
      notes,
    };

    database.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



function generateUserId(phone) {
  const timestamp = Date.now().toString();

  if (!phone) {
    console.error('Phone is undefined or null');
    return timestamp + 1234;
  }

  const lastFourDigits = phone.slice(-4);
  return timestamp + lastFourDigits;
}

app.get('/api/bog/users/:id/notes', (req, res) => {
  const userId = req.params.id;

  const user = database.find((user) => user.id === userId);
  console.log(user);
  if (user) {
    const notes = user.notes || []; 
    res.json({ notes }).status(200);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.put('/api/bog/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;

  const index = database.findIndex((user) => user.id === userId);

  if (index !== -1) {
    database[index] = { ...database[index], ...updatedUser };
    res.json(database).status(200);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.delete('/api/bog/users/:id', (req, res) => {
  const userId = req.params.id;

  const index = database.findIndex((user) => user.id === userId);

  if (index !== -1) {
    database.splice(index, 1);
    res.json(database).status(200);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

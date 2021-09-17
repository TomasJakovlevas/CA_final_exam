import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import User from './models/userModel.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// Connecting to DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log(`Connected to MongoDB`.blue.underline.bold);

    // Starting server
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is running on ${process.env.PORT}`.yellow.underline.bold
      );
    });
  });

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// POST New User
app.post('/api/users/signup/', (req, res) => {
  let user = req.body;

  User.find({}).then((result) => {
    const userExist = result.some((userFromDB) => {
      return userFromDB.email === user.email;
    });

    if (userExist) {
      res.json({
        status: 'Error',
        message: 'Email is already taken',
      });
    } else {
      const newUser = new User(user);

      newUser.save().then((data) => {
        let { _id } = data;
        res.json({
          status: 'Success',
          userID: _id,
        });
      });
    }
  });
});

// Get All Users
app.get('/api/users/', (req, res) => {
  User.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Put/Update User By ID
app.put('/api/user/:id', (req, res) => {
  // Check for users inputs
  if (
    !req.body.name ||
    !req.body.age ||
    !req.body.email ||
    !req.body.password
  ) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  let userID = req.params.id;

  User.findByIdAndUpdate(userID, req.body)
    .then((data) => {
      User.find({}).then((data) => {
        res.json({ status: 'Success', newData: data });
      });
    })
    .catch((err) => {
      res.json({
        status: 'Error, wrong ID',
      });
    });
});

// Delete User By ID
app.delete('/api/user/:id', (req, res) => {
  let userID = req.params.id;

  User.findByIdAndDelete(userID)
    .then((data) => {
      res.json({
        status: 'Success',
      });
    })
    .catch((err) => {
      res.json({
        status: 'Error',
        message: 'wrong ID',
      });
    });
});

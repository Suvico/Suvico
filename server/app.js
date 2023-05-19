const express = require('express'); // for server
const mongoose = require('mongoose'); // for database
const dotenv = require('dotenv'); // for security
const app = express(); // you will serve using app
const cors = require('cors'); // this is for connection between frontend and backend

dotenv.config({ path: './config.env' }); // this is the path for .env file
require('./db/conn'); // this is the file where database connection
const User = require('./model/userSchema'); // this is the collection schema

app.use(express.json()); // here, we start using server
app.use(cors()); // here, we are using cors
const PORT = process.env.PORT // here, we are assigning the port value

app.get('/api/test', (req, res) => {
  console.log(`test successful`);
  res.send('Test successful');
});

// here, we are storing the data coming from after register, we will also check the email which is already present
app.post('/Suvico', async (req, res) => {
  const data = req.body;
  const email = req.body.email;
  const response = await User.findOne({ email });
  console.log(response);
  if (response) {
    
    res.status(409).send({ status: 'Email is already registered' });
  } else {
    const newUser = new User(data);
    const result = await newUser.save();
    console.log('response', newUser);
    res.send({ response: newUser, status: 'passed' });
  }
});

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});

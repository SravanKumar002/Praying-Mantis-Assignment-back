const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3002;

// Middleware
app.use(express.json());
app.use(cors());

// app.use(bodyParser.json());

app.post('/servicea', async (req, res) => {
  try {
    const userProfile = req.body;
    console.log(userProfile);
    if (!validateUserProfile(userProfile)) {
      return res.status(400).json({ error: 'Invalid data' });
    }
    const response = await axios.post('https://serviceb.onrender.com/serviceb', userProfile);

    console.log(response.data.userId);
    res.json({ userId: response.data.userId });
  
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});


function validateUserProfile(userProfile) {
  
  const r = userProfile.email.includes('@') && userProfile.age >=18 && userProfile.age <= 45;
  console.log(r);
  
  return r
  
}

app.listen(PORT, () => {
  console.log(`Service A is running on port ${PORT}`);
});

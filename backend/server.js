require('dotenv').config({ path: '../.env' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const bookingRoutes = require('./routes/bookingRoutes');


const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection (local or Atlas)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/bookings", bookingRoutes);

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));

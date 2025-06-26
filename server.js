const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const formSchema = new mongoose.Schema({}, { strict: false });
const FormSubmission = mongoose.model('FormSubmission', formSchema);

app.post('/submit', async (req, res) => {
  try {
    const entry = new FormSubmission(req.body);
    await entry.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

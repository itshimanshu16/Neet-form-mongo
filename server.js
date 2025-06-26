const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  
});

const formSchema = new mongoose.Schema({}, { strict: false });
const FormSubmission = mongoose.model('FormSubmission', formSchema);
app.get('/submit-data', async (req, res) => {
    try {
      const data = await FormSubmission.find().limit(500).sort({ _id: -1 }); // latest first
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.delete('/delete/:id', async (req, res) => {
    try {
      await FormSubmission.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.post('/submit', async (req, res) => {
  try {
    const entry = new FormSubmission(req.body);
    await entry.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
console.log('Mongo URI:', process.env.MONGO_URI);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

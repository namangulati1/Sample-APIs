const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Sample data for GET request
const sampleData = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
];

// GET API to fetch data
app.get('/api/data', (req, res) => {
    try {
        res.json(sampleData);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

// POST API to submit data
app.post('/api/data', (req, res) => {
    try {
      const newItem = req.body;
      if (newItem && newItem.name) {
        const newId = sampleData.length + 1;
        newItem.id = newId;
        sampleData.push(newItem);
        res.status(201).json(newItem); // 201 Created
      } else {
        res.status(400).json({ error: 'Invalid data' }); // 400 Bad Request
      }
    } catch (error) {
      res.status(500).send('An error occurred');
    }
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const dataFilePath = './sampleData.json'; // Path to the data file

app.use(express.json()); // Middleware to parse JSON bodies

// Function to read data from file
function readDataFromFile() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If the file does not exist or there's an error, return default data
    return [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ];
  }
}

// Function to write data to file
function writeDataToFile(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// Initialize sample data from file
let sampleData = readDataFromFile();

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
        writeDataToFile(sampleData); // Update the file with new data
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
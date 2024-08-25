const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');  // Import cors package
app.use(express.json());
app.use(cors());
// POST /bfhl
app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  // Hardcoded user information
  const user_id = "Aarsh_patel_18082003";  // Replace with your user ID
  const email = "aarsh180803@gmail.com";
  const roll_number = "21BCE5777";

  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      user_id,
      message: 'Invalid data format'
    });
  }

  const alphabets = data.filter(item => isNaN(item));
  const numbers = data.filter(item => !isNaN(item));
  const lowerAlphabets = alphabets.filter(item => /^[a-z]$/.test(item));
  const highestLowercaseAlphabet = lowerAlphabets.length
    ? [lowerAlphabets.sort().pop()]  // Sort and get the last item
    : [];


  res.json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet
  });
});

// GET /bfhl
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    is_success: false,
    message: 'Internal Server Error'
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

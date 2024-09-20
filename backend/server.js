const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/verify', (req, res) => {
  const { code } = req.body;

  if (code.length !== 6 || code[5] === '7') {
    return res.status(400).send('Verification Error');
  }
  return res.status(200).send('Success');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

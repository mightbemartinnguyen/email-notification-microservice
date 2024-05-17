const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3001;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.static('client'));

// Endpoint to handle game results and send email
app.post('/submit-results', (req, res) => {
  const { email, results, success } = req.body;

  const subject = success ? 'Typing Game Success' : 'Typing Game Failure';
  const message = success 
    ? `Congratulations! You matched the target string.\n${results}`
    : `Unfortunately, you did not match the target string.\n${results}`;

  // Call the email microservice
  axios.post('http://localhost:3000/send-email', {
    to: email,
    subject: subject,
    message: message
  })
  .then(response => {
    res.status(200).send('Results submitted and email sent successfully');
  })
  .catch(error => {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send results email');
  });
});

// Serve the typing game HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(port, () => {
  console.log(`Typing game server is running on http://localhost:${port}`);
});

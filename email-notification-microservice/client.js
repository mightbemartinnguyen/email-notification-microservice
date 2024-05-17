const axios = require('axios');

// Send email
axios.post('http://localhost:3000/send-email', {
  to: 'recipient@example.com',
  subject: 'Results Completed',
  message: 'Your typing test has been  completed. Here are the results...'
})
.then(response => {
  console.log('Email response:', response.data);
})
.catch(error => {
  console.error('Error sending email:', error);
});

// Retrieve data
axios.get('http://localhost:3000/get-data')
  .then(response => {
    console.log('Data:', response.data);
  })
  .catch(error => {
    console.error('Error retrieving data:', error);
  });
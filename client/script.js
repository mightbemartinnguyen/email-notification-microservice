document.addEventListener('DOMContentLoaded', () => {
  const targetStringElement = document.getElementById('target-string');
  const userInput = document.getElementById('user-input');
  const emailInput = document.getElementById('email-input');
  const submitBtn = document.getElementById('submit-btn');
  const message = document.getElementById('message');

  const targetString = generateRandomString(10);
  targetStringElement.textContent = targetString;

  submitBtn.addEventListener('click', () => {
    const userInputValue = userInput.value;
    const emailValue = emailInput.value;

    if (!emailValue) {
      message.textContent = 'Please enter your email';
      message.style.color = 'red';
      return;
    }

    const results = compareStrings(targetString, userInputValue);
    const success = userInputValue === targetString;
    sendResults(emailValue, results, success);
  });

  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function compareStrings(target, input) {
    let correctCount = 0;
    for (let i = 0; i < target.length; i++) {
      if (target[i] === input[i]) {
        correctCount++;
      }
    }
    return `Target: ${target}\nInput: ${input}\nCorrect characters: ${correctCount}/${target.length}`;
  }

  function sendResults(email, results, success) {
    fetch('/submit-results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, results, success })
    })
    .then(response => response.text())
    .then(data => {
      message.textContent = data;
      message.style.color = 'green';
    })
    .catch(error => {
      message.textContent = 'Error sending results';
      message.style.color = 'red';
      console.error('Error:', error);
    });
  }
});

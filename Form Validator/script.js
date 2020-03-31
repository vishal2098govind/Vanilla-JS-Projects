// // Simple way:
// // Fetch all the DOM elements

// const form = document.getElementById('form');
// const username = document.getElementById('username');
// const email = document.getElementById('email');
// const password = document.getElementById('password');
// const password2 = document.getElementById('password2');

// // Show input Error message
// function showError(input, message) {
//   // Outline the input with red
//   const formControl = input.parentElement;
//   formControl.className = 'form-control error';

//   // small tag
//   const small = (formControl.querySelector('small').innerText = message);
// }
// // Show input Success outline
// function showSuccess(input) {
//   // Outline the input with red
//   const formControl = input.parentElement;
//   formControl.className = 'form-control success';
// }

// // Check validity of email
// function isValidEmail(email) {
//   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// }

// // Event listener on submit:
// form.addEventListener('submit', e => {
//   e.preventDefault();
//   if (username.value === '') {
//     console.log(1);
//     showError(username, 'Username is required');
//   } else {
//     showSuccess(username);
//   }
//   if (email.value === '') {
//     console.log(1);
//     showError(email, 'Email is required');
//   } else if (!isValidEmail(email.value)) {
//     showError(email, 'Email is not valid');
//   } else {
//     showSuccess(email);
//   }

//   if (password.value === '') {
//     console.log(1);
//     showError(password, 'Password is required');
//   } else {
//     showSuccess(password);
//   }
//   if (password2.value === '') {
//     console.log(1);
//     showError(password2, 'Password2 is required');
//   } else {
//     showSuccess(password2);
//   }
// });

// Refactoring with functions for each field with a seperate validation

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input Error message
function showError(input, message) {
  // Outline the input with red
  const formControl = input.parentElement;
  formControl.className = 'form-control error';

  // small tag
  const small = (formControl.querySelector('small').innerText = message);
}
// Show input Success outline
function showSuccess(input) {
  // Outline the input with red
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check validity of email
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(input.value).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      // trim to trim out white space
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)}must be atleast ${min} characters`);
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)}must be less than ${max} characters`
    );
  }
}

// Check password match
function checkPasswordsMatch(input1, input2) {
  if (input1.value === input2.value) {
    showSuccess(input2);
  } else {
    showError(input2, 'Passwords do not match');
  }
}

// get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listener on submit:
form.addEventListener('submit', e => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});

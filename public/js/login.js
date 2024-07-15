const loginForm = async function (event) {
  event.preventDefault();

  const username1 = document
    .querySelector('#user-input-info')
    .value.trim();
  const password1 = document
    .querySelector('#password-input-info')
    .value.trim();

  const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({
      username: username1,
      password: password1,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to login');
  }
};

document
  .querySelector('#login-box')
  .addEventListener('submit', loginForm);
  
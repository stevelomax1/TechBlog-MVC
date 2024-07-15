const signupForm = async function (event) {
  event.preventDefault();

  const username1 = document
    .querySelector('#newuser-info')
    .value.trim();
  const password1 = document
    .querySelector('#newuser-passoword')
    .value.trim();

  if (password1.length >= 8 && username1) {
    const response = await fetch('/api/users', {
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
      alert('Failed to sign up');
    }
  } else {
    alert(
      'Please include both a username and password, and make sure your password is at least 8 characters long'
    );
  }
};

document
  .querySelector('#signup-box')
  .addEventListener('submit', signupForm);
const useLogOut = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    return response;
  };
  
  const logout = async () => {
    try {
      var response = await useLogOut();
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);
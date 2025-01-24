// authFunctions.js

async function logout() {
    const response = await fetch('/logout', { method: 'GET' });
    if (response.ok) {
      window.location.href = '/'; // Redirect ke halaman login
    } else {
      alert('Failed to logout');
    }
  }
  
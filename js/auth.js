function setUser(username) {
  localStorage.setItem('username', username);
}

function getUser() {
  return localStorage.getItem('username');
}

function clearUser() {
  localStorage.removeItem('username');
}

function logout() {
  clearUser();
  location.href = 'login.html';
}

function requireLogin() {
  const username = getUser();
  if (!username) {
    alert('กรุณาเข้าสู่ระบบก่อนใช้งาน');
    location.href = 'login.html';
  }
}

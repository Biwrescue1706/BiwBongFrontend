document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  const result = await apiPost('login', { username, password });

  if (result.success) {
    setUser(username);
    window.location.href = 'index.html';
  } else {
    alert(result.message || 'เข้าสู่ระบบไม่สำเร็จ');
  }
});

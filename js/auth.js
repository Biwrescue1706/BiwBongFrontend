const backendURL = 'https://biwbongbackend.onrender.com';

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${backendURL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (res.ok) {
    alert('เข้าสู่ระบบสำเร็จ');
    window.location.href = 'dashboard.html';
  } else {
    alert(data.message || 'เข้าสู่ระบบล้มเหลว');
  }
});

document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${backendURL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, name, password })
  });

  const data = await res.json();
  if (res.ok) {
    alert('สมัครสมาชิกสำเร็จ');
    window.location.href = 'index.html';
  } else {
    alert(data.message || 'สมัครไม่สำเร็จ');
  }
});
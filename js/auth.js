const backendURL = 'https://biwbongbackend.onrender.com'; // เปลี่ยนเป็น URL backend จริงของคุณ

// Login
async function login(username, password) {
  const res = await fetch(`${backendURL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

// Register
async function register(username, name, password) {
  const res = await fetch(`${backendURL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, name, password })
  });
  return res.json();
}

// Logout
async function logout() {
  await fetch(`${backendURL}/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  });
}

// ดึงข้อมูลผู้ใช้จาก token
async function getMe() {
  const res = await fetch(`${backendURL}/auth/me`, {
    method: 'GET',
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Not authenticated');
  return res.json();
}

// Event listeners for Login form
document.getElementById('loginForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  const result = await login(username, password);

  if (result.token) {
    Swal.fire({
      icon: 'success',
      title: 'เข้าสู่ระบบสำเร็จ',
      text: result.message || 'ยินดีต้อนรับ!',
      timer: 1500,
      showConfirmButton: false
    });
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1600);
  } else {
    Swal.fire({
      icon: 'error',
      title: 'เข้าสู่ระบบไม่สำเร็จ',
      text: result.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
    });
  }
});

// Event listeners for Register form
document.getElementById('registerForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const name = document.getElementById('name').value.trim();
  const password = document.getElementById('password').value;

  const result = await register(username, name, password);

  if (result.user) {
    Swal.fire({
      icon: 'success',
      title: 'สมัครสมาชิกสำเร็จ',
      text: result.message || 'สามารถเข้าสู่ระบบได้แล้ว',
      timer: 1500,
      showConfirmButton: false
    });
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1600);
  } else {
    Swal.fire({
      icon: 'error',
      title: 'สมัครสมาชิกไม่สำเร็จ',
      text: result.message || 'กรุณาตรวจสอบข้อมูลอีกครั้ง'
    });
  }
});

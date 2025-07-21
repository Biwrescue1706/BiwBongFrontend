const backendURL = 'https://biwbongbackend.onrender.com';

// ฟังก์ชัน login
async function login(event) {
  event.preventDefault();
  const username = document.getElementById('username')?.value;
  const password = document.getElementById('password')?.value;

  if (!username || !password) {
    alert('กรุณากรอกข้อมูลให้ครบ');
    return;
  }

  try {
    const res = await fetch(`${backendURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert('เข้าสู่ระบบสำเร็จ');
      // บันทึก username หรือข้อมูลอื่น ๆ ถ้าต้องการ
      localStorage.setItem('username', username);
      window.location.href = 'dashboard.html';
    } else {
      alert(data.message || 'เข้าสู่ระบบล้มเหลว');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('เกิดข้อผิดพลาดระหว่างเข้าสู่ระบบ');
  }
}

// ฟังก์ชัน register
async function register(event) {
  event.preventDefault();
  const username = document.getElementById('username')?.value;
  const name = document.getElementById('name')?.value;
  const password = document.getElementById('password')?.value;

  if (!username || !name || !password) {
    alert('กรุณากรอกข้อมูลให้ครบ');
    return;
  }

  try {
    const res = await fetch(`${backendURL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, name, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert('สมัครสมาชิกสำเร็จ');
      window.location.href = 'login.html';
    } else {
      alert(data.message || 'สมัครไม่สำเร็จ');
    }
  } catch (error) {
    console.error('Register error:', error);
    alert('เกิดข้อผิดพลาดระหว่างสมัครสมาชิก');
  }
}

// ฟังก์ชันตรวจสอบสถานะการล็อกอิน
async function checkAuth() {
  try {
    const res = await fetch(`${backendURL}/auth/me`, {
      method: 'GET',
      credentials: 'include'
    });

    if (res.ok) {
      const user = await res.json();
      // ถ้ามี element แสดงชื่อผู้ใช้ ให้แสดงชื่อ
      const el = document.getElementById('usernameDisplay');
      if (el) el.textContent = user.username || user.name || 'ผู้ใช้';
      return true;
    } else {
      // ไม่ผ่านการตรวจสอบ token
      window.location.href = 'login.html';
      return false;
    }
  } catch (error) {
    console.error('Auth check error:', error);
    window.location.href = 'login.html';
    return false;
  }
}

// เช็คว่ากำลังอยู่หน้า login หรือ register แล้วผูก event
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginForm) {
    loginForm.addEventListener('submit', login);
  }

  if (registerForm) {
    registerForm.addEventListener('submit', register);
  }
});

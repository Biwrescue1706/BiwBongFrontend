function loadNavbar() {
  const navHTML = `
    <nav style="background-color: #20c997; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
      <strong style="color: white; font-size: 1.2em;">ระบบยืม-คืนอุปกรณ์</strong>
      <ul style="list-style: none; display: flex; gap: 15px; padding: 0; margin-top: 10px;">
        <li><a href="dashboard.html">🏠 หน้าหลัก</a></li>
        <li><a href="borrow.html">📦 ยืมอุปกรณ์</a></li>
        <li><a href="return.html">🔁 คืนอุปกรณ์</a></li>
        <li><a href="#" onclick="logout()">🚪 ออกจากระบบ</a></li>
      </ul>
    </nav>
  `;
  const container = document.getElementById('nav-container');
  if (container) container.innerHTML = navHTML;
}

async function logout() {
  await fetch('https://biwbongbackend.onrender.com/auth/logout', {
    method: 'POST',
    credentials: 'include'
  });
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', loadNavbar);

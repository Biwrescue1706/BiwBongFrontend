function loadNavbar() {
  const navHTML = `
    <nav style="background-color: #20c997; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
      <strong style="color: white; font-size: 1.2em;">ระบบยืม-คืนอุปกรณ์</strong>
      <ul style="list-style: none; display: flex; gap: 15px; padding: 0; margin-top: 10px;">
        <li><a href="dashboard.html" style="color: white; text-decoration: none;">🏠 ระบบยืมอุปกรณ์</a></li>
        <li><a href="borrow.html" style="color: white; text-decoration: none;">📦 ยืมอุปกรณ์</a></li>
        <li><a href="return.html" style="color: white; text-decoration: none;">🔁 คืนอุปกรณ์</a></li>
        <li><a href="#" id="logoutLink" style="color: white; text-decoration: none;">🚪 ออกจากระบบ</a></li>
      </ul>
    </nav>
  `;
  const container = document.getElementById('nav-container');
  if (container) container.innerHTML = navHTML;

  // ผูก event logout ที่นี่เลย
  const logoutLink = document.getElementById('logoutLink');
  if (logoutLink) {
    logoutLink.addEventListener('click', async (e) => {
      e.preventDefault();
      await fetch('https://biwbongbackend.onrender.com/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      window.location.href = "login.html";
    });
  }
}

document.addEventListener('DOMContentLoaded', loadNavbar);

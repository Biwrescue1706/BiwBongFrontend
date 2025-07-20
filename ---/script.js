const BASE_URL = "https://script.google.com/macros/s/AKfycbx.../exec"; // เปลี่ยน URL เป็นของคุณ

function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "register",
      username,
      password
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("สมัครสมาชิกสำเร็จ");
        window.location.href = "index.html"; // ไปหน้า login
      } else {
        alert("เกิดข้อผิดพลาด: " + data.message);
      }
    });
}

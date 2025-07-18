// js/register.js
import { registerAdmin } from "./api.js";

const btnRegister = document.getElementById("btnRegister");
const errorEl = document.getElementById("error");

btnRegister.onclick = async () => {
  errorEl.textContent = "";
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    errorEl.textContent = "กรุณากรอก username และ password";
    return;
  }

  try {
    const res = await registerAdmin(username, password);
    if (res.status === "success") {
      alert("สมัครสมาชิกสำเร็จ!");
      window.location.href = "index.html";
    } else {
      errorEl.textContent = res.message || "สมัครสมาชิกไม่สำเร็จ";
    }
  } catch (err) {
    errorEl.textContent = "เกิดข้อผิดพลาดในการเชื่อมต่อ";
    console.error(err);
  }
};

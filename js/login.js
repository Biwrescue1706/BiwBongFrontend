import { loginAdmin } from "./api.js";
import { setToken } from "./auth.js";

const btnLogin = document.getElementById("btnLogin");
const errorEl = document.getElementById("error");

btnLogin.onclick = async () => {
  errorEl.textContent = "";
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    errorEl.textContent = "กรุณากรอก username และ password";
    return;
  }

  try {
    const res = await loginAdmin(username, password);
    if (res.status === "success" && res.token) {
      setToken(res.token);
      window.location.href = "add.html";
    } else {
      errorEl.textContent = res.message || "เข้าสู่ระบบล้มเหลว";
    }
  } catch (err) {
    errorEl.textContent = "เกิดข้อผิดพลาดในการเชื่อมต่อ";
    console.error(err);
  }
};

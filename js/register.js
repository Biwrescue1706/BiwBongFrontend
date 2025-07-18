document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  if (!form) {
    console.error("ไม่พบฟอร์ม registerForm");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.querySelector("#username")?.value?.trim();
    const password = document.querySelector("#password")?.value?.trim();

    if (!username || !password) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    const userId = generateId("u_");

    try {
      const result = await register(userId, username, password);
      if (result.success) {
        alert("สมัครสมาชิกสำเร็จ");
        window.location.href = "login.html";
      } else {
        alert(result.message || "สมัครสมาชิกไม่สำเร็จ");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("เกิดข้อผิดพลาด");
    }
  });
});

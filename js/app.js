const API_BASE_URL = "https://script.google.com/macros/s/AKfycbwP9K5NV1PiGPCYByCJo09KRgftBIrgMta9OHQQcCYMEnuWzHk8E-DxogYAe1eLxwqkRQ/exec";

// ฟังก์ชันดึงอุปกรณ์ทั้งหมด
async function fetchEquipments() {
  try {
    const res = await fetch(`${API_BASE_URL}?action=getEquipments`);
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    renderEquipments(data);
  } catch (error) {
    alert("ไม่สามารถโหลดอุปกรณ์ได้: " + error.message);
  }
}

function renderEquipments(equipments) {
  const tbody = document.querySelector("#equipment-table tbody");
  tbody.innerHTML = "";
  equipments.forEach(e => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${e.ID}</td>
      <td>${e.Name}</td>
      <td>${e.Total}</td>
      <td>${e.Available}</td>
      <td>${formatDate(e.Created_at)}</td>
      <td>${formatDate(e.Update_At)}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ฟังก์ชันเพิ่มอุปกรณ์
async function createEquipment({ ID, Name, Total }) {
  const payload = {
    action: "addEquipment",
    ID,
    Name,
    Total
  };
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to create equipment");
  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message || "Error from server");
  return data;
}

// ฟังก์ชันดึงผู้ใช้ทั้งหมด
async function fetchUsers() {
  try {
    const res = await fetch(`${API_BASE_URL}?action=getUsers`);
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    renderUsers(data);
  } catch (error) {
    alert("ไม่สามารถโหลดผู้ใช้ได้: " + error.message);
  }
}

function renderUsers(users) {
  const tbody = document.querySelector("#users-table tbody");
  tbody.innerHTML = "";
  users.forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${u.UserId}</td>
      <td>${u.Username}</td>
      <td>${formatDate(u.Created_at)}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ฟังก์ชันเพิ่มผู้ใช้
async function createUser({ UserId, Username, Password }) {
  const payload = {
    action: "addUser",
    UserId,
    Username,
    Password
  };
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to create user");
  const data = await res.json();
  if (data.status !== "success") throw new Error(data.message || "Error from server");
  return data;
}

// แปลงวันที่ (ISO หรือ Timestamp) ให้ดูง่าย
function formatDate(dateString) {
  if (!dateString) return "";
  let d = new Date(dateString);
  if (isNaN(d)) return dateString;
  return d.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

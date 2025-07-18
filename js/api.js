const BASE_URL = "https://script.google.com/macros/s/AKfycbjRQKdhFysyq1j5B0wr18DEWk9cjvZRd4Kdi3RziimBYAg0wH1_AvoUOkbwPzm3LWVbw/exec";

export async function loginAdmin(username, password) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "loginAdmin", username, password }),
  });
  return await res.json();
}

export async function registerAdmin(username, password) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "register", username, password }),
  });
  return await res.json();
}

export async function getEquipments() {
  const res = await fetch(`${BASE_URL}?type=equipments`);
  return await res.json();
}

export async function addEquipment(name, total, token) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "addEquipment", name, total, token }),
  });
  return await res.json();
}

export async function borrowEquipment(name, equipmentId, quantity) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "borrowEquipment", name, equipmentId, quantity }),
  });
  return await res.json();
}

export async function returnEquipment(borrowId, token) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "returnEquipment", borrowId, token }),
  });
  return await res.json();
}

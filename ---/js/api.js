const API_URL = 'https://script.google.com/macros/s/AKfycbwP9K5NV1PiGPCYByCJo09KRgftBIrgMta9OHQQcCYMEnuWzHk8E-DxogYAe1eLxwqkRQ/exec';

/**
 * เรียก API Google Apps Script
 * @param {string} action ชื่อ action เช่น getUsers, addUser
 * @param {object} params พารามิเตอร์เพิ่มเติม
 * @returns {Promise<any>}
 */
async function apiCall(action, params = {}) {
  params.action = action;

  if (action.startsWith('get')) {
    // GET request
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  } else {
    // POST request
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  }
}

/**
 * GET แบบแยกต่างหาก (ใช้ก็ได้ ไม่ใช้ก็ได้)
 */
async function apiGet(action, params = {}) {
  const url = new URL(API_URL);
  url.searchParams.append("action", action);
  Object.keys(params).forEach(k => url.searchParams.append(k, params[k]));
  const res = await fetch(url);
  return res.json();
}

/**
 * POST แบบแยกต่างหาก (ใช้ก็ได้ ไม่ใช้ก็ได้)
 */
async function apiPost(action, data = {}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, ...data })
  });
  return res.json();
}

// ----------------------- AUTH ------------------------

function getLoggedInUser() {
  return localStorage.getItem('username');
}

function setLoggedInUser(username) {
  localStorage.setItem('username', username);
}

function logoutUser() {
  localStorage.removeItem('username');
}

async function login(username, password) {
  const users = await apiCall('getUsers');
  const user = users.find(u => u.Username === username && u.Password_hash === password);
  if(user) {
    setLoggedInUser(username);
    return { success: true };
  }
  return { success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' };
}

async function register(userId, username, password) {
  const users = await apiCall('getUsers');
  if(users.some(u => u.Username === username)){
    return { success: false, message: 'ชื่อผู้ใช้นี้ถูกใช้งานแล้ว' };
  }
  const res = await apiCall('addUser', { UserId: userId, Username: username, Password: password });
  if(res.status === 'success'){
    setLoggedInUser(username);
    return { success: true, message: 'สมัครสมาชิกสำเร็จ' };
  }
  return { success: false, message: res.message || 'เกิดข้อผิดพลาด' };
}

// ---------------------- EQUIPMENT -----------------------

async function getEquipments() {
  return apiCall('getEquipments');
}

async function addEquipment(id, name, total) {
  return apiCall('addEquipment', { ID: id, Name: name, Total: total });
}

async function deleteEquipment(id) {
  return apiCall('deleteEquipment', { ID: id });
}

// ---------------------- BORROW --------------------------

async function getBorrows() {
  return apiCall('getBorrows');
}

async function addBorrow(borrowData) {
  return apiCall('addBorrow', borrowData);
}

async function deleteBorrow(borrowID) {
  return apiCall('deleteBorrow', { BorrowID: borrowID });
}

// ---------------------- RETURN --------------------------

async function getReturns() {
  return apiCall('getReturns');
}

async function addReturn(returnData) {
  return apiCall('addReturn', returnData);
}

async function deleteReturn(returnID) {
  return apiCall('deleteReturn', { returnID: returnID });
}

// --------------------- ID GENERATOR ---------------------

function generateId(prefix = '') {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  return `${prefix}${timestamp}${randomNum}`;
}

requireLogin();

document.getElementById('btnLogout').onclick = logout;
document.getElementById('btnLoadPendingReturns').onclick = loadPendingReturns;

const tbody = document.querySelector('#pendingReturnTable tbody');
const table = document.getElementById('pendingReturnTable');

async function loadPendingReturns() {
  try {
    // ดึงข้อมูลยืมและคืน และอุปกรณ์
    const borrows = await apiGet('getBorrows');
    const returns = await apiGet('getReturns');
    const equipments = await apiGet('getEquipments');

    // กรองรายการที่ยังไม่มี Return Date (ค้างคืน)
    const pending = borrows.filter(b => !b["Return Date"] || b["Return Date"] === "");

    tbody.innerHTML = '';

    pending.forEach(b => {
      const eq = equipments.find(e => e.ID === b["Equipment ID"]) || {};
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${b.BorrowID}</td>
        <td>${b.Username}</td>
        <td>${eq.Name || b["Equipment ID"]}</td>
        <td>${b.Quantity}</td>
        <td>${b.Date}</td>
      `;
      tbody.appendChild(tr);
    });

    table.style.display = pending.length ? 'table' : 'none';

    if(pending.length === 0) {
      alert('ไม่มีรายการค้างคืน');
    }
  } catch (err) {
    alert('เกิดข้อผิดพลาด: ' + err.message);
  }
}

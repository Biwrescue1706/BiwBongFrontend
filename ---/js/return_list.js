requireLogin();
document.getElementById('btnLogout').onclick = logout;
document.getElementById('btnLoadReturns').onclick = loadReturns;

const tbody = document.querySelector('#returnTable tbody');
const table = document.getElementById('returnTable');

async function loadReturns() {
  try {
    const borrows = await apiGet('getBorrows');
    const returns = await apiGet('getReturns');
    const equipments = await apiGet('getEquipments');

    // กรองรายการยืมที่ยังไม่มี Return Date = ค้างคืน
    const notReturned = borrows.filter(b => !b["Return Date"]);

    tbody.innerHTML = '';
    notReturned.forEach(b => {
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

    table.style.display = 'table';
  } catch(e) {
    alert('โหลดข้อมูลผิดพลาด: ' + e.message);
  }
}

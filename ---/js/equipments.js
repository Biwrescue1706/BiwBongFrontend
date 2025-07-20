requireLogin();

async function loadEquipments() {
  const res = await apiGet('getEquipments');

  const table = document.getElementById('equipmentTable');
  table.innerHTML = '';

  res.data.forEach(eq => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${eq.id}</td>
      <td>${eq.name}</td>
      <td>${eq.total}</td>
      <td>${eq.available}</td>
      <td>
        <button onclick="editEquipment('${eq.id}')">แก้ไข</button>
        <button onclick="deleteEquipment('${eq.id}')">ลบ</button>
      </td>
    `;
    table.appendChild(row);
  });
}

async function addEquipment(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const total = parseInt(document.getElementById('total').value, 10);

  const result = await apiPost('addEquipment', { name, total });

  if (result.success) {
    alert('เพิ่มอุปกรณ์เรียบร้อย');
    loadEquipments();
  } else {
    alert(result.message || 'เกิดข้อผิดพลาด');
  }
}

async function editEquipment(id) {
  const name = prompt('ชื่อใหม่');
  const total = prompt('จำนวนใหม่');

  const result = await apiPost('updateEquipment', {
    id, name, total: parseInt(total, 10)
  });

  if (result.success) {
    loadEquipments();
  }
}

async function deleteEquipment(id) {
  if (!confirm('คุณแน่ใจหรือไม่ว่าจะลบอุปกรณ์นี้?')) return;

  const result = await apiPost('deleteEquipment', { id });

  if (result.success) {
    loadEquipments();
  }
}

document.getElementById('addForm').addEventListener('submit', addEquipment);
loadEquipments();

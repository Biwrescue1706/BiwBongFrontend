requireLogin();

document.getElementById('borrowForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const equipmentId = document.getElementById('equipmentId').value;
  const quantity = parseInt(document.getElementById('quantity').value, 10);
  const returnDate = document.getElementById('returnDate').value;

  const result = await apiPost('borrow', {
    username: getUser(),
    equipmentId,
    quantity,
    returnDate
  });

  if (result.success) {
    alert('ยืมอุปกรณ์เรียบร้อย');
    window.location.reload();
  } else {
    alert(result.message || 'เกิดข้อผิดพลาด');
  }
});

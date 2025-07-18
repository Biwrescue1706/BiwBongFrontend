requireLogin();

async function loadBorrowList() {
  const res = await apiGet('getBorrows', { username: getUser() });

  const list = document.getElementById('borrowList');
  list.innerHTML = '';

  res.data.forEach(row => {
    const li = document.createElement('li');
    li.textContent = `อุปกรณ์: ${row.name} | จำนวน: ${row.quantity} | วันที่ยืม: ${row.date}`;

    if (!row.returned) {
      const btn = document.createElement('button');
      btn.textContent = 'คืน';
      btn.onclick = async () => {
        const result = await apiPost('return', {
          borrowId: row.borrowId,
          username: getUser()
        });

        if (result.success) {
          alert('คืนอุปกรณ์เรียบร้อย');
          loadBorrowList();
        } else {
          alert(result.message || 'เกิดข้อผิดพลาด');
        }
      };
      li.appendChild(btn);
    }

    list.appendChild(li);
  });
}

loadBorrowList();

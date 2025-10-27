const socket = io("http://localhost:3001");
const orderContainer = document.getElementById("orders");
const notifSound = document.getElementById("notif");

// Tampilkan pesanan
function renderOrder(order) {
  const div = document.createElement("div");
  div.className = "order";
  div.id = `order-${order.id}`;
  div.innerHTML = `
    <strong>🍽️ ${order.menu}</strong> <br>
    Meja: ${order.table} <br>
    Waktu: ${new Date(order.time).toLocaleTimeString()} <br>
    Status: <span id="status-${order.id}">${order.status}</span><br><br>
    <button class="status-btn pending" onclick="updateStatus(${order.id}, 'Dalam Proses')">Proses</button>
    <button class="status-btn processing" onclick="updateStatus(${order.id}, 'Selesai')">Selesai</button>
  `;
  orderContainer.appendChild(div);
}

// Ambil data awal
fetch("http://localhost:3001/orders")
  .then(res => res.json())
  .then(data => {
    data.forEach(renderOrder);
  });

// Pesanan baru real-time
socket.on("newOrder", (order) => {
  renderOrder(order);
  notifSound.play(); // 🔔 bunyi notifikasi
  alert(`Pesanan baru: ${order.menu}`);
});

// Status diperbarui real-time
socket.on("statusUpdated", (order) => {
  const statusEl = document.getElementById(`status-${order.id}`);
  if (statusEl) statusEl.textContent = order.status;
});

// Fungsi ubah status
function updateStatus(id, status) {
  fetch("http://localhost:3001/update-status", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status })
  });
}

const socket = io("https://0d414b3da4ef.ngrok-free.app/");
const orderContainer = document.getElementById("orders");
const notifSound = document.getElementById("notif");

fetch("https://0d414b3da4ef.ngrok-free.app/orders")
  .then(res => res.json())
  .then(data => {
    data.forEach(renderOrder);
  });

socket.on("newOrder", (order) => {
  renderOrder(order);
  notifSound.play();
  alert(`Pesanan baru: ${order.menu}`);
});

socket.on("statusUpdated", (order) => {
  const statusEl = document.getElementById(`status-${order.id}`);
  if (statusEl) statusEl.textContent = order.status;
});

function updateStatus(id, status) {
  fetch("https://0d414b3da4ef.ngrok-free.app/update-status", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status })
  });
}

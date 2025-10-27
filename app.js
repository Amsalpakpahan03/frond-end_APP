function addOrder(menu) {
  const params = new URLSearchParams(window.location.search);
  const table = params.get("meja") || "Tanpa Meja";
  const order = { menu, table, time: new Date().toISOString() };

  if (navigator.onLine) {
    fetch("https://0d414b3da4ef.ngrok-free.app/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then(() => (document.getElementById("status").textContent = "Pesanan terkirim ✅"))
      .catch(() => saveOrderOffline(order));
  } else {
    saveOrderOffline(order);
    document.getElementById("status").textContent = "Offline: pesanan disimpan lokal 📦";
  }
}

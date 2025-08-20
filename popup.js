document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(null, (data) => {
    let report = "";
    for (let site in data) {
      let minutes = Math.floor(data[site] / 60000);
      report += `<p>${site}: ${minutes} min</p>`;
    }
    document.getElementById("report").innerHTML = report;
  });

  document.getElementById("syncBtn").addEventListener("click", () => {
    chrome.storage.local.get(null, (data) => {
      fetch("http://localhost:5000/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then(() => alert("Data synced!"));
    });
  });
});

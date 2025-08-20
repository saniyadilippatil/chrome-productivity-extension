const siteInput = document.getElementById("siteInput");
const siteList = document.getElementById("siteList");

chrome.storage.sync.get("blockedSites", (data) => {
  const sites = data.blockedSites || [];
  sites.forEach(site => addSiteToUI(site));
});

document.getElementById("addBtn").addEventListener("click", () => {
  const site = siteInput.value;
  if (!site) return;

  chrome.storage.sync.get("blockedSites", (data) => {
    const sites = data.blockedSites || [];
    sites.push(site);
    chrome.storage.sync.set({ blockedSites: sites });
    addSiteToUI(site);
  });

  siteInput.value = "";
});

function addSiteToUI(site) {
  const li = document.createElement("li");
  li.textContent = site;
  siteList.appendChild(li);
}

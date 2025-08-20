let startTimes = {};

// Default blocked sites
let blockedSites = ["facebook.com", "youtube.com"];

// Track active tab
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  let tab = await chrome.tabs.get(activeInfo.tabId);
  let url = new URL(tab.url).hostname;

  // Stop previous tab timer
  if (startTimes.currentTab) {
    let timeSpent = Date.now() - startTimes.startTime;
    saveTime(startTimes.currentTab, timeSpent);
  }

  // Start new tab timer
  startTimes.currentTab = url;
  startTimes.startTime = Date.now();

  // Block distracting sites
  if (blockedSites.includes(url)) {
    chrome.tabs.update(activeInfo.tabId, { url: "chrome://newtab" });
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon48.png",
      title: "Site Blocked",
      message: `${url} is blocked to boost productivity!`
    });
  }
});

// Save time in chrome storage
function saveTime(site, ms) {
  chrome.storage.local.get([site], (result) => {
    let total = result[site] ? result[site] + ms : ms;
    chrome.storage.local.set({ [site]: total });
  });
}

// Sync data with backend every 5 minutes
chrome.alarms.create("syncData", { periodInMinutes: 5 });
chrome.alarms.onAlarm.addListener(() => {
  chrome.storage.local.get(null, (data) => {
    fetch("http://localhost:5000/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  });
});

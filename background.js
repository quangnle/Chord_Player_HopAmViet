chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ instrument: '' });
  chrome.storage.sync.set({ instrument: '' });
});
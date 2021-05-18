// setup default toneData
chrome.runtime.onInstalled.addListener(() => {
  initDefaultToneData();
});

function initDefaultToneData(){
  chrome.storage.sync.set({
    toneData:{ 
                instrument: "pinano",
                toneType: "sequence" 
              }
    }
  );
}
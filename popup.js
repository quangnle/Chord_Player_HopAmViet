
bindEventToInstrumentElement();
initToneData();

function initToneData(){
  chrome.storage.sync.get("toneData", (result) => {
    if(!result || !result.toneData)
    {
      chrome.storage.sync.set({toneData:{}});

      chooseInstrument();
      chooseToneType();
    }else{
      let instrumentButton = document.querySelector(`button.instrument-type[data-instrument=${result.toneData.instrument}]`);
      markCurrentInstrument(instrumentButton);
      let toneButton = document.querySelector(`input[type=radio][value=${result.toneData.toneType}]`);
      markCurrentToneType(toneButton);
    }
  });
}

function markCurrentInstrument(instrumentButton){
  let backgroundColor = '#0D5E4D';
  let color = '#fff';
  instrumentButton.style.backgroundColor = backgroundColor;
  instrumentButton.style.color = color;
}

function markCurrentToneType(toneButton){
  toneButton.checked = true;
}

function resetInstrument(){
  chrome.storage.sync.get("toneData", ({toneData}) => {
    toneData['instrument'] = '';
    chrome.storage.sync.set({ toneData });

    let instruments = document.getElementsByClassName("instrument-type");

    let backgroundColor = '#fff';
    let color = '#000';
    for (let index = 0; index < instruments.length; index++) {
      const instrum = instruments[index];
      instrum.style.backgroundColor = backgroundColor;
      instrum.style.color = color;
    }
  });
}

function chooseInstrument(instrumentEle){
  chrome.storage.sync.get("toneData", ({toneData}) => {
    if(!instrumentEle) instrumentEle = document.getElementById("instrument-default")
    
    toneData['instrument']=instrumentEle.dataset.instrument;

    chrome.storage.sync.set({ toneData });
    markCurrentInstrument(instrumentEle);
  });
}

function chooseToneType(toneEle){
  chrome.storage.sync.get("toneData", ({toneData}) => {
    if(!toneEle) toneEle = document.querySelector("input[type=radio][name=tone-type][checked]");
    
    toneData['toneType'] = toneEle.value;

    chrome.storage.sync.set({ toneData });
    markCurrentToneType(toneEle);
  });
}

function bindEventToInstrumentElement(){
  let instruments = document.getElementsByClassName("instrument-type");
  for (let index = 0; index < instruments.length; index++) {
    const itm = instruments[index];
    
    itm.addEventListener("click", async (e) => {
      resetInstrument();
      chooseInstrument(itm);
    });
  }

  let toneTypes = document.querySelectorAll("input[type=radio][name=tone-type]");
  for (var i = 0; i < toneTypes.length; i++) {
    toneTypes[i].addEventListener('change', function() {
      chooseToneType(this);
    });
  }
  console.log(toneTypes);
}
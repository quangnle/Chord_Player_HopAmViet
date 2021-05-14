
bindEventToInstrumentElement();
chooseInstrument();

function resetInstrument(){
  chrome.storage.sync.set({ instrument: '' });

  let instruments = document.getElementsByClassName("instrument-type");
  let backgroundColor = '#fff';
  let color = '#000';
  for (let index = 0; index < instruments.length; index++) {
    const instrum = instruments[index];
    instrum.style.backgroundColor = backgroundColor;
    instrum.style.color = color;
  }
}

function chooseInstrument(instrumentEle){
  let backgroundColor = '#0D5E4D';
  let color = '#fff';
  if(!instrumentEle) instrumentEle = document.getElementById("instrument-default")
  chrome.storage.sync.set({ instrument: instrumentEle.dataset.instrument });
  instrumentEle.style.backgroundColor = backgroundColor;
  instrumentEle.style.color = color;
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
}
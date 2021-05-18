$( document ).ready(function() {
  bindEventToInstrumentElement();
  initToneData();
});
function initToneData(){
  chrome.storage.sync.get("toneData", (result) => {

    if(!result || !result.toneData)
    {
      chrome.storage.sync.set({toneData:{}}, ()=>{
        chooseInstrument(null, ()=>chooseToneType(null));
      });
    }else{
      let instrumentButton = $(`button.instrument-type[data-instrument=${result.toneData.instrument}]`);
      markCurrentInstrument(instrumentButton);
      let toneButton = $(`input[type=radio][value=${result.toneData.toneType}]`);
      markCurrentToneType(toneButton);
    }
  });
}

function markCurrentInstrument(instrumentButton){
  let backgroundColor = '#0D5E4D';
  let color = '#fff';
  $(instrumentButton).css('background-color', backgroundColor);
  $(instrumentButton).css('color', color);
}

function markCurrentToneType(toneButton){
  $(toneButton).prop("checked", true);
}

function resetInstrument(){
  chrome.storage.sync.get("toneData", ({toneData}) => {
    toneData['instrument'] = '';
    chrome.storage.sync.set({ toneData }, ()=>{
      let instruments = $(`.instrument-type`);

      let backgroundColor = '#fff';
      let color = '#000';
      for (let index = 0; index < instruments.length; index++) {
        const instrum = instruments[index];
        $(instrum).css('background-color', backgroundColor);
        $(instrum).css('color', color);
      }
    });
  });
}

function chooseInstrument(instrumentEle, callback){
  chrome.storage.sync.get("toneData", ({toneData}) => {
    if(!instrumentEle) instrumentEle = $(`#instrument-default`)
    
    toneData['instrument']=$(instrumentEle).data('instrument');

    chrome.storage.sync.set({ toneData }, ()=>{
      markCurrentInstrument(instrumentEle);
      if(callback) callback();
    });
  });
}

function chooseToneType(toneEle, callback){
  chrome.storage.sync.get("toneData", ({toneData}) => {
    if(!toneEle) toneEle = $(`input[type=radio][name=tone-type][checked]`);
    
    toneData['toneType'] = $(toneEle).val();

    chrome.storage.sync.set({ toneData }, ()=>{
      markCurrentToneType(toneEle);
      if(callback) callback();
    });

  });
}

function bindEventToInstrumentElement(){
  let instruments = $(`.instrument-type`);
  for (let index = 0; index < instruments.length; index++) {
    const itm = instruments[index];
    
    $(itm).on("click", (e) => {
      resetInstrument();
      chooseInstrument(itm);
    });
  }

  let toneTypes = $(`input[type=radio][name=tone-type]`);
  for (var i = 0; i < toneTypes.length; i++) {
    const itm = toneTypes[i];
    $(itm).on('change', function() {
      chooseToneType(itm);
    });
  }
}
$(document).ready(function(){
    console.log('chord ready');

    $(window).click(function(e) {
        var x = e.clientX, y = e.clientY,
        elementMouseIsOver = document.elementFromPoint(x, y);
        chrome.storage.sync.get("toneData", ({toneData}) => {
            let currentInstrument = toneData.instrument;
            let currentToneType = toneData.toneType;
            //debugger
            
            // TODO: choose instrument here
            if (elementMouseIsOver.className == "chord") {
                const reg = /[\[\]]/;
                let chord = elementMouseIsOver.innerText.split(reg)[1];
                playChord(chord, 1);
            }
        });


    });
})
$(document).ready(function(){
    console.log('chord ready');

    $(window).click(function(e) {
        var x = e.clientX, y = e.clientY,
        elementMouseIsOver = document.elementFromPoint(x, y);
        chrome.storage.sync.get("toneData", ({toneData}) => {
            let currentInstrument = toneData.instrument;
            let currentToneType = toneData.toneType;
           
            if (elementMouseIsOver.className == "chord") {
                const reg = /[\[\]]/;
                let chord = elementMouseIsOver.innerText.split(reg)[1];
                switch (currentInstrument) {
                    case 'pinano':
                        sampler = Piano_Sampler;
                        break;
                    case 'guitar':
                        sampler = NylonGuitar_Sampler;
                        break;
                }
                switch (currentToneType) {
                    case 'combination':
                        playChord(chord, 1);
                        break;
                    case 'sequence':
                        playChordSeq(chord, 1);
                        break;
                }

            }
        });


    });
})
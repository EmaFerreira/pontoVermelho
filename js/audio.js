let osc = [];
let freq = [];
let freqL;
let amp = [];
let ampVol;

let mainOsc, mainAmp, mainFreq, mainClick, clickEnv;
let click = true;
let counterClick = 0;
let timmerClickMax, timmerClickMin


let change = 0;
let millisecond, prevMillisAud, prevClick;

let termosAceites = false;
let playAudio = false;




function setupAudio() {
    millisecond = millis()
    prevMillisAud = millisecond;
    prevClick = millisecond;

    let botao = select('#audioTerms');
    botao.mouseClicked(termoAudio)

}

function drawAudio() {
    if (termosAceites) {
        millisecond = millis()

        if (!playAudio)
            startOsc();
        else {
            playOsc();
        }

    }
}


function termoAudio() {
    // freq = [155, 160, 56, 120, 145, 300];
    freq = [155, 160, 56, 120];
    freqL = freq.length

    ampVol = 0;
    mainAmp = 0;


    for (let i = 0; i < freq.length; i++) {
        osc[i] = new p5.Oscillator('sine');
        osc[i].freq(freq[i]);
        osc[i].amp(ampVol);
        osc[i].start();
    }



    mainOsc = new p5.Oscillator('sine');
    mainOsc.freq(mainFreq);
    mainOsc.amp(mainAmp);
    mainOsc.start();

    mainClick = new p5.Oscillator('triangle');

    clickEnv = new p5.Env()
    clickEnv.setADSR(0.001, 0.01, 0.002, 0.005);
    clickEnv.setRange(0.2, 0);

    mainClick.freq(mainFreq);
    mainClick.amp(clickEnv);
    mainClick.start();

    document.getElementById("audioTerms").style.display = `none`;
    termosAceites = true

}


function startOsc() {
    ampVol = 1;
    for (let i = 0; i < osc.length; i++) {
        if (i < 1)
            osc[i].amp(ampVol, 2);
        else if (i < 3)
            osc[i].amp(ampVol / 2, 2);
        else
            osc[i].amp(ampVol / 4, 2);
    }

    playAudio = true;


}

function playClickLetter() {
    mainFreq = 310 * 2;
    mainClick.freq(mainFreq);
    clickEnv.play();

}

function playOsc() {
    if (millisecond - prevMillisAud > 3000) {
        for (let i = 0; i < osc.length; i++) {
            freq[i] = freq[i] + change;
            osc[i].freq(freq[i], 0.5);
        }

        if (freq[0] > 150)
            change = random(-1, 20) * -1
        else if (freq[0] <= 155)
            change = random(-1, 20)

        prevMillisAud = millisecond

        moreOSC();
    }

    if (happyEndBool)
        changeAudioByLetter()
}

function changeAudioByLetter() {
    //mainAmp = 0.2;


    if (happyEndBool)
        mainFreq = random(280, 320)
    else
        mainFreq = map(xHeight, letterW / 200 * -1, letterW / 50, 280, 320)

    mainClick.freq(mainFreq + 2);
    mainOsc.freq(mainFreq, 1);

    //o click só acontece quando há espaços
    if (click && millisecond - prevClick > random(timmerClickMin, timmerClickMax)) {
        clickEnv.play();
        counterClick++;

        //alguns clicks --- eles acontecem no espaço em branco
        if (counterClick > random(4, 8)) {
            click = false;
            counterClick = 0;

            mainOsc.amp(0.1, 2)
        }

        prevClick = millisecond;
    }

    console.log(mainAmp);
}

function changeAudioByLetterSpace() {
    //pausa quando há espaço na letter
    mainOsc.amp(0, 2)
    click = true;
}


function stopAudio() {
    ampVol = 0;
    mainAmp = 0
    for (let i = 0; i < osc.length; i++) {
        osc[i].amp(ampVol, 1);
    }

    mainOsc.amp(ampVol, 1)
    mainClick.amp(ampVol, 1);
}

function moreOSC() {

    //more oscillators
    let moreF = [145, 300, 610, 950]
    if (happyEndBool) {
        if (osc.length < 8) {
            for (i = 0; i < 4; i++) {
                append(freq, moreF[i])

                osc[i + freqL] = new p5.Oscillator('sine');
                osc[i + freqL].freq(freq[i + freqL]);
                osc[i + freqL].amp(0);
                osc[i + freqL].start();
            }
        }

        //for clicks 
        changeAudioByLetterSpace()

        for (i = 0; i < 4; i++) {
            if (i < 2)
                osc[i + freqL].amp(0.05, 3);
            else
                osc[i + freqL].amp(0.01, 3);

        }
    }
}

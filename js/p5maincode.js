let capture, capturesize;
let start = false;
let texto, textX, textY, textoFinal, textoFinalDois;
let foco = true
const circleW = 30;
let link, a;
let displayLink = false;
let cleanbackground = true;

let happyEndBool = false

let textMove = 0.2;

function preload() {

    font = loadFont('./Hello Doctor.otf');

}

function setup() {
    canvasCreation();
    capture = createCapture(VIDEO);
    capturesize = canvas.height / 4;


    capture.hide(); // para anular o vídeo que aprarece por default

    textY = 0;
    textX = canvas.height * 1.25;

    setupAudio();
    setupLetter();

}


function draw() {

    // background(0);

    if (!start && termosAceites) {
        fill(220, 47, 47);
        noStroke();
        circle(canvas.width / 2, canvas.height / 2, circleW);
    } else if (termosAceites) {
        if (focused === false)
            foco = false;

        if (foco && !happyEndBool) {
            cleanBack();
            textoRodape();
            workLayout();
            drawLetter();
            drawAudio();
        } else if (!foco && !happyEndBool) {
            //quando a janela deixa de ter foco - 1ª vez que acontece - não reversível
            finalStatement();
            stopAudio();
        }

        if (happyEndBool) {
            happyEnd();
            drawAudio();
        }

    }
}


function canvasCreation() {
    let canvasRespWidth;
    // mudar canvas conforme win size
    if (windowWidth < 768)
        canvasRespWidth = windowWidth / 1.1; // actualiza o tamanho da janela caso se diminua ou aumente
    else if (windowWidth < 992)

        canvasRespWidth = windowWidth / 1.5;
    else if (windowWidth < 1200)
        canvasRespWidth = windowWidth / 1.75;
    else
        canvasRespWidth = windowWidth / 1.75;

    canvas = createCanvas(canvasRespWidth, canvasRespWidth / 2);
    canvas.position(windowWidth / 2 - canvas.width / 2, windowHeight / 2 - canvas.height / 2);


}

function windowResized() {
    // mudar canvas conforme win size
    canvasCreation()
    capturesize = canvas.height / 4;
    foco = false
}

function mousePressed() {
    if (
        !start && mouseX < canvas.width / 2 + circleW && mouseX > canvas.width / 2 - circleW &&
        mouseY < canvas.height / 2 + circleW && mouseY > canvas.height / 2 - circleW) {
        start = true;
        callAPIS(); // no outro doc index.js
    }
}

function textoRodape() {

    //texto da esquerda
    push();
    let angle = radians(-90);
    translate(capturesize - 10, -capturesize);
    rotate(angle);
    textSize(canvas.width / 60);
    textFont("Courier New");
    textAlign(CENTER, CENTER);
    fill(220, 47, 47);
    noStroke();
    text(texto, textX, textY);
    pop();

    //texto da direita 
    push();
    let angle_2 = radians(90);
    translate(canvas.width - capturesize + 10, capturesize);
    rotate(angle_2);
    textSize(canvas.width / 60);
    textFont("Courier New");
    textAlign(CENTER, CENTER);
    fill(220, 47, 47);
    noStroke();
    text(texto, textX + canvas.height, textY);
    pop();

    // decrease text
    textX = textX - textMove;
    //console.log(textWidth(texto)- canvas.height, textWidth(texto), textX);

    // When y reaches the top set it back to the bottom!
    if (textX < -1 * (textWidth(texto) - canvas.height) / 2) {
        textX = canvas.height * 1.25;

    }
}


function cleanBack() {
    if (cleanbackground) {
        background(0)
        cleanbackground = false;
    }

    fill(0)
    noStroke()
    rect(0, 0, capturesize, canvas.height);
    rect(canvas.width - capturesize, 0, capturesize, canvas.height);
}

function workLayout() {
    strokeWeight(4);
    stroke(255);

    image(capture, 0, canvas.height - capturesize, capturesize, capturesize);
    fill(0, 0, 100, 150);
    rect(0, canvas.height - capturesize, capturesize, capturesize);
    noFill();
    rect(0, canvas.height - capturesize, capturesize, capturesize);

    push();
    translate(width, 0);
    scale(-1, 1);
    image(capture, 0, 0, capturesize, capturesize);
    fill(0, 0, 100, 150);
    rect(0, 0, capturesize, capturesize);
    noFill();
    rect(0, 0, capturesize, capturesize);
    pop();

    rect(capturesize, 0, canvas.width - capturesize * 2, canvas.height);
}


function finalStatement() {
    background(220, 47, 47);
    textSize(canvas.width / 50);
    textFont("Courier New");
    textAlign(CENTER, CENTER);
    fill(0);
    noStroke();
    textStyle(BOLD);
    text('the artist is not present. could you be?', canvas.width / 2, canvas.height / 2);

    // link no body 
    let leftLink = windowWidth / 2 + canvas.width / 2 - canvas.width / 70;
    let topLink = windowHeight / 2 + canvas.height / 2 - canvas.width / 35;
    document.getElementById("linkFinal").style.left = `${leftLink}px`;
    document.getElementById("linkFinal").style.top = `${topLink}px`;
    document.getElementById("linkFinal").style.display = `inline`;
    document.getElementById("linkFinal").style.fontSize = `${canvas.width / 70}px`;
}

function happyEnd() {

    background(0);
    textSize(canvas.width / 100);
    textFont("Courier New");
    textAlign(CENTER, CENTER);
    fill(220, 47, 47);
    noStroke();
    textStyle(BOLD);
    text(textoFinal, canvas.width / 2, canvas.height / 2 - canvas.width / 98);
    text(textoFinalDois, canvas.width / 2, canvas.height / 2);


    // link no body 
    let leftLink = windowWidth / 2 + canvas.width / 2 - canvas.width / 70;
    let topLink = windowHeight / 2 + canvas.height / 2 - canvas.width / 35;
    document.getElementById("linkFinal").style.left = `${leftLink}px`;
    document.getElementById("linkFinal").style.top = `${topLink}px`;
    document.getElementById("linkFinal").style.display = `inline`;
    document.getElementById("linkFinal").style.fontSize = `${canvas.width / 70}px`;
}
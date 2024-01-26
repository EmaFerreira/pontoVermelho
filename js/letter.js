let xHeight;
let spacing;

let write = true;

let row, x;

let letterW, letterH;

let marginLeft;

let prevChar = -1;
let xDear = 0;
const dear = ' Dear you,';
let dearChar = 0;

let xBest, xSign;
const best = "Best,";
let bestChar = 0;
const sign = "Who knows";
let signChar = 0;

let prevMillisLetter
let endingMillis;
let timmerWritting = 100;

let filter, filterFreq



function setupLetter() {
	letterW = canvas.width - capturesize;
	background(0);

	marginRight = letterW / 8 + capturesize;
	marginLeft = letterW - letterW / 8;
	marginTop = height / 3;
	margintBottom = height - height / 4;

	row = marginTop;
	x = marginRight;
	xBest = marginLeft - marginLeft / 3;
	xSign = xBest;
	xHeight = height / 40;
	spacing = height / 20;

	textFont(font);
	beginShape();

	prevMillisLetter = millisecond;
}

function drawLetter() {
	if (termosAceites) {
		if (millisecond - prevMillisLetter > timmerWritting) {
			if (xDear < textWidth(dear)) {
				textSize(canvas.width / 30);
				fill(220, 47, 47);
				noStroke();

				if (Math.floor(dearChar) != prevChar) {
					let c = dear.charAt(dearChar);

					text(c, marginRight - marginRight / 4 + xDear, marginTop - marginTop / 4)
					xDear = xDear + textWidth(c);
					prevChar = Math.floor(dearChar);

					if (dear != 0)
						playClickLetter();
				}

				dearChar += 0.2;


			} else {

				if (write) {


					noFill();
					strokeWeight(letterW * 0.0005);
					stroke(220, 47, 47);

					if (!click) {
						let r = random();
						let jitter = randomGaussian(0, 1);
						if (r < 0.48) {
							curveVertex(x, row + 0.2 * xHeight + jitter);
						} else if (r < 0.73) {
							curveVertex(x, row - 0.2 * xHeight + jitter);
						} else if (r < 0.82) {
							curveVertex(x, row + 0.3 * xHeight + jitter);
						} else if (r < 0.96) {
							curveVertex(x, row - 0.5 * xHeight + jitter);
						} else if (r < 0.98) {
							curveVertex(x, row - 1.5 * xHeight + jitter);
						} else {
							curveVertex(x, row + 1.5 * xHeight + jitter);
						}

						xHeight = random((spacing - spacing / 5) * -1, spacing - spacing / 5)
						if (xHeight > (spacing / 10) * -1 && xHeight < (spacing / 10)) {
							x = x + random(letterW / 500 * -1, letterW / 80);
							console.log(xHeight, spacing / 4);
						} else
							x = x + random(letterW / 500 * -1, letterW / 125);


					}

					//audio changes with xHeight
					changeAudioByLetter();
					//console.log(xHeight);

					if (random() < 0.05 && !click) {
						endShape();
						//pausa quando há espaço na letter
						changeAudioByLetterSpace()

						x = x + random(0, letterW / 50);
						xHeight = 0
						beginShape();
					}


					if (x >= marginLeft - random(letterW / 100 * -1, letterW / 40)) {
						if (xHeight < 0)
							xHeight = 0.2

						row = row + xHeight + spacing;
						console.log("end of line");
						x = marginRight + random(letterW / 300 * -1, letterW / 85);

						endShape();
						beginShape();
					}

					endShape();

				} else {
					textSize(canvas.width / 30);
					fill(220, 47, 47);
					noStroke();



					if (xBest < marginLeft - marginLeft / 3 + textWidth(best) - 5) {

						if (Math.floor(bestChar) != prevChar) {
							let c = best.charAt(bestChar);
							text(c, xBest, margintBottom)
							playClickLetter();

							xBest = xBest + textWidth(c);
							prevChar = Math.floor(bestChar);
						}

						bestChar += 0.2;

					} else {
						if (xSign < marginLeft - marginLeft / 3 + textWidth(sign)) {
							if (Math.floor(signChar) !== prevChar) {
								let c = sign.charAt(signChar);
								text(c, xSign, margintBottom + spacing)
								playClickLetter();

								xSign = xSign + textWidth(c);
								prevChar = Math.floor(signChar);
							}
							signChar += 0.2;
							endingMillis = millisecond
						} else {
							if (millisecond - endingMillis > 10000)
								happyEndBool = true;

						}
					}
				}
				if (row >= margintBottom - spacing * 4) {
					console.log("end of text")
					write = false;
				}
			}

			prevMillisLetter = millisecond
		}
	}

}

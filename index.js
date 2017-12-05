/**  
 *@file main.js
 *@author: Albert Tang
 */

// Implement cut
// other shapes
// thickness

let clickX = new Array(),
    clickY = new Array(),
    clickDrag = new Array(),
    clickColors = new Array(),
    paint, canvas, context,
    colorBlue = "#0000FF",
    colorRed = "#FF0000",
    colorGreen = "#00FF00",
    colorBlack = "#000000",
    currColor = colorBlack,
    width = 3,
    screenX, screenY;

const main = () => {
  let canvasDiv = document.getElementById('canvasDiv'),
      buttonsDivHeight = document.getElementById("possibleColors").offsetHeight;
  canvas = document.createElement('canvas');
  canvas.id = "myCanvas";
  canvas.class = "myCanvas";
  canvasDiv.appendChild(canvas);
  context = canvas.getContext("2d");

  window.addEventListener('resize', resizeCanvas, false);
  
  canvas.addEventListener('mousedown', (e) => {
    paint = true;
    addClick(e.clientX, e.clientY - buttonsDivHeight * 2);
    redraw();
  });

  canvas.addEventListener('mousemove', (e) => {
    if(paint) {
      addClick(e.clientX, e.clientY - buttonsDivHeight * 2, true);
      redraw();
    }
  });

  canvas.addEventListener('mouseup', (e) => {
    paint = false;
  });
  canvas.addEventListener('mouseleave', (e) => {
    paint = false;

  });

  canvas.addEventListener("touchstart", (e) => {
		// Mouse down location
		let mouseX = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX),
			mouseY = (e.changedTouches ? e.changedTouches[0].clientY : e.clientY - buttonsDivHeight * 2);
		
		paint = true;
		addClick(mouseX, mouseY, false);
		redraw();
  }, false);
  
	canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();

		let mouseX = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX),
			mouseY = (e.changedTouches ? e.changedTouches[0].clientY : e.clientY - buttonsDivHeight * 2);

		if(paint) {
			addClick(mouseX, mouseY, true);
			redraw();
		}
  }, false);
  
	canvas.addEventListener("touchend", (e) => {
		paint = false;
	  redraw();
  }, false);
  
	canvas.addEventListener("touchcancel", (e) => {
		paint = false;
	}, false);
}

// const changeColorBlack = () => {
//   currColor = colorBlack;
// }

// const changeColorRed = () => {
//   currColor = colorRed;
// }

// const changeColorGreen = () => {
//   currColor = colorGreen;
// }

// const changeColorBlue = () => {
//   currColor = colorBlue;
// }

const changeColor = () => {
  
}

const addClick = (x, y, dragging) => {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColors.push(currColor);
}

const clearScreen = () => {
  clickX = new Array();
  clickY = new Array();
  clickDrag = new Array();
  clickColors = new Array(),
  context.clearRect(0, 0, screenX, screenY); // Clears the canvas
}

const redraw = () => {
  // context.lineJoin = "round";
  context.lineWidth = width;

  for(let i = 0; i < clickX.length; i++) {		
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.strokeStyle = clickColors[i];
     context.stroke();
  }
}

const resizeCanvas = () => {
  screenX = canvasDiv.offsetWidth;
  screenY = canvasDiv.offsetHeight;
  canvas.width = screenX;
  canvas.height = screenY;
  redraw();
}

window.onload = () => {
  main();
}
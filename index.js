/**  
 *@file main.js
 *@author: Albert Tang
 */

// Implement cut
// other shapes
// thickness

// Initialize necessary variables

// Arrays of X and Y coordinates, dragged coordinates, 
// and colors at the coordinates.
let clickX = new Array(),
    clickY = new Array(),
    clickDrag = new Array(),
    clickColors = new Array();

// Toggle of whether or not to paint, and current color
let paint, currColor = "#000000";

// Paint width, current screen size (X and Y)
let width = 3,
    screenX, screenY;

let canvas, context;

const main = () => {

  // Div to put canvas into, and height of the top buttons
  let canvasDiv = document.getElementById('canvasDiv'),
      buttonsDivHeight = document.getElementById("possibleColors").offsetHeight;
      
  //canvas initialization    
  canvas = document.createElement('canvas');
  context = canvas.getContext("2d");
  canvas.id = "myCanvas";
  canvas.class = "myCanvas";
  canvasDiv.appendChild(canvas);

  // Make size of canvas
  resizeCanvas();

  // Event Listeners
  window.addEventListener('resize', resizeCanvas);
  
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

// Function initialization
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

// TODO take from color picker wheel and make that the current color
const changeColor = () => {
  currColor = document.getElementById("output").value;
}

const colorChanger = () => {
  let body = document.getElementById("raphael"),
      input = document.createElement("input");
  
  input.id = "output";
  input.value = "#EEEEEE";
  body.appendChild(input);
}

// Adds click to the array of clicks
const addClick = (x, y, dragging) => {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColors.push(currColor);
}

// Clears the canvas
const clearScreen = () => {
  clickX = new Array();
  clickY = new Array();
  clickDrag = new Array();
  clickColors = new Array(),
  context.clearRect(0, 0, screenX, screenY); 
}

const redraw = () => {
  // context.lineJoin = "round";
  context.lineWidth = width;

  for(let i = 0; i < clickX.length; i++) {		
    context.beginPath();
    if(clickDrag[i] && i) {
      context.moveTo(clickX[i-1], clickY[i-1]);
      } else{
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

Raphael(() => {
  var out = document.getElementById("output"),
  
  // this is where colorwheel created
  cp = Raphael.colorwheel(40, 20, 300, "#eee"),

  clr = Raphael.color("#eee");
  out.onkeyup = function () {
      cp.color(this.value);
  };
  // assigning onchange event handler
  cp.onchange = () => {
      out.value = cp.color().replace(/^#(.)\1(.)\2(.)\3$/, "#$1$2$3");
      out.style.background = clr;
      out.style.color = Raphael.rgb2hsb(clr).b < .5 ? "#fff" : "#000";
  };
  
});
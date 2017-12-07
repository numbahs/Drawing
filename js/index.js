/**  
 *@file main.js
 *@author: Albert Tang
 */

// TODO
// Implement cut
// other shapes

let clickX, clickY, clickDrag, clickColors, 
    widthArray, paint, currColor, width, 
    canvasDiv, buttonsDivHeight, canvas, 
    context, cutCanvas, cutContext, widthInput;

// Clears the canvas
const clearScreen = () => {
  clickX = new Array();
  clickY = new Array();
  clickDrag = new Array();
  clickColors = new Array();
  widthArray = new Array();
  context.clearRect(0, 0, canvas.width, canvas.height); 
}

// Function initialization

// Adds click to the array of clicks
const addClick = (x, y, dragging) => {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColors.push(currColor);
  widthArray.push(width);
}

const cut = () => {
  clearScreen();
}

// Redraws the canvas after every change
const redraw = () => {
  for(let i = 0; i < clickX.length; i++) {		
    context.lineWidth = widthArray[i];
    context.beginPath();
    if(clickDrag[i] && i) {
      context.moveTo(clickX[i-1], clickY[i-1]);
    } else {
      context.moveTo(clickX[i] - 1, clickY[i]);
    }
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.strokeStyle = clickColors[i];
    context.stroke();
  }
}

// resizes the canvas (and cut canvas) to fit on the screen.
const resizeCanvas = () => {
  canvas.width = cutCanvas.width = canvasDiv.offsetWidth;
  canvas.height = cutCanvas.height = canvasDiv.offsetHeight;
  redraw();
}

const paste = () => {
  context.restore();
}

const main = () => {
  // Initialize necessary variables

  // Arrays of X and Y coordinates, dragged coordinates, 
  // and colors at the coordinates, array of widths.
  clickX = new Array(),
  clickY = new Array(),
  clickDrag = new Array(),
  clickColors = new Array();
  widthArray = new Array();

  widthInput = document.getElementById("widthChanger");

  // current color and width
  currColor = "#000000";
  if(!widthInput.value) {
    widthInput.value = 3;
  }
  width = parseInt(widthInput.value, 10) || 3;

  widthInput.addEventListener("change", () => {
    width = parseInt(widthInput.value, 10) || 3;
  });

  // Div to put canvas into, and height of the top buttons
  canvasDiv = document.getElementById('canvasDiv');
  buttonsDivHeight = document.getElementById("options").offsetHeight;
  
  //canvas initialization    
  canvas = document.createElement('canvas');
  context = canvas.getContext("2d");
  cutCanvas = document.createElement('canvas');
  cutContext = cutCanvas.getContext("2d");
  canvas.id = "myCanvas";
  canvas.class = "myCanvas";
  cutCanvas.id = "cutCanvas";
  cutCanvas.class = "cutCanvas";
  canvasDiv.appendChild(canvas);

  // Make size of canvas (otherwise initialized to height = 0 and width = 0)
  resizeCanvas();

  // Event Listeners
  window.addEventListener('resize', resizeCanvas);
  
  canvas.addEventListener('mousedown', (e) => {
    // if(cut) {
    //   cut(e.clientX, e.clientY - buttonsDivHeight);
    // else {
    //   paint = true;
    //   addClick(e.clientX, e.clientY - buttonsDivHeight);
    // }
    paint = true;
    addClick(e.clientX, e.clientY - buttonsDivHeight);
    redraw();
  });

  canvas.addEventListener('mousemove', (e) => {
    // if(cut) {
    //   cut(e.clientX, e.clientY - buttonsDivHeight, true);
    // }
    // else {
    //   addClick(e.clientX, e.clientY - buttonsDivHeight, true);
    //   redraw();
    // }
    if(paint) {
      addClick(e.clientX, e.clientY - buttonsDivHeight, true);
      redraw();
    }
  });

  canvas.addEventListener('mouseup', (e) => {
    paint = false;
    //cut = false;
  });

  canvas.addEventListener('mouseleave', (e) => {
    paint = false;
    //cut = false;
  });

  canvas.addEventListener("touchstart", (e) => {
		// Mouse down location
		let mouseX = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX),
			mouseY = (e.changedTouches ? e.changedTouches[0].clientY : e.clientY - buttonsDivHeight);
    
    //if(!cut) {
      paint = true;
    //}
		addClick(mouseX, mouseY, false);
		redraw();
  }, false);
  
	canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();

		let mouseX = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX),
			  mouseY = (e.changedTouches ? e.changedTouches[0].clientY : e.clientY - buttonsDivHeight);

		if(paint) {
			addClick(mouseX, mouseY, true);
			redraw();
		}
  }, false);
  
	canvas.addEventListener("touchend", (e) => {
    paint = false;
    //cut = false;
	  redraw();
  }, false);
  
	canvas.addEventListener("touchcancel", (e) => {
    paint = false;
    //cut = false;
  }, false);
  
  $("#colorPicker").spectrum({
    color: "#000",
    showInput: true,
    showInitial: true,
    showPalette: true,
    showSelectionPalette: true,
    maxSelectionSize: 10,
    preferredFormat: "hex",
    move: function (color) {
      currColor = color;  
    },

    change: function(color) {
      currColor = color;
    },

    localStorageKey: "spectrum.homepage",

    palette: [
        ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
        "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
        ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", 
        "rgb(255, 255, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)", 
        "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", 
        "rgb(255, 0, 255)"], 
        ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", 
        "rgb(255, 242, 204)", "rgb(217, 234, 211)", "rgb(208, 224, 227)", 
        "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", 
        "rgb(234, 209, 220)", "rgb(221, 126, 107)", "rgb(234, 153, 153)", 
        "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)", 
        "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", 
        "rgb(180, 167, 214)", "rgb(213, 166, 189)", "rgb(204, 65, 37)", 
        "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", 
        "rgb(147, 196, 125)", "rgb(118, 165, 175)", "rgb(109, 158, 235)", 
        "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
        "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", 
        "rgb(241, 194, 50)", "rgb(106, 168, 79)", "rgb(69, 129, 142)", 
        "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", 
        "rgb(166, 77, 121)", "rgb(91, 15, 0)", "rgb(102, 0, 0)", 
        "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)", 
        "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", 
        "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
    ]
});

}

window.onload = () => {
  main();
}
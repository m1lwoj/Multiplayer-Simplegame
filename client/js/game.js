/**************************************************
** GAME VARIABLES
**************************************************/
var canvas,			// Canvas DOM element
	ctx,			// Canvas rendering context
	keys,			// Keyboard input
	localPlayer,	// Local player
	remotePlayer,
	oppX,
	oppY,
	globalId;
	
	var historyX = new Array();
    var historyY = new Array();


/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {
	// Declare the canvas and rendering context
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");

	// Maximise the canvas
//	canvas.width = window.innerWidth;
//	canvas.height = window.innerHeight;

	// Initialise keyboard controls
	keys = new Keys();

	// Calculate a random start position for the local player
	// The minus 5 (half a player size) stops the player being
	// placed right on the egde of the screen
	var startX = Math.round(Math.random()*(canvas.width-5)),
		startY = Math.round(Math.random()*(canvas.height-5));

	// Initialise the local player
	localPlayer = new Player(startX, startY);

	
	// Start listening for events
	setEventHandlers();
	
	 return {
		    startX: startX,
		    startY: startY
		};
};

/**************************************************
** GAME CLOSING
**************************************************/
function closing() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	detachEventHandlers();
	window.cancelAnimationFrame(globalID);
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
	// Keyboard
	window.addEventListener("keydown", onKeydown, false);
	window.addEventListener("keyup", onKeyup, false);
};

var detachEventHandlers = function() {
	// Keyboard
	window.removeEventListener("keydown", onKeydown, false);
	window.removeEventListener("keyup", onKeyup, false);
};

// Keyboard key down
function onKeydown(e) {
	if (localPlayer) {
		keys.onKeyDown(e);
	};
};

// Keyboard key up
function onKeyup(e) {
	if (localPlayer) {
		keys.onKeyUp(e);
	};
};


/**************************************************
** GAME ANIMATION LOOP
**************************************************/
function animate() {
	update();
	drawOpponent(oppX, oppY);

	// Request a new animation frame using Paul Irish's shim
	 globalID = window.requestAnimFrame(animate);
};


/**************************************************
** GAME UPDATE
**************************************************/
function update() {
	localPlayer.update(keys);
};


/**************************************************
** GAME DRAW
**************************************************/
function draw() {
	// WipWe the canvas clean
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw the local player
	localPlayer.draw(ctx);
};

function drawOpponent(x, y) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	    for (var i = 0; i < historyX.length; i++) {
	            ctx.fillStyle="#7f99b2";
	        	ctx.fillRect(historyX[i]-5, historyY[i]-5, 10, 10); 
	    }
	    
	    	
	ctx.fillStyle="#003366";
	ctx.fillRect(x-5, y-5, 10, 10);

	    	// Draw the local player
	localPlayer.draw(ctx);
};
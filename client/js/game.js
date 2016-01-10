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
	oppLastX,
	oppLastY,
	localX,
	localY,
	localLastX,
	localLastY,
	PLAYER_SIZE = 30,
	BOARD_SIZE = 600,
	globalId;
	
	var historyX = new Array();
    var historyY = new Array();

    var board;

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
	draw();

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
	//ctx.clearRect(0, 0, canvas.width, canvas.height);

 	
   	var red_farm = new Image();
  	 red_farm.src = 'img/farm7.jpg';
  	 ctx.globalAlpha = 1;
    ctx.drawImage(red_farm,localLastX - 16, localLastY - 16);
    
	ctx.fillStyle="#003366";
	ctx.fillRect(localX - 15, localY - 15, PLAYER_SIZE, PLAYER_SIZE);
};

function drawOpponent() {
   	var red_farm = new Image();
  	 red_farm.src = 'img/farm5.jpg';
  	 ctx.globalAlpha = 1;
    ctx.drawImage(red_farm,oppLastX - 16, oppLastY - 16);
	 		
	 ctx.globalAlpha = 0.5;
	ctx.fillStyle="#FA2F2F";
 	ctx.fillRect(oppX - 15, oppY - 15, PLAYER_SIZE, PLAYER_SIZE);
};


function slope(a, b) {
    if (a[0] == b[0]) {
        return null;
    }

    return (b[1] - a[1]) / (b[0] - a[0]);
}

function intercept(point, slope) {
    if (slope === null) {
        // vertical line
        return point[0];
    }

    return point[1] - slope * point[0];
}


function findOnBoard (x, y) {
  for (var i = 0; i < board.length; i++) {
    if (board[i].X === x && board[i].Y === y) {
      return board[i];
    }
  }

  return null;
}
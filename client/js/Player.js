/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY) {
    var historyX = new Array();
    var historyY = new Array();
    
	var x = startX,
		y = startY,
		moveAmount = 4;

	var update = function(keys) {
		    var hasMoved = false;
		    if(keys.up || keys.down || keys.left || keys.right) hasMoved = true
		    
			// Up key takes priority over down
			if (keys.up) {
				if(y > 0) y -= moveAmount;
			} else if (keys.down) {
				if(y < canvas.height) y += moveAmount;
			};
	
			// Left key takes priority over right
			if (keys.left) {
				if(x > 0) x -= moveAmount;
			} else if (keys.right) {
				if(x < canvas.width) x += moveAmount;
			};
			
			if(hasMoved === true)
			{
				localLastX = localX;
				localLastY = localY;
				localX = x;
				localY = y;
	    		var socket = io.connect();
	    	 	socket.emit('message', x, y);
			}
	};

	return {
		update: update
	}
};
/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY) {
    var historyX = new Array();
    var historyY = new Array();
    
	var x = startX,
		y = startY,
		moveAmount = 2;

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
    		var socket = io.connect();
    	 	socket.emit('message', x, y);
		
    	 	historyX.push(x);
        	historyY.push(y);
		}
	};

	var draw = function(ctx) {
	    for (var i = 0; i < historyX.length; i++) {
	            ctx.fillStyle="#FF9C9C";
	        	ctx.fillRect(historyX[i]-5, historyY[i]-5, 10, 10); 
	    }
	    
	    ctx.fillStyle="#FA2F2F";
		ctx.fillRect(x-5, y-5, 10, 10);
	};

	return {
		update: update,
		draw: draw
	}
};
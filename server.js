//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);


router.use(express.static(path.resolve(__dirname, 'client')));
var messages = [];
var sockets = [];
var board = [[]];
var points= {};

io.on('connection', function (socket) {
    messages.forEach(function (data) {
     // socket.emit('message', data);
    });

    sockets.push(socket);

    socket.on('disconnect', function () {
      sockets.splice(sockets.indexOf(socket), 1);
      updateRoster();
    });

    socket.on('readiness', function (name, isReady) {
       var data = {
          name: name,
          isReady: isReady
        };

        board.length = 0;
        points = null;
        
        board = [];
        for(var x = 0; x < 1000; x++){
            board[x] = [];    
            for(var y = 0; y < 600; y++){ 
                board[x][y] = null;    
            }    
        }
                
        points.length = 0;
        
         broadcast('readiness', data);
    });

    socket.on('message', function (x, y) {
      if(x === 'start')
      {
        text = x;
        x = -1;
        y = -1;
      }
      else
      {
        var text = String('x: ' + x + ', y: ' + y || ' ' );
      }
      
      if (!text)
        return;

      socket.get('name', function (err, name) {
        var data = {
          name: name,
          x: x,
          y: y,
          text: text
        };

        socket.get('isReady', function (err, isReady) {
          data.isReady = isReady;
        })


        for (var i = x - 15; i <= x + 15; i++) {
        		   	for (var j = y - 15; j <= y + 15; j++) {
                  if(i >= 0 && i <=1000 && j >= 0 && j <= 600)
                  {
                    if(board[i][j] === null || board[i][j] === undefined)
                    {
                        board[i][j]= data.name.name
            
                        if(points[data.name.name] !== undefined)
                        {
                           points[data.name.name] = points[data.name.name] + 1;
                        }
                        else
                        {
                          points[data.name.name] = 0
                        }
                    }
                    else if(board[i][j] !== null && board[i][j] !== undefined && board[i][j] !== data.name.name)
                    {
                        points[data.name.name] = points[data.name.name] - 10;
                    }
                    
                    data.points = points;
                  }
        		   	}
        }
        
        broadcast('message', data);
        // messages.push(data);
      });
    });

    socket.on('identify', function (data) {
      data.name = String(data.name || 'Anonymous');
      socket.set('name', data, function (err) {
        updateRoster();
      });
      socket.set('isReady', data.isReady, function (err) {
        updateRoster();
      });
    });
  });

function updateRoster() {
  async.map(
    sockets,
    function (socket, callback) {
      socket.get('name', callback);
    },
    function (err, names) {
      broadcast('roster', names);
    }
  );
}

function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data);
  });
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});

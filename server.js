var express   = require('express');
var http      = require('http');
var app       = require('express')();
var server    = http.Server(app);

app.use(express.static('client'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

var io = require('socket.io')(server);
// var databaseArray = [];

io.on('connection', function (socket) {
      // for (var i = 0; i < databaseArray.length; i++) {
      //   socket.emit('history', databaseArray[i].message);
      //   databaseArray[i] = allMessages[i].message;
      // }

  socket.on('message', function (msg) {
    io.emit('message', msg);
    // databaseArray.push(msg);
    // databaseArray.shift();
  });
});

server.listen(process.env.PORT || 5000, function(){
  console.log('CHAT SERVER STARTED!!!');
});

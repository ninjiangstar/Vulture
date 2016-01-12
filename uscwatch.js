const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const USCWatch = require('./lib/controller')

var watchList = [["CTAN-452","17895"],["FADN-102","33261"],["GESM-120","35369"]]

function pusher(callback){
  USCWatch.s(watchList,function(c,s,b,r,s){
    if(b) callback(c+"/"+s+" is open ("+r+"/"+s+").")
    else callback(c+"/"+s+" is closed ("+r+"/"+s+").")
  })
}

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/html/index.html')
});

io.on('connection', function(socket){
  console.log('a user connected');

  function timeout() {
    pusher(function(sd){
      io.emit('ret', sd)
    })
    io.emit('ret', Date.now())
  }
  timeout()
  setTimeout(timeout, (1000*10)); // refresh every 10 seconds

});

http.listen(3000)
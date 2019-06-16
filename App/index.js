const express=require('express');
const morgan=require('morgan');
const parser=require('body-parser');
const mongoose =require('mongoose');
const multer = require('multer');
const request = require('request');
const pug = require('pug');
const _ = require('lodash');
const path = require('path');
var http = require('http');
var fs = require('fs');



const stripe = require('stripe')('sk_test_7JdkLmRfrnyE4D0aQSfW1YI100JWLbWKNr');
//let count =0;
const app=express();
const port=8909;
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb+srv://guptajiiiiii:Piyushgupta@cluster0-m9g4a.mongodb.net/Heca-3?retryWrites=true&w=majority" ,{ useNewUrlParser: true },function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log('Altas connected');
  }
});
const user=require('./Routes/user');
const trainer=require('./Routes/trainer');
const details=require('./Routes/details');



// products=require('./routes/products');
app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));

app.use('*',function(req,res,next){
    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Headers','content-type');
     res.set('Access-Control-Allow-Methods','POST,GET,PUT,DELETE,OPTIONS');
    next();
});

var cons = require('consolidate');
// view engine setup
app.engine('html', cons.swig)
app.set('./', path.join(__dirname, './'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('view engine', pug);
app.set('view engine','ejs');



app.use('/user',user);
app.use('/trainer',trainer) ;
app.use('/details',details);
// app.use('/products',products);
// app.use('/orders',orders);

//app.use('/products',products);
//app.get('*',function(req,res,next){
  //  count++;
  //  next();
//});

app.use(express.static(__dirname + '/public'));


// fs.readFile('./index.html', function (err, html) {
//
//     if (err) throw err;
//
//     http.createServer(function(request, response) {
//         response.writeHeader(200, {"Content-Type": "text/html"});
//         response.write(html);
//         response.end();
//     }).listen(PORT);
// });

// function onRequest(request, rsponse){
//   response.writeHead(200, {'Content-Type': 'text/html'});
//   fs.readFile('./login.html', null, function(error, data){
//     if(error){
//       response.writeHead(404);
//       response.writeHead('File not found');
//     }else{
//       response.write(data);
//     }
//     response.end();
//   });
// }



var server = app.listen(port,function(){
      console.log(`server is listening on ${port}`);
});


var socket=require('socket.io');
var io =socket(server);


const rooms=[];





app.get('/paykar', function(req,res){
	res.sendFile('/home/sumant/Desktop/summer/get/Get-Fit-app/App/views/index.html');
});

app.get('/chatiboy', function(req,res){
  console.log("hii");
  //res.sendFile('/home/piyush/Desktop/apna alag se/App/views/index.ejs');
	 res.render('index',{ rooms:rooms})
});



app.get('/success', (req,res) => {
	res.render('success');
});

app.post('/room', (req, res) => {
  if (rooms[req.body.room] != null) {
    return res.redirect('/chatiboy');
  }
  rooms[req.body.room] = { users: {} }
  res.redirect(req.body.room)
  // Send message that new room was created
  io.emit('room-created', req.body.room)
})

app.get('/room', function(req,res) {
  if (rooms[req.params.room] == null) {
    return res.redirect('/chatiboy');
  }
  console.log("pppppppp");
  res.render('room', { roomName: req.params.room })
})


app.post('/charge',(req, res) => {
	const amount = 20000;
    console.log("hii");
	stripe.customers.create({
		email: req.body.stripeEmail,
		source: req.body.stripeToken
	})
	.then(customer => stripe.charges.create({
		amount,
		description: 'Premium fee to stay fit',
		currency: 'USD',
		customer:customer.id
	}))
	.then(charge => res.sendfile('/home/sumant/Desktop/summer/get/Get-Fit-app/App/views/success.html'));
});


io.on('connection', socket => {
  console.log("User connected")
  socket.on('new-user', (room, name) => {

    socket.join(room)
    rooms[room].users[socket.id] = name
    socket.to(room).broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', (room, message) => {
    console.log("s-c-m BACK",room,message)
    io.to(room).emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
  })
  socket.on('disconnect', () => {
    getUserRooms(socket).forEach(room => {
      socket.broadcast.to(room).emit('user-disconnected', rooms[room].users[socket.id])
      delete rooms[room].users[socket.id]
    })
  })
})

function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name)
    return names
  }, [])
}


app.get('/regtrainer.html',function(req,res){
   res.sendFile('/home/sumant/Desktop/summer/get/Get-Fit-app/App/regtrainer.html');
});
app.get('/register.html',function(req,res){
   res.sendFile('/home/sumant/Desktop/summer/get/Get-Fit-app/App/register.html');
});

app.get('/login.html',function(req,res){
   res.sendFile('/home/sumant/Desktop/summer/get/Get-Fit-app/App/login.html');
});
app.get('/logtrainer.html',function(req,res){
   res.sendFile('/home/sumant/Desktop/summer/get/Get-Fit-app/App/logtrainer.html');
});
app.get('/public/classification.html',function(req,res){
   res.sendFile('/home/sumant/Desktop/summer/get/Get-Fit-app/App/public/classification.html');
});
app.get('/log',function(req,res){
   res.sendFile('/home/sumant/Desktop/summer/get/Get-Fit-app/App/public/classification.html');
});

app.get('/det',function(req,res){
   res.sendFile('/home/sumant/Desktop/summer/get/Get-Fit-app/App/detail.html');
});
app.get('/details',function(req,res){
   res.sendFile('/home/sumant/Desktop/summer/get/Get-Fit-app/App/public/result.html');
});




//app.get('/test',function(req,res){
//    res.send("at test endpoint").status(200);
//});
//app.get('/count',function(req,res){
  //  res.send(count.toString()).status(200);
//});

//app.get('/404',function(req,res){
 //   count=count-2;
//});

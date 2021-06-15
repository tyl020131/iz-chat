const express = require('express');
const socket = require('socket.io');
const Text = require('./models/text');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

const dbURI = 'mongodb+srv://tyl99:tyl99@cluster0.des4i.mongodb.net/iz-chat?retryWrites=true&w=majority';
const db = mongoose.connect(dbURI,{useNewUrlParser:true,useCreateIndex = true, useUnifiedTopology:true})
.then((result)=>{
    console.log("Connected To DB");
})
.catch((err)=>{
    console.log(err);
})

// App setup
const app = express();
const server = app.listen(port, function(){
    console.log('listening for requests on port 3000,');
});


// Socket 
const io = socket(server);

  
//Middleware
app.use(express.static('public'));
app.set('view engine','ejs');

//requests
app.get('/',(req,res)=>{
    Text.find()
    .then((result)=>{
        res.render("index",{texts:result,member:"none"});
    })
})
app.get('/:user',(req,res)=>{
    const user = req.params.user;
    Text.find()
    .then((result)=>{
        res.render("index",{texts:result,member:user});
    })
})
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat',(data)=>{
        socket.broadcast.emit('chat',data);
        const text = new Text(data);
        text.save();
    })
    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data);
    })
});
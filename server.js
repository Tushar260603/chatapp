const http=require('http')

const express=require('express')
const port=process.env.port
const cors=require('cors')
const socketIO=require('socket.io')
const app=express();
const server=http.createServer(app);
const path=require('path')


const io=socketIO(server)
const users=[{}]
app.use(cors({
    origin:"http://localhost:3000",
    methods:["GET","POST","PUT","DELETE"],
}))

// app.get('/',(req,resp)=>{
//     // resp.send("HELL ITS WORKING ")
// io.on('connection',(socket)=>{
//     console.log("New Connection")

//     socket.on('joined',({user})=>{
//         users[socket.id]=user;
// console.log(user);
// socket.broadcast.emit('userJoined' ,{user:"Admin",message: users[socket.id]+ " has joined"})
// socket.emit('welcome',{user:"Admin",message:"Welcome to the Chat , "+users[socket.id]})
//     })

// socket.on('message',({message,id})=>{
//     io.emit('sendMessage',{user:users[id],message,id})
// })

//    socket.on('disconnect',function(){
//     socket.broadcast.emit('leave',{user:"Admin",message:users[socket.id]+" has left"})
//     console.log('User Left ')
//    })

   
// })

    
// })

io.on('connection',(socket)=>{
    console.log("New Connection")

    socket.on('joined',({user})=>{
        users[socket.id]=user;
console.log(user);
socket.broadcast.emit('userJoined' ,{user:"Admin",message: users[socket.id]+ " has joined"})
socket.emit('welcome',{user:"Admin",message:"Welcome to the Chat , "+users[socket.id]})
    })

socket.on('message',({message,id})=>{
    io.emit('sendMessage',{user:users[id],message,id})
})

   socket.on('disconnect',function(){
    socket.broadcast.emit('leave',{user:"Admin",message:users[socket.id]+" has left"})
    console.log('User Left ')
   })

   
})


//..static filess

app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"))
})

server.listen(port,()=>{
    console.log('server running on '+port)
})













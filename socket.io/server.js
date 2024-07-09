import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors"
import bodyParser from "body-parser"
import  cookieParser from 'cookie-parser';

const app = express();
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});
app.use(bodyParser.json());
app.use(cookieParser());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

let connectUsers = {}
const getReceiverSocketId = (receiverId)=>{
  return connectUsers[receiverId];
}

io.on("connection", (socket)=>{
    const userId = socket.handshake.query.id
    const loggedIn = new Date().toISOString()
    if(userId){
      console.log(`user with _id ${userId} connected at ${loggedIn}.`)
      connectUsers[userId] = socket.id
    }

    io.emit("connectedUsers", Object.keys(connectUsers))

    socket.on("disconnect", (id)=>{
        const loggedOut = new Date().toISOString()
        console.log(`user disconnected: ${userId} at ${loggedOut}.`)
        console.log(`conextion time ${loggedOut}`)
        delete connectUsers[userId]
        io.emit("connectedUsers", Object.keys(connectUsers))
    })
})

app.post('/test', async (req, res) => {
  try {
    const sentMessage = req.body.sentMessage;
    io.to(getReceiverSocketId(sentMessage.receiverId)).emit("newMessage", sentMessage);
    res.sendStatus(200);
  } catch (error) {
    res.status(500)
  }
});

app.post('/notice', async (req, res) => {
  try {
    const notice = req.body.sentMessage;
    io.to(getReceiverSocketId(notice.receiverId)).emit("notice", notice);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500)
  }
});


server.listen(5000, () => {
  console.log("connected to port 5000.");
});

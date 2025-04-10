import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import adminRouter from "./Routes/Admin.route.js";
import userRouter from "./Routes/User.route.js";
import postRouter from "./Routes/Post.route.js";
import dotenv from "dotenv"
import { connectDB } from "./DB/index.js";
import Stripe from "stripe";
import { createServer } from "http";
import { Server } from "socket.io";


const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "https://mellow-gumdrop-7e81ed.netlify.app",
  },
});

export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

const users = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    users[userId] = socket.id;
    io.emit("userisOnline", { flag: true, id: userId });

  }
  let user;
  socket.on("isUserOnline", (chatId) => {
    if (chatId) {
      user = getReceiverSocketId(chatId);
    }
    if (user) socket.emit("userisOnline", { flag: true, id: chatId });
    else socket.emit("userisOnline", { flag: false, id: chatId });
  });

  socket.on("userisTyping", (chatId) => {
    if (chatId) {
      user = getReceiverSocketId(chatId);

    }

    if (user) {
      socket.to(user).emit("userTyping", { flag: true, userId });
    }
  });



  socket.on("stopTyping", async (chatId) => {
    if (chatId) {
      user = getReceiverSocketId(chatId);

    }

    if (user) {
      socket.to(user).emit("hideTyping", { flag: false, userId });
    }
  });

  socket.on("getDeleteMessageId", ({ messageId }) => {

    socket.emit("sendDeleteMessageId", { messageId });
  });

  socket.on("disconnect", () => {
    delete users[userId];
    io.emit("userisOnline", { flag: false, id: userId });
  });
});

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: 'https://mellow-gumdrop-7e81ed.netlify.app',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use("/api/admin", adminRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

server.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
  connectDB();
});

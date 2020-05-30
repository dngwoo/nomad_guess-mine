import express from "express";
import { join } from "path";
import socketIO from "socket.io";
import logger from "morgan";
import socketController from "./socketController";

const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "view"));
app.use(express.static(join(__dirname, "static")));
app.use(logger("dev"));

const handleListening = () =>
  console.log(`Server running: http://localhost:${PORT}`);

app.get("/", (req, res) => res.render("home"));

const server = app.listen(PORT, handleListening);

const io = socketIO.listen(server);
// socketio에게 서버를 잡고 있으라고 한다.
// http://localhost:4000/socket.io/socket.io.js를 쳐보면 프론트엔드 코드가 나오게 된다.

io.on("connection", (socket) => socketController(socket));
// 서버 파일이 너무 커지지 않게 파일을 하나 더 만들어서 거기에 코딩한다.

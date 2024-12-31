import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.use((socket, next) => {
    const sessionId = socket.handshake.auth.sessionId;

    if (sessionId) {
      socket.sessionId = sessionId;
      socket.userId = sessionId.userId;
      return next();
    }

    socket.sessionId = uuidv4();
    socket.userId = uuidv4();
    next();
  });

  io.on("connection", (socket) => {
    console.log(socket.id);

    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userID: id,
        username: socket.username,
      });
    }

    socket.emit("session", {
      sessionId: socket.sessionId,
      userId: socket.userId,
    });

    socket.emit("users", users);

    socket.broadcast.emit("user connected", {
      userID: socket.id,
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

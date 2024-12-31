"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      console.log(socket.id);

      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    socket.on("users", (users) => {
      setUsers(users);
      users.forEach((user) => {
        console.log(user);
      });
    });

    socket.on("session", ({ sessionId, userId }) => {
      console.log(sessionId, userId);
      socket.auth = { sessionId };
      localStorage.setItem("sessionId", sessionId);
      socket.userId = userId;
    });

    socket.on("user connected", (user) => {
      console.log(user, "User connected");
      setUsers((prev) => [...prev, user]);
    });

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>

      {users.map((user) => {
        return (
          <p key={user.userID} className="">
            {user.userID}
          </p>
        );
      })}
    </div>
  );
}

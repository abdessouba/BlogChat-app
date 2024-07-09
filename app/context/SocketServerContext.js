import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import io from "socket.io-client";
import axios from "axios"
import { useNoticeStore } from "../store/useNotice";

export const ioContext = createContext();

const SocketServerContext = ({ children }) => {
  
  const { data: session, status } = useSession();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [authenticatedUser, setAuthenticatedUser] = useState(null)

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const socketConnection = io("http://192.168.100.4:5000", {
        query: { id: session.user._id },
      });
      setSocket(socketConnection);
      setAuthenticatedUser(session.user)
      socketConnection.on("connectedUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socketConnection.close()
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [status]);

  const {setNotice, notice} = useNoticeStore((state)=>(
    {
      notice: state.notice,
      setNotice: state.setNotice,
    }
  ))

  useEffect(() => {
    socket?.on("notice", (newMessage) => {
      setNotice(newMessage)
    });
    return () => {
      socket?.off();
    };
  }, [socket]);

  const value = {
    onlineUsers,
    socket,
    authenticatedUser,
    notice
  };

  return <ioContext.Provider value={value}>{children}</ioContext.Provider>;
};

export default SocketServerContext;

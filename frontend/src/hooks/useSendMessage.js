import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import useCsrfToken from "./useCsrfToken";
// import useListenMessages from "./useListenMessages";
// import { useSocketContext } from "../context/SocketContext";
// import { useAuthContext } from "../context/AuthContext";

const useSendMessage = () => {
  // const { authUser } = useAuthContext();
  // const { socket } = useSocketContext();
  const [loading, setLoading] = useState(false);
  const { messages, selectedConversation, setMessages } = useConversation();
  const csrfToken = useCsrfToken();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      if (!csrfToken) {
        throw new Error("CSRF token is not available");
      }
      //io.to(receiverSocketId).emit("newMessage", newMessage)
      // socket.to(onlineUsers[selectedConversation._id]).emit("message", message);
      // socket.emit("message", {
      //   reciver: selectedConversation._id,
      //   sender: authUser._id,
      //   message: message,
      // });

      // socket.on("newMessage", (data) => {
      //   console.log(data);
      //   setMessages([...messages, data]);
      // });
      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken, // Include CSRF token in headers
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages([...messages, data]); //这里是为了更新 sender发送者方的信息messages
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;

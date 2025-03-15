import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
// import { useAuthContext } from "../context/AuthContext";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  // const { authUser } = useAuthContext();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]); //这里是为了更新 recevier接受者方的信息messages
    });

    return () => socket?.off("newMessage"); //所以在前端一旦用户下线，在useeffect中的清理函数中就会使用socket?.off("newMessage") 来断开连接
  }, [socket, setMessages, messages]);
  //因为我们把socket这个示例对象当成了整个应用的一种状态数据（将其设置为组件树中的一个context对象数据）
}; //所以一旦发送断开连接，socket依赖数组就会改变，从而触发useeffect执行
export default useListenMessages;

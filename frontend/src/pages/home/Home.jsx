import { useState } from "react";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import GroupMessageContainer from "../../components/group/GroupMessageContainer";
// import { useQuery } from "@tanstack/react-query";
// import { useSocketContext } from "../../context/SocketContext";
// import notificationSound from "../../assets/sounds/notification.mp3";
// import { useEffect, useState } from "react";
const Home = ({ isgroup }) => {
  // const res = useQuery({
  //   queryKey: ["test"],
  //   queryFn: async () => {
  //     try {
  //       const res = await fetch("api");
  //       return res.json();
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   },
  // });
  // console.log(res.data);

  // useEffect(() => {
  //   async function test() {
  //     const res = await fetch("api");
  //     console.log(res);
  //   }
  //   test();
  // }, []);
  //   const { socket } = useSocketContext();
  //   const [iscome, set] = useState(false);
  //   useEffect(() => {
  //     // console.log(onlineUsers);
  //     socket?.on("newMessage", () => {
  //       set(true);
  //       if (iscome) {
  //         const sound = new Audio(notificationSound);
  //         sound.play();
  //       }
  //       // const fromMe = newMessage.senderId === authUser._id;
  //       // newMessage.shouldShake = true;
  //     });
  //     // cleanup function (unmounts)
  //     return () => {
  //       set(false);
  //     };
  //   }, [socket, iscome]);
  const [isgroupContainer, setContainer] = useState(isgroup || false);

  return isgroup ? (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      {/* <Sidebar setres={setContainer} isgroup={false} /> */}
      <Sidebar setres={setContainer} isgroup={true} />
      {isgroupContainer ? <GroupMessageContainer /> : <MessageContainer />}
    </div>
  ) : (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      {/* <Sidebar setres={setContainer} isgroup={false} /> */}
      <Sidebar setres={setContainer} isgroup={false} />
      {isgroupContainer ? <GroupMessageContainer /> : <MessageContainer />}
    </div>
  );
};
export default Home;
// <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//   {/* <Sidebar setres={setContainer} isgroup={false} /> */}
//   <Sidebar setres={setContainer}  />
//   {isgroupContainer ? <GroupMessageContainer /> : <MessageContainer />}
// </div>

import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import { useEffect } from "react";
const Groupconversation = ({ groupinf, emoji, lastIdx }) => {
  const { selectedgroupConversation, setSelectedgroupConversation } =
    useConversation();
  const isSelected = selectedgroupConversation?._id === groupinf._id;

  //消费使用socket对象 context api
  const { socket } = useSocketContext();
  useEffect(() => {
    // let currentgroup;
    if (selectedgroupConversation) {
      socket?.emit("joinRoom", selectedgroupConversation._id);
      // currentgroup = selectedgroupConversation._id;
    }

    return () => {
      socket?.emit("leaveRoom", selectedgroupConversation?._id);
      // setSelectedgroupConversation(null);
    };
  }, [selectedgroupConversation, socket, setSelectedgroupConversation]);

  // <div className="md:min-w-[450px] flex flex-col">
  //     {!selectedConversation ? (
  //       <NoChatSelected />
  //     ) : (
  //       <>
  //         {/* Header */}
  //         <div className="bg-gray-400 px-4 py-2 mb-2">
  //           <span className="label-text">To:</span>
  //           <span className="text-gray-900 font-bold">
  //             {selectedConversation.fullName}
  //           </span>
  //         </div>
  //         <Messages />
  //         <MessageInput />
  //       </>
  //     )}
  //   </div>
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2  cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => {
          setSelectedgroupConversation(groupinf);
        }}
      >
        <div>
          <div className="text-white w-16 rounded-full">群组名：</div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{groupinf.Groupname}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Groupconversation;

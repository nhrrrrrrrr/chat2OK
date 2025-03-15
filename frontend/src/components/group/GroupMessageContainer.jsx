import useConversation from "../../zustand/useConversation";
import { useEffect } from "react";
import { TiMessages } from "react-icons/ti";
import MessageInput from "../messages/MessageInput";
import GroupMessages from "./Groupmessagers";
import { useAuthContext } from "../../context/AuthContext";
const GroupMessageContainer = () => {
  const { selectedgroupConversation, setSelectedgroupConversation } =
    useConversation();
  useEffect(() => {
    // cleanup function (unmounts)
    return () => {
      setSelectedgroupConversation(null);
      // socket?.off("newMessage");
    };
  }, [setSelectedgroupConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedgroupConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-gray-400 px-4 py-2 mb-2">
            {/* <span className="label-text">To:</span> */}
            <span className="text-gray-900 font-bold">
              {selectedgroupConversation.Groupname}
            </span>
            <span className="text-gray-900 font-bold">
              (人数:{selectedgroupConversation.members.length})
            </span>
          </div>
          <GroupMessages />
          <MessageInput type="group" />
        </>
      )}
    </div>
  );
};
const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>群里说点什么吧！</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
export default GroupMessageContainer;

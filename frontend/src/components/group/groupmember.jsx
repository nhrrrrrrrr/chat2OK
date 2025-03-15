import { useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
const Conversationgroup = ({ conversation, lastIdx, setmembers }) => {
  const [isSelected, setIsSelected] = useState(false);
  // const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }
              `}
        onClick={() => {
          setmembers(conversation._id);
          setIsSelected(!isSelected);
          // setmember([...selectedConversation]);
        }}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversationgroup;

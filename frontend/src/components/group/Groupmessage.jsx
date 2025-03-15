import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const GroupMessage = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedGroupConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedGroupConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  // const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}  `}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      {/* <div className={`chat-bubble text-white ${bubbleBgColor}  pb-2`}> */}
      <div
        className={`chat-bubble text-white ${bubbleBgColor} pb-2 w-40 break-words whitespace-pre-line`}
      >
        {message.content}
      </div>
      <div className="chat-footer opacity-50  text-xs flex gap-1 items-center text-white">
        {formattedTime}
      </div>
    </div>
  );
};
export default GroupMessage;

import { useEffect, useRef } from "react";
import useGetGroupMessages from "../../hooks/usegetgroupmsg";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import GroupMessage from "../group/Groupmessage";
import useGroupListenMessages from "../../hooks/useLisentGroupmsgs";

const GroupMessages = () => {
  const { Groupmessages, loading } = useGetGroupMessages();

  useGroupListenMessages();

  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [Groupmessages]);

  return (
    <div className="px-4 flex-1 overflow-auto ">
      {!loading &&
        Groupmessages.length > 0 &&
        Groupmessages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <GroupMessage message={message}></GroupMessage>
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && Groupmessages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default GroupMessages;

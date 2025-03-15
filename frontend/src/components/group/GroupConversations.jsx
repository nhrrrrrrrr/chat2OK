import useGetGroup from "../../hooks/getgroupconversations";
// import { useAuthContext } from "../context/AuthContext";
import { getRandomEmoji } from "../../utils/emojis";
import Groupconversation from "./groupconversation";

const GroupConversations = () => {
  const { loading, conversations } = useGetGroup();

  return !loading ? (
    <div className="py-1 flex flex-col overflow-auto">
      {conversations.map((groupinf, idx) => (
        <Groupconversation
          key={groupinf._id}
          groupinf={groupinf}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
    </div>
  ) : (
    <span className="loading loading-spinner mx-auto">数据加载中...</span>
  );
};

export default GroupConversations;

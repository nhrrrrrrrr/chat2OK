// import UseGetConversations from "../../hooks/useGetConversations";
// import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";
// import useCsrfToken from "../../hooks/useCsrfToken";
// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
import useGetdata from "../../hooks/getconversations";
const Conversations = () => {
  console.log("conversations render");
  const { data: conversations, isSuccess, isLoading } = useGetdata();
  console.log(conversations);
  return (
    <div className="py-1 flex flex-col overflow-auto">
      {isSuccess
        ? conversations.map((conversation, idx) => (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              lastIdx={idx === conversations.length - 1}
            />
          ))
        : null}
      {isLoading ? (
        <span className="loading loading-spinner mx-auto">加载中...</span>
      ) : null}
    </div>
  );
};
export default Conversations;

// STARTER CODE SNIPPET
// import Conversation from "./Conversation";

// const Conversations = () => {
// 	return (
// 		<div className='py-2 flex flex-col overflow-auto'>
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 		</div>
// 	);
// };
// export default Conversations;

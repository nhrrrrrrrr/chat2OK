// import MessageContainer from "../../components/messages/MessageContainer";
import { useState } from "react";
import Create from "./createpage";
// import Grouppage from "../../components/group/grouppage";
// import useGetdata from "../../hooks/getconversations";
import { useQueryClient } from "@tanstack/react-query";
import Home from "./Home";
// import Sidebar from "../../components/sidebar/Sidebar";
// import GroupMessageContainer from "../../components/group/GroupMessageContainer";
// import MessageContainer from "../../components/messages/MessageContainer";
// import toast from "react-hot-toast";
const Group = () => {
  const [iscreate, setcreate] = useState(false);
  const [groupname, setgroupname] = useState("");
  const queryClient = useQueryClient();
  const conversations = queryClient.getQueryData(["conversations"]);

  // const { data: friends } = useGetdata();
  return (
    <>
      {!iscreate && conversations ? (
        <Create
          friends={conversations}
          setcreate={setcreate}
          groupname={groupname}
          setgroupname={setgroupname}
        ></Create>
      ) : (
        <Home isgroup={true} />
        // <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        //   {/* <Sidebar isgroup={true} setres={setContainer} />
        //   {isgroupContainer ? <GroupMessageContainer /> : <MessageContainer />} */}
        //   {/* <Grouppage groupname={groupname}></Grouppage> */}
        // </div>
      )}
    </>
  );
};

export default Group;

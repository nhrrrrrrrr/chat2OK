import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import MemoSearchInput from "./SearchInput";
import { useCallback, useState } from "react";
import GroupConversations from "../group/GroupConversations";
const Sidebar = ({ isgroup, setres }) => {
  const [isGroup, Set] = useState(isgroup);
  console.log("sidebar重新渲染");
  const memeset = useCallback(
    (action) => {
      Set(action);
      setres(action);
    },
    [setres]
  );
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col w-[400px] ">
      {isgroup ? (
        <MemoSearchInput isgroup={isgroup} />
      ) : (
        <MemoSearchInput set={memeset} isgroup={isgroup} />
      )}
      {/* // <MemoSearchInput set={memeset} /> */}
      <div className="divider px-3"></div>
      {isGroup ? <GroupConversations /> : <Conversations />}
      <div className="divider px-3"></div>
      <LogoutButton isGroup={isgroup} />
    </div>
  );
};
export default Sidebar;

// STARTER CODE FOR THIS FILE
// import Conversations from "./Conversations";
// import LogoutButton from "./LogoutButton";
// import SearchInput from "./SearchInput";

// const Sidebar = () => {
// 	return (
// 		<div className='border-r border-slate-500 p-4 flex flex-col'>
// 			<SearchInput />
// 			<div className='divider px-3'></div>
// 			<Conversations />
// 			<LogoutButton />
// 		</div>
// 	);
// };
// export default Sidebar;

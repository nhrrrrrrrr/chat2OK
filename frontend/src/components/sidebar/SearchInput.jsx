import { useState, memo } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
// import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Mygroup from "../group/Mygroup";
import Friends from "./Friends";
// import useGetConversations from "../../hooks/getconversations";
const SearchInput = ({ set, isgroup }) => {
  console.log("searchinput render");
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  // const { data: conversations } = useGetConversations();
  const queryClient = useQueryClient();
  //利用 React Query 的缓存来获取数据
  const conversations = queryClient.getQueryData(["conversations"]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };
  return !isgroup ? (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-center gap-2 ml-[-10px]"
    >
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
      <div className=" w-full flex justify-start items-center ml-[10px]">
        <Friends set={set} />
        <Mygroup set={set} />
      </div>
    </form>
  ) : (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-center gap-2 ml-[-10px]"
    >
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
const MemoSearchInput = memo(SearchInput);
export default MemoSearchInput;

// STARTER CODE SNIPPET
// import { IoSearchSharp } from "react-icons/io5";

// const SearchInput = () => {
// 	return (
// 		<form className='flex items-center gap-2'>
// 			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' />
// 			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
// 				<IoSearchSharp className='w-6 h-6 outline-none' />
// 			</button>
// 		</form>
// 	);
// };
// export default SearchInput;

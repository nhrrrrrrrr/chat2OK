import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import useCsrfToken from "../../hooks/useCsrfToken";
import Conversationgroup from "../../components/group/groupmember";
const Create = ({ setcreate, groupname, setgroupname, friends }) => {
  const { authUser } = useAuthContext();
  const csrfToken = useCsrfToken();
  // useRef(null)
  const [members, setmember] = useState([]);

  const setgroupmember = (member) => {
    setmember((prevMembers) => [...prevMembers, member]);
    // console.dir(typeof member); strings
    // setmember([...members, member]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const groupinf = {
      authUser: authUser._id,
      groupname,
      members,
    };

    try {
      if (!groupname) {
        throw new Error("请输入群聊名称");
      }
      const res = await fetch("/api/auth/creategroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify(groupinf),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      } else {
        setcreate(true);
        setgroupname("");
        setmember([]);
        toast.success("创建群聊成功");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    // <div className="flex flex-col items-center  ">
    //   <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
    //     <div className="flex flex-col items-center justify-center  w-full ">
    //       <h1 className="text-3xl font-semibold  text-gray-300">
    //         <span className="text-blue-500">创建群聊名称：</span>
    //       </h1>
    //       <input
    //         className="input input-bordered h-10 "
    //         value={groupname}
    //         type="text"
    //         placeholder="请输入你的群聊名称..."
    //         onChange={(e) => setgroupname(e.target.value)}
    //       />
    //     </div>
    //     <div className="md:min-w-[450px] flex flex-col overflow-auto">
    //       <h1 className="text-white font-semibold  text-gray-300">
    //         <span className="text-blue-500">选择添加你的群聊好友：</span>
    //       </h1>
    //       {friends.map((conversation) => (
    //         <Conversationgroup
    //           key={conversation._id}
    //           conversation={conversation}
    //           setmembers={setgroupmember}
    //         />
    //       ))}
    //     </div>
    //   </div>
    //   <div className="">
    //     <button className=" btn" onClick={handleSubmit}>
    //       提交确认
    //     </button>
    //   </div>
    // </div>

    <div className="flex flex-wrap  justify-center w-[1200px] sm:h-[850px] md:h-[1000px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <div className="w-[440px] sm:h-[400px] md:h-[500px] flex flex-col items-center justify-center   ">
        <h1 className="text-3xl font-semibold text-gray-300">
          <span className="text-blue-500">创建群聊名称：</span>
        </h1>
        <input
          className="input input-bordered h-10 "
          value={groupname}
          type="text"
          placeholder="请输入你的群聊名称..."
          onChange={(e) => setgroupname(e.target.value)}
        />
      </div>
      <div className="w-[730px] flex flex-col overflow-auto">
        <h1 className="text-white font-semibold  text-gray-300">
          <span className="text-blue-500">选择添加你的群聊好友：</span>
        </h1>
        {friends.map((conversation) => (
          <Conversationgroup
            key={conversation._id}
            conversation={conversation}
            setmembers={setgroupmember}
          />
        ))}
      </div>
      <div className="flex  w-full justify-between items-center ">
        <div>
          <Link to={"/"} className="text-lg text-white ">
            返回
          </Link>
        </div>
        <div className="w-[200px]  ">
          <button className="btn" onClick={handleSubmit}>
            提交确认
          </button>
        </div>
      </div>
    </div>
  );
};
export default Create;

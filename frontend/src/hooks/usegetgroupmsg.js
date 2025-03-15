import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import useCsrfToken from "./useCsrfToken";

const useGetGroupMessages = () => {
  const [loading, setLoading] = useState(false);
  const { Groupmessages, setGroupMessages, selectedgroupConversation } =
    useConversation();
  const csrfToken = useCsrfToken();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        if (!csrfToken) {
          throw new Error("CSRF token is not available");
        }

        const res = await fetch(
          `/api/messages/group/${selectedgroupConversation._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-Token": csrfToken, // Include CSRF token in headers
            },
          }
        );
        const data = await res.json();
        // console.log(typeof data);
        // console.log(data instanceof Array); //这里接受一个包含用户消息信息的数组变量
        if (data.error) throw new Error(data.error);
        setGroupMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedgroupConversation?._id && csrfToken) getMessages();
  }, [selectedgroupConversation?._id, setGroupMessages, csrfToken]);

  return { Groupmessages, loading };
};

export default useGetGroupMessages;

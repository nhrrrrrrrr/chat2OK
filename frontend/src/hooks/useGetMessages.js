import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import useCsrfToken from "./useCsrfToken";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const csrfToken = useCsrfToken();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        if (!csrfToken) {
          throw new Error("CSRF token is not available");
        }

        const res = await fetch(`/api/messages/${selectedConversation._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken, // Include CSRF token in headers
          },
        });
        const data = await res.json();
        console.log(data);
        console.log(data instanceof Array); //这里接受一个包含用户消息信息的数组变量
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id && csrfToken) getMessages();
  }, [selectedConversation?._id, setMessages, csrfToken]);

  return { messages, loading };
};

export default useGetMessages;

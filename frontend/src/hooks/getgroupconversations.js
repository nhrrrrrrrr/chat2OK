import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
const useGetGroup = () => {
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getgroupConversations = async () => {
      setLoading(true);
      try {
        // Fetch the CSRF token
        // const csrfToken = await getCsrfToken();

        // if (!csrfToken) {
        //   throw new Error("Failed to fetch CSRF token");
        // }

        // Fetch the conversations with the CSRF token included in the headers
        const res = await fetch(`/api/users/group`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // "X-CSRF-Token": csrfToken,
          },
        });

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        console.log(data);
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getgroupConversations();
  }, [authUser._id]);

  return { loading, conversations };
};

export default useGetGroup;

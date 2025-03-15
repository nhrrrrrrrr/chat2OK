import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Function to get CSRF token from the server
const getCsrfToken = async () => {
  try {
    const response = await fetch("/api/csrf-token");
    const data = await response.json();
    return data.csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    return null;
  }
};

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        // Fetch the CSRF token
        const csrfToken = await getCsrfToken();
        console.log("csrfToken:", csrfToken);

        if (!csrfToken) {
          throw new Error("Failed to fetch CSRF token");
        }

        // Fetch the conversations with the CSRF token included in the headers
        const res = await fetch("/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        });

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;

// import { useEffect } from "react";
import toast from "react-hot-toast";
import useCsrfToken from "./useCsrfToken";
import { useQuery } from "@tanstack/react-query";
const useGetConversations = () => {
  const csrfToken = useCsrfToken();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        });
        return response.json();
      } catch (error) {
        toast(error.message);
      }
    },
  });
  // console.log(data);

  return { data, isLoading, isSuccess };
};

export default useGetConversations;

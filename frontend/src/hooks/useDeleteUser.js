import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteUser = () => {
    const [loading, setLoading] = useState(false);
    const [deletedConversation, setDeletedConversation] = useState(null);

    const deleteConversation = async (conversationId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/users/${ conversationId }`, {
                method: "DELETE",

            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setDeletedConversation(data);
            toast.success("Conversation deleted successfully!");
            console.log("deleted conversation:", data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, deletedConversation, deleteConversation };
};

export default useDeleteUser;

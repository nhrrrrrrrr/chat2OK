import { create } from "zustand";
const useConversation = create((set) => ({
  selectedConversation: null,
  selectedgroupConversation: null,
  // setSelectedConversation: (selectedConversation) =>
  //   set({ selectedConversation }),
  setSelectedConversation: (selectedConversation) =>
    set(() => ({ selectedConversation: selectedConversation })),
  setSelectedgroupConversation: (selectedgroupConversation) =>
    set(() => ({ selectedgroupConversation: selectedgroupConversation })),
  messages: [],
  Groupmessages: [],
  setMessages: (messages) => set({ messages }),
  setGroupMessages: (Groupmessages) => set({ Groupmessages }),
}));

export default useConversation;

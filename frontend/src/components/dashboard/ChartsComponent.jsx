/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */

import { useSocketContext } from "../../context/SocketContext";
import useDeleteUser from "../../hooks/useDeleteUser";
import useGetConversations from "../../hooks/useGetConversations";
import DataTable from "./Table";

function ChartsComponent() {
  // const { fetchAllUsers, GetUsers, DeleteUser } = useAuth();
  // const { accessToken, user } = useAuth();

  const { loading, conversations } = useGetConversations();
  const { loading: loadingDelete, deleteConversation } = useDeleteUser();

  const { onlineUsers } = useSocketContext();

  const handleDelete = async (row) => {
    console.log("Delete row:", row);
    deleteConversation(row._id);
  };

  const activeUsers = conversations.filter(
    (user) => user.isActive === true
  ).length;
  const inactiveUsers = conversations.filter(
    (user) => user.isActive === false
  ).length;

  const headers = [
    "_id",
    "fullName",
    "username",
    "gender",
    "role",
    "createdAt",
    "updatedAt",
  ];

  return (
    <div className="ml-64 gap-20 mt-20 flex flex-col flex-1 mb-10 text-white">
      {/* <Navbar title="Dashboard">
                <div>
                    <TextInput icon={RiSearchLine} placeholder="Search..." />
                </div>
                <div className="flex gap-3 justify-center items-center">
                    <img className="w-[2rem]" alt="United States" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg" />
                    <span className="text-xl"> English</span>
                </div>
            </Navbar> */}

      <div className="mx-auto w-full flex max-w-screen-xl px-2.5 md:px-20 justify-between  rounded-lg p-20 shadow-lg drop-shadow-5xl">
        <div className="flex gap-5">
          <span className="text-orange-800 text-lg bg-orange-200 flex justify-center items-center p-5 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-users"
            >
              <path d="M17 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M9 21v-2a4 4 0 0 1 3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              <path d="M8 3.13a4 4 0 0 0 0 7.75"></path>
            </svg>
          </span>
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl">{conversations.length}</span>
            <span className="text-medium">Total Users</span>
          </div>
        </div>
        <div className="flex gap-5">
          <span className="text-green-500 bg-green-100 flex items-center justify-center rounded-full p-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-check-circle"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </span>
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl">{onlineUsers.length}</span>
            <span className="text-medium">Online Users</span>
          </div>
        </div>
        <div className="flex gap-5">
          <span className="text-blue-500 bg-blue-100 flex items-center justify-center rounded-full p-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-check-circle"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </span>
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl">{activeUsers}</span>
            <span className="text-medium">Active Users</span>
          </div>
        </div>
        <div className="flex gap-5">
          <span className="text-red-500 bg-red-300 items-center justify-center rounded-full p-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-x-circle"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </span>
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl">{inactiveUsers.length}</span>
            <span className="text-medium">inactiveUsers </span>
          </div>
        </div>
      </div>

      <DataTable
        headers={headers}
        rows={conversations}
        handleDelete={handleDelete}
      />

      <div></div>
    </div>
  );
}

function UserItem({ user }) {
  return (
    <div className="flex justify-around w-full">
      <div className="flex gap-10">
        <span className="text-green-500 bg-green-100 flex items-center justify-center rounded-2xl p-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="feather feather-user"
          >
            <path d="M20.94 21a10 10 0 1 0-16.88 0"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </span>
        <div className="flex flex-col">
          <span>{user._id}</span>
          <span>{user.name}</span>
        </div>
      </div>
      <span className="text-2xl items-center justify-center flex">
        {user.status}
      </span>
    </div>
  );
}

export default ChartsComponent;

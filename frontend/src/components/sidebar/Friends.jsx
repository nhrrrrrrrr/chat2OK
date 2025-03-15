const Friends = ({ set }) => {
  return (
    <div
      className="w-20 text-white cursor-pointer"
      onClick={() => {
        set(false);
      }}
    >
      我的好友
    </div>
  );
};
export default Friends;

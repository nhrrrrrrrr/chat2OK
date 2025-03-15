const Mygroup = ({ set }) => {
  return (
    <div
      className="w-20 text-white cursor-pointer"
      onClick={() => {
        set(true);
      }}
    >
      我的群聊
    </div>
  );
};
export default Mygroup;

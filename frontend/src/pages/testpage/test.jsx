import { useState, memo, useMemo, useCallback } from "react";
// 子组件使用memo记忆化缓存存储
const ChildComponent = memo(function ChildComponent({ object, childfuc }) {
  console.log("ChildComponent rendered");
  return (
    <>
      <div>{object.text}</div>
      <button onClick={childfuc}>点击我</button>
    </>
  );
});

// 父组件
const Text = () => {
  const [count, setCount] = useState(0);

  const memosubmitfun = useCallback(function submitbychild() {
    console.log("我是传递给子组件的函数");
  }, []);
  const memedata = useMemo(() => {
    console.log("useMemo ran");
    return { text: "I am a child component" };
  }, []);
  return (
    <div className="text-red-500">
      <p>Count:{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </button>
      <ChildComponent object={memedata} submitbychild={memosubmitfun} />
    </div>
  );
};

// const Text = () => {
//   const [count, setCount] = useState(0);

//   const memoizedValue = useMemo(() => {
//     return "我是一个子组件";
//   }, []);

//   return (
//     <div className="text-red-500">
//       <p>Count:{count}</p>
//       <p>Memoized Value:{memoizedValue}</p>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//       <ChildComponent text={memoizedValue} />
//     </div>
//   );
// };
// const ChildComponent = ({ text }) => {
//   console.log("子组件渲染了");
//   return <div>{text}</div>;
// };
export default Text;

import { useState } from "react";

/* 
惰性初始化 state
initialState 参数只会在组件的初始化渲染中起作用，后续渲染时会被忽略
如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用
*/
export default function Counter(porps) {
  function getInitialValue() {
    console.log("调用次数");
    return { number: porps.number };
  }

  let [num, setNum] = useState(getInitialValue);

  return (
    <div>
      <p>Number: {num.number}</p>
      <button
        onClick={() => {
          setNum({ number: num.number + 1 });
        }}
      >
        Add
      </button>
    </div>
  );
}

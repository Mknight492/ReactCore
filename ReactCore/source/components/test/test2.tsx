import * as React from "react";

function Test2() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = React.useState(0);
  const [text, setText] = React.useState("");
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <textarea value={text} onChange={e => setText(e.target.value)} />
    </div>
  );
}
export { Test2 };

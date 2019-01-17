import * as React from "react";

function Test3() {
  // Declare a new state variable, which we'll call "count"

  const [text, setText] = React.useState("");

  return (
    <form onSubmit={() => setText("")}>
      <button
        onClick={e => {
          e.preventDefault();
          setText("");
        }}
      >
        Click me
      </button>
      <textarea value={text} onChange={e => setText(e.target.value)} />
    </form>
  );
}
export { Test3 };

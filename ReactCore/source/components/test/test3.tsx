import * as React from "react";
import axios from "axios";

function Test3() {
  // Declare a new state variable, which we'll call "count"

  const [text, setText] = React.useState("");

  return (
    <form onSubmit={() => setText("")}>
      <button
        onClick={e => {
          e.preventDefault();
          setText("");

          axios
            .get("api/Authenticate/CheckUser")
            .then(result => {
              console.log(result);
              return result;
            })
            .catch(error => {
              console.log(error);
            });
        }}
      >
        Click me
      </button>
      <textarea value={text} onChange={e => setText(e.target.value)} />
    </form>
  );
}
export { Test3 };

import * as React from "react";
import * as Autocomplete from "react-autocomplete";
function Test2() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <Autocomplete
        getItemValue={item => item}
        items={[]}
        renderItem={(item, isHighlighted) => (
          <div
            key={item}
            style={
              {
                //background: isHighlighted ? "lightgray" : "white"
              }
            }
            className="typeAheadComponent"
          >
            {item}
          </div>
        )}
        value={"formRow.value"}
        onChange={() => {}}
        onSelect={() => {}}
      />
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
export { Test2 };

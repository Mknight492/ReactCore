import * as React from "react";
import * as Autocomplete from "react-autocomplete";
function Test2() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = React.useState(0);
    return (React.createElement("div", null,
        React.createElement(Autocomplete, { getItemValue: item => item, items: [], renderItem: (item, isHighlighted) => (React.createElement("div", { key: item, style: {
                //background: isHighlighted ? "lightgray" : "white"
                }, className: "typeAheadComponent" }, item)), value: "formRow.value", onChange: () => { }, onSelect: () => { } }),
        React.createElement("p", null,
            "You clicked ",
            count,
            " times"),
        React.createElement("button", { onClick: () => setCount(count + 1) }, "Click me")));
}
export { Test2 };
//# sourceMappingURL=test2.js.map
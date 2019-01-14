import * as React from "react";

export interface HelloProps {
  compiler: string;
  framework: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export const Hello: React.SFC<HelloProps> = props => {
  return (
    <h1>
      Hello from {props.compiler} and {props.framework}!
    </h1>
  );
};

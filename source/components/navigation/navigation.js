import React from "react";

import { Link } from "react-router-dom";
const NavigationComponent = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/weather"> Weather</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigationComponent;

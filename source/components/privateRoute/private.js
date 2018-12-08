import React from "react";
import { Router, Redirect } from "@reach/router";

export const Private = ({ to, redirect }) => (
  <div
    render={() =>
      localStorage.getItem("user") ? (
        <Redirect to={to} />
      ) : (
        <Redirect to={redirect} />
      )
    }
  />
);

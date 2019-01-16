import * as React from "react";

export const HookHelpers = {
  useOutSideClick
};

function useOutSideClick(componentRef, functionToCall) {
  function clickedoutside(e) {
    if (componentRef && componentRef.current) {
      if (
        !componentRef.current.contains(e.target) &&
        e.target.className != "typeAheadComponent"
      ) {
        functionToCall();
      }
    }
  }

  React.useEffect(
    () => {
      document.addEventListener("click", clickedoutside);
      return () => {
        document.removeEventListener("click", e => clickedoutside(e));
      };
    },
    [componentRef]
  );
}

import * as React from "react";
import { takeEvery } from "redux-saga";

export const HookHelpers = {
  useOutSideClick
};

function useOutSideClick(
  active: boolean,
  componentRef: React.MutableRefObject<any>,
  functionToCall: any
);
function useOutSideClick(
  active: boolean,
  componentRef: React.MutableRefObject<any>,
  functionToCall: any,
  secondRef: React.MutableRefObject<any>
);

function useOutSideClick(
  active: boolean,
  componentRef: React.MutableRefObject<any>,
  functionToCall: any,
  secondRef?: React.MutableRefObject<any>
) {
  if (active) {
    let clickedoutside;
    console.log(secondRef);
    if (!secondRef) {
      console.log("here");
      clickedoutside = e => {
        if (componentRef && componentRef.current) {
          console.log(componentRef.current);
          if (
            //!closest(e.target, "typeAheadlistItem") &&
            !componentRef.current.contains(e.target) //||
            //!e.target.className.match("typeAheadlistItem")
          ) {
            functionToCall();
          }
        }
      };
    } else {
      clickedoutside = e => {
        if (
          componentRef &&
          componentRef.current &&
          secondRef &&
          secondRef.current
        ) {
          console.log(componentRef.current);
          console.log(secondRef.current);
          if (
            //!closest(e.target, "typeAheadlistItem") &&
            !componentRef.current.contains(e.target) &&
            !secondRef.current.contains(e.target)
          ) {
            functionToCall();
          }
        }
      };
    }

    document.addEventListener("click", clickedoutside, true);
    return () => {
      document.removeEventListener("click", e => clickedoutside(e), true);
    };
  }
}

function closest(element, className) {
  let ref = element;
  let trav = element;
  if ((trav.className = className)) {
    return true;
  }
  while (trav.parentElement) {
    trav = trav.parentElement;
    if ((trav.className = className)) {
      return true;
    }
  }
  trav = ref;
  return false;
}

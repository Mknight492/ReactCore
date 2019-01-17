import * as React from "react";
import { render, fireEvent } from "react-testing-library";
import { shallow, mount } from "enzyme";
import { create } from "react-test-renderer";

import FriendComponent from "./friendHook";
import { Friend, Locations, WeatherObject } from "models";

import { Root } from "redux/store/configure-store";

import { FriendMock1, weatherMock1 } from "test/mocks";

let component;

//need to setup a googlemaps mock

beforeEach(() => {
  component = mount(
    <Root>
      <FriendComponent Friend={FriendMock1} weatherTest={weatherMock1} />
    </Root>
  );
});

afterEach(() => {
  component.unmount();
});

test("it Renders without crashing", () => {
  expect(component).toBeTruthy();
});

// test("clicking edit make current friend active", () => {
//   let friend = component.find(FriendComponent);
//   console.log(friend)
//   friend.find("button").simulate("click"); //this is simulating the click
//   //this is updating the state equal the friend id but is throwing an error when the friend
//   //form component is mounted
//   component.update();
//   expect(component.find(FriendComponent).prop("isActive")).toBeTruthy();
// });

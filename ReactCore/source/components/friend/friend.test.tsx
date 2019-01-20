import * as React from "react";

//testing libs
import { render, fireEvent } from "react-testing-library";
import { shallow, mount } from "enzyme";
import { create } from "react-test-renderer";

//components
import FriendComponent from "./friendHook";

//redux
import { Root } from "redux/store/configure-store";

//helpers
import { HF } from "helpers";

//models
import { Friend, Locations, WeatherObject } from "models";

//mocks
import { FriendMock1, weatherMock1 } from "test/mocks";

let component;
let friend;

beforeEach(() => {
  component = mount(
    <Root>
      <FriendComponent Friend={FriendMock1} weatherTest={weatherMock1} />
    </Root>
  );
  friend = component.find(FriendComponent);
});

afterEach(() => {
  component.unmount();
});

it("Renders without crashing", () => {
  expect(component).toBeTruthy();
  expect(friend).toBeTruthy();
});

it("renders the users Name", () => {
  expect(component.render().text()).toContain(FriendMock1.Name);
});

it("shows the users Name in the h3 tag", () => {
  let name = component
    .find("h3")
    .render()
    .text();
  expect(name).toEqual(FriendMock1.Name);
});

it("shows the users Location in the h4 tag", () => {
  let location = component
    .find("h4")
    .render()
    .text();
  expect(location).toEqual(HF.formatLocation(FriendMock1.Location));
});

// test("clicking edit make current friend active", () => {
//   let friend = component.find(FriendComponent);
//   friend.find("button").simulate("click"); //this is simulating the click
//   //this is updating the state equal the friend id but is throwing an error when the friend
//   //form component is mounted
//   component.update();
//   expect(component.find(FriendComponent).prop("isActive")).toBeTruthy();
// });

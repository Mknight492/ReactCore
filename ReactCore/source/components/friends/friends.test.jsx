import * as React from "react";
import { render, fireEvent } from "react-testing-library";
import { shallow, mount } from "enzyme";
import { create } from "react-test-renderer";

import FriendsComponent from "components/friends/friendsHook";

import { Friend, Locations, WeatherObject } from "models";

import { TestRoot } from "redux/store/configure-store";

import { FriendMock1, weatherMock1 } from "test/mocks";

let component;

//need to setup a googlemaps mock

beforeEach(() => {
  component = mount(
    <TestRoot initialState={}>
      <FriendsComponent />
    </TestRoot>
  );
});

afterEach(() => {
  component.unmount();
});

test("it Renders without crashing", () => {
  expect(component).toBeTruthy();
});


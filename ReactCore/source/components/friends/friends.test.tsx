import * as React from "react";
import { render, fireEvent } from "react-testing-library";
import { shallow, mount } from "enzyme";
import { create } from "react-test-renderer";

import FriendsComponent from "components/friends/friendsHook";
import FriendComponent from "components/friend/friendHook";
import FriendForm from "components/friendForm/friendFormHook";

import { Friend, Locations, WeatherObject } from "models";

import { TestRoot } from "redux/store/configure-store";

import { FriendsStateMock1 } from "test/mocks";

let component;
beforeEach(() => {
  component = mount(
    <TestRoot
      initialState={{
        friends: { friendsObj: FriendsStateMock1, isActive: -1, Locations: [] }
      }}
    >
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

test("it renders the correct number of friends", () => {
  let numberOfFriends = Object.keys(FriendsStateMock1).length;
  expect(component.find(FriendComponent).length).toEqual(numberOfFriends);
});

test("it renders a single Friend Form", () => {
  expect(component.find(FriendForm).length).toEqual(1);
});

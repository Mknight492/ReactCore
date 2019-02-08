import * as React from "react";
import {
  render,
  fireEvent,
  cleanup,
  RenderResult
} from "react-testing-library";
import { shallow, mount } from "enzyme";
import { create } from "react-test-renderer";

import FriendsComponent from "components/friends/friendsHook";
import FriendComponent from "components/friend/friendHook";
import FriendForm from "components/friendForm/friendFormHook";

import { Friend, Locations, WeatherObject } from "models";

import { TestRoot, SagaTestRoot } from "redux/store/configure-store";

import { FriendsStateMock1 } from "test/mocks";

let utils: RenderResult;
beforeEach(() => {
  (utils as RenderResult) = render(
    <SagaTestRoot
      initialState={{
        friends: { friendsObj: FriendsStateMock1, isActive: -1, Locations: [] }
      }}
    >
      <FriendsComponent />
    </SagaTestRoot>
  );
});

afterEach(() => {
  cleanup();
});

test("it Renders without crashing", () => {
  expect(utils.container).toBeTruthy();
});

test("it renders the correct number of friends", () => {
  let numberOfFriends = Object.keys(FriendsStateMock1).length;
  expect(utils.getAllByTestId("friendComponent").length).toEqual(
    numberOfFriends
  );
});

test("it renders a single Friend Form", () => {
  expect(utils.getAllByTestId("friendFormComponent").length).toEqual(1);
});

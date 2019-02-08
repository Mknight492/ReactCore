import * as React from "react";

//testing libs
import {
  render,
  fireEvent,
  RenderResult,
  cleanup,
  getByText,
  wait
} from "react-testing-library";
import { shallow, mount } from "enzyme";
import { create } from "react-test-renderer";

//components
import FriendComponent from "../friendHook";

//redux
import { Root } from "redux/store/configure-store";

//helpers
import { HF } from "helpers";

//models
import { Friend, Locations, WeatherObject } from "models";

//mocks
import { FriendMock1, weatherMock1 } from "test/mocks";

let utils: RenderResult;
let friend;

beforeEach(() => {
  utils = render(
    <Root>
      <FriendComponent Friend={FriendMock1} weatherTest={weatherMock1} />
    </Root>
  );
});

afterEach(() => {
  cleanup();
});

it("Renders without crashing", () => {
  expect(utils.container).toBeTruthy();
  expect(utils.getAllByTestId("friendComponent").length).toBe(1);
});

it("renders the users Name", () => {
  expect(utils.getByText(FriendMock1.Name)).toBeTruthy();
});

it("shows the users Location in the h4 tag", () => {
  expect(utils.getByText(HF.formatLocation(FriendMock1.Location))).toBeTruthy();
});

test("clicking edit make current friend active", async done => {
  let editButton = utils.getByText(/edit$/i);
  fireEvent.click(editButton);
  await wait(() => utils.getByTestId("friendFormComponent"));
  expect(utils.getByTestId("friendFormComponent")).toBeTruthy();
  done();
});

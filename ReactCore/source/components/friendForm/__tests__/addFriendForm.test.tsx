import * as React from "react";

//testing
import {
  render,
  fireEvent,
  wait,
  cleanup,
  getByText,
  RenderResult,
  waitForElement
} from "react-testing-library";
import userEvent from "user-event";
//components
import { Root, SagaTestRoot, SagaRootKit } from "redux/store/configure-store";
import App from "components/app/app";
import FriendForm from "components/friendForm/friendFormHook";

//mocks
import * as moxios from "moxios";
import {
  ApplicationUserMock1,
  LocationArrayMock1,
  FriendMock1,
  weatherMock1
} from "test/mocks";

//helpers
import { HF } from "helpers";

//models
import { Friend } from "models";

//mocks
import { FriendsStateMock1 } from "test/mocks";

const flushPromises = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 0);
  });
};

let mockLocationInput = "wells";
let mockNameInput = "notMike";

let utils: RenderResult;

beforeEach(() => {
  cleanup();
  moxios.install();
  (utils as RenderResult) = render(
    <SagaTestRoot
      initialState={{
        friends: {
          friendsObj: {},
          isActive: -1,
          Locations: []
        }
      }}
    >
      <div id="outsideClick">
        <FriendForm edit={false} />
      </div>
    </SagaTestRoot>
  );

  moxios.stubRequest(
    `/api/location/get?type=location&query=${mockLocationInput}`,
    {
      status: 200,
      response: LocationArrayMock1
    }
  );
});

afterEach(() => {
  cleanup();
});

it("renders without crashing", async () => {});

it("has name and location fields", () => {
  const nameInput = utils.getByLabelText(/name/i) as HTMLInputElement;
  let locationInput = utils.getByLabelText(/location/i) as HTMLInputElement;
  expect(nameInput).toBeTruthy();
  expect(locationInput).toBeTruthy();
});

it("has name and location fields that accept inputs", async () => {
  const nameInput = utils.getByLabelText(/name/i) as HTMLInputElement;
  let locationInput = utils.getByLabelText(/location/i) as HTMLInputElement;

  fireEvent.change(nameInput, { target: { value: mockNameInput } });
  fireEvent.change(locationInput, { target: { value: "Wellington" } });

  expect(nameInput.value).toBe(mockNameInput);
  expect(locationInput.value).toBe("Wellington");
});

it("will change the value of the location input when selected", () => {});

it("will show an error message if the name field is clicked but nothing is entered", async () => {
  const nameInput = utils.getByLabelText(/name/i) as HTMLInputElement;
  fireEvent.click(nameInput);
  fireEvent.blur(nameInput);
  await wait(() => utils.getByText(/Field is required/i));
  expect(utils.getByText(/Field is required/i)).toBeTruthy();
});

it("will show an error message if the name location field is clicked but nothing is entered", async () => {
  let locationInput = utils.getByLabelText(/location/i) as HTMLInputElement;
  fireEvent.click(locationInput);
  fireEvent.blur(locationInput);
  await wait(() => utils.getByText(/Field is required/i));
  expect(utils.getByText(/Field is required/i)).toBeTruthy();
});

it("will show an error message if location field isn't long enough", async () => {
  let locationInput = utils.getByLabelText(/location/i) as HTMLInputElement;
  fireEvent.click(locationInput);
  fireEvent.change(locationInput, { target: { value: "aa" } });
  await wait(() => utils.getByText(/length must exceed/i));
  expect(utils.getByText(/length must exceed/i)).toBeTruthy();
});

it("won't attempt to add a friend unless the correct values are filled", async () => {
  //find the add button and click it

  let addButton = utils.getByText(/add/i);
  fireEvent.click(addButton);
  await flushPromises();

  //expect the add friend request not to be sent

  expect(moxios.requests.mostRecent().url).not.toMatch(/api\/friend\/add/);

  //find the input labels and input mock data into them
  const nameInput = utils.getByLabelText(/name/i) as HTMLInputElement;
  let locationInput = utils.getByLabelText(/location/i) as HTMLInputElement;
  fireEvent.change(nameInput, { target: { value: mockNameInput } });
  fireEvent.change(locationInput, { target: { value: mockLocationInput } });

  //focus on the nav bar them awaity for the mocked TA data to return
  locationInput.focus();
  await wait(() => utils.getByText(/stream/i));

  //select on of the  elements.
  fireEvent.click(utils.getByText(/stream/i));

  //attempt to add the friend
  fireEvent.click(addButton);

  await wait(() => nameInput.value === "");
  expect(moxios.requests.mostRecent().url).toMatch(/api\/friend\/create/);
  let request = moxios.requests.mostRecent().config;
  expect(request.method).toBe("post");
  expect(JSON.parse(request.data)).toEqual({
    Name: mockNameInput,
    LocationId: LocationArrayMock1[1].Geonameid
  });
});

it("closes the dropdown when something else is clicked", async () => {
  //find the input labels and input mock data into them
  const nameInput = utils.getByLabelText(/name/i) as HTMLInputElement;
  let locationInput = utils.getByLabelText(/location/i) as HTMLInputElement;
  fireEvent.change(nameInput, { target: { value: mockNameInput } });
  fireEvent.change(locationInput, { target: { value: mockLocationInput } });

  //focus on the nav bar them awaity for the mocked TA data to return
  const { container } = utils;
  locationInput.focus();
  const location: HTMLElement = await waitForElement(
    () => utils.getByText(/stream/i),
    { container }
  );

  //click on the friend form container
  const formContainer = utils.getByTestId("friendFormComponent");
  userEvent.click(formContainer);

  //expect the drop down item to have been removed from the dom
  expect(utils.queryByText(/stream/i)).toBeFalsy();
});

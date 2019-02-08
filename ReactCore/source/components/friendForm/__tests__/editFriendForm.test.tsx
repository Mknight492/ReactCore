import * as React from "react";

//testing
import {
  render,
  fireEvent,
  wait,
  cleanup,
  getByText,
  RenderResult
} from "react-testing-library";

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
  weatherMock1,
  FriendMockAsState
} from "test/mocks";

//helpers
import { HF } from "helpers";

//models
import { Friend } from "models";

//mocks
import { FriendsStateMock1 } from "test/mocks";
import { doesNotReject } from "assert";

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
          friendsObj: FriendMockAsState,
          isActive: FriendMock1.Id,
          Locations: []
        }
      }}
    >
      <div id="outsideClick">
        <FriendForm
          edit={true}
          initialWeather={weatherMock1}
          Friend={FriendMock1}
        />
      </div>
    </SagaTestRoot>
  );

  //mock an anti XSS token
  let VerificationToken = document.createElement("input");
  VerificationToken.value = "AB";
  VerificationToken.name = "__RequestVerificationToken";

  utils.container.appendChild(VerificationToken);

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
  moxios.uninstall();
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

it("has an edit button that is active when first loaded and toggles to disabled", async done => {
  const nameInput = utils.getByLabelText(/name/i) as HTMLInputElement;
  let locationInput = utils.getByLabelText(/location/i) as HTMLInputElement;

  //expect the button not the have the --disabled flag
  const editButton = utils.getByText(/edit/i);
  expect(editButton.className).not.toMatch(/disabled/i);

  //remove the name an expect it to become disabled
  fireEvent.change(nameInput, { target: { value: "" } });
  await flushPromises();
  expect(editButton.className).toMatch(/disabled/i);

  //add the name back and expect it to be active
  fireEvent.change(nameInput, { target: { value: mockNameInput } });
  await flushPromises();
  expect(editButton.className).not.toMatch(/disabled/i);

  //remove the location and expect it to be disabled
  fireEvent.change(locationInput, { target: { value: "" } });
  await flushPromises();
  expect(editButton.className).toMatch(/disabled/i);

  //select a location and expect it to be active
  fireEvent.change(locationInput, { target: { value: mockLocationInput } });
  locationInput.focus();
  await flushPromises();
  await wait(() => utils.getByText(/stream/i));

  //select on of the  elements.
  fireEvent.click(utils.getByText(/stream/i));
  expect(editButton.className).not.toMatch(/disabled/i);

  done();
});

it("displays the friends name and Location", async () => {
  const nameInput = utils.getByLabelText(/name/i) as HTMLInputElement;
  let locationInput = utils.getByLabelText(/location/i) as HTMLInputElement;

  expect(nameInput.value).toBe(FriendMock1.Name);
  expect(locationInput.value).toBe(HF.formatLocation(FriendMock1.Location));
});

// it("displays a delete button and implements the correct API call", async done => {
//   const deleteButton = utils.getByText(/delete/i);
//   const { container } = utils;
//   fireEvent.click(deleteButton);

//   const nameInput = utils.getByLabelText(/name/i) as HTMLInputElement;
//   await wait(() => {});
//   console.log(container);
//   await flushPromises();

//   console.log(document.getElementById(`friendFormComponent${FriendMock1.Id}`));
//   moxios.wait(() => {
//     let req = moxios.requests.mostRecent();
//     expect(req.url).toMatch(/api\/friend\/delete/);
//     expect(JSON.parse(req.config.data)).toEqual({
//       id: FriendMock1.Id
//     });
//     done();
//   });
// });

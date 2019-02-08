import * as React from "react";

//testing
import {
  render,
  fireEvent,
  wait,
  cleanup,
  waitForElement
} from "react-testing-library";

//components
import { Root, SagaTestRoot, SagaRootKit } from "redux/store/configure-store";
import App from "components/app/app";

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

const flushPromises = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 0);
  });
};

let LocationValue = "wells";

beforeEach(() => {
  cleanup();
  moxios.install();

  //setup moxis to request user
  moxios.stubRequest("/api/Authenticate/CheckUser", {
    status: 200,
    response: ApplicationUserMock1
  });

  //setup moxios to send a typeAhead Query
  moxios.stubRequest(`/api/location/get?type=location&query=${LocationValue}`, {
    status: 200,
    response: LocationArrayMock1
  });

  //setup moxios to load a friend from the DB
  //this API should be refactored into in own endpoint to make the mocking more specific.

  moxios.stubOnce("GET", "api/friend/getall", {
    status: 200,
    response: [FriendMock1]
  });

  moxios.stubOnce("PUT", "/api/friend/update", {
    status: 200,
    response: [FriendMock1]
  });

  moxios.stubRequest(/http\:\/\/api.openweathermap.org/, {
    status: 200,
    response: weatherMock1
  });
});

it("can add a new Friend", async () => {
  //render the app - put here to place variables in scope
  const { container, getByTestId, getByText, getByLabelText } = render(
    <SagaTestRoot initialState={{}}>
      <App />
    </SagaTestRoot>
  );

  //mock an anti XSS token
  let VerificationToken = document.createElement("input");
  VerificationToken.value = "AB";
  VerificationToken.name = "__RequestVerificationToken";
  container.appendChild(VerificationToken);

  //expect to be on homepage
  expect(window.location.href).toBe("http://localhost/");

  //navigate to the weather page
  //must wait until user is logged in and detected
  await wait(() => getByText(/weather/i));
  fireEvent.click(getByText(/weather/i));
  await flushPromises();

  //check that we are on the weather page
  expect(window.location.href).toBe("http://localhost/weather");

  //wait for the friend component to render find and click on the edit button
  const editButton = await waitForElement(() => getByText(/edit/i), {
    container
  });

  const formatedWeather = HF.formatWeather(weatherMock1, false) as string;

  //NB must wait for the weather to be loaded so it can be passed to the friend form.
  await wait(() => getByText(formatedWeather));
  fireEvent.click(editButton);
  await wait(() => getByText(/confirm edit/i));

  //get the name and location input elements
  const nameInput = getByLabelText(/name/i) as HTMLInputElement;
  let locationInput = getByLabelText(/location/i) as HTMLInputElement;

  //click on name value and change the name input to be "notmike"
  fireEvent.click(nameInput);
  fireEvent.change(nameInput, { target: { value: "notmike" } });

  //add that locationvalue stub into the location TypeAhead
  fireEvent.change(locationInput, { target: { value: LocationValue } });

  //focus on the location TypeAhead so that the dropdown appears
  locationInput.focus();
  await flushPromises();

  //selectthe element that has the corresponding drop down bar.
  await wait(() => getByText(/Wells/i));
  fireEvent.click(getByText(/Wells/i));
  await flushPromises();

  //submit the confirm edit button
  fireEvent.click(getByText(/confirm edit/i));
  await flushPromises();

  let request = JSON.parse(
    moxios.requests.at(moxios.requests.count() - 2).config.data
  );

  expect(request).toEqual({
    Name: "notmike",
    LocationId: 2179530,
    Id: FriendMock1.Id,
    UserId: FriendMock1.UserId,
    Location: LocationArrayMock1[1]
  });
  expect(moxios.requests.at(moxios.requests.count() - 2).config.method).toBe(
    "put"
  );
  //expect(moxios.requests.at(7).url).toMatch("api/friend/getall");

  //await wait(() => {
  //  getByText("mike");
  //   });
  //   expect(locationInput.value).toBeFalsy();
  //   expect(getByTestId(`Friend${FriendMock1.Id}`)).toBeTruthy();
  //expect(moxios.requests.count()).toBe(3);
  //expect(moxios.requests.at(0).url).toMatch("api/friend/create");
  //expect(moxios.requests.at(1).url).toMatch("api/friend/getall");
  //expect(moxios.requests.at(2).url).toMatch(/http\:\/\/api.openweathermap.org/);
});

//RENAME APIS

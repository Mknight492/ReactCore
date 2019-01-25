import * as React from "react";

//testing
import { render, fireEvent, wait, cleanup } from "react-testing-library";

//components
import { Root, SagaTestRoot, SagaRootKit } from "redux/store/configure-store";
import App from "components/app/app";

//mocks
import * as moxios from "moxios";
import {
  ApplicationUserMock1,
  LocationArrayMock1,
  FriendMock1
} from "test/mocks";

import { Simulate } from "react-dom/test-utils";

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
  moxios.stubRequest(`/api/location?type=location&query=${LocationValue}`, {
    status: 200,
    response: LocationArrayMock1
  });

  //setup moxios to load a friend from the DB
  //this API should be refactored into in own endpoint to make the mocking more specific.
  moxios.stubRequest("api/friend", {
    status: 200,
    response: []
  });
});

it("can add a new Friend", async done => {
  const { container, getByTestId, getByText, getByLabelText } = render(
    <SagaTestRoot SagaRootKit={SagaRootKit} initialState={{}}>
      <App />
    </SagaTestRoot>
  );

  //mock an anti XSS token
  let VerificationToken = document.createElement("input");
  VerificationToken.value = "AB";
  VerificationToken.name = "__RequestVerificationToken";
  container.appendChild(VerificationToken);

  expect(window.location.href).toBe("http://localhost/");

  await wait(() => getByText(/weather/i));
  fireEvent.click(getByText(/weather/i));

  expect(window.location.href).toBe("http://localhost/weather");
  await wait(() => getByTestId("friendForm"));

  const nameInput = getByLabelText(/name/i) as HTMLInputElement;
  let locationInput2 = getByLabelText(/location/i) as HTMLInputElement;

  //click on the name input and add the name "mike"
  fireEvent.click(nameInput);
  fireEvent.change(nameInput, { target: { value: "mike" } });

  //add that locationvalue stub into the location TypeAhead
  fireEvent.change(locationInput2, { target: { value: LocationValue } });

  //focus on the location TypeAhead so that the dropdown appears
  locationInput2.focus();

  await flushPromises();

  //selectthe element that has the corresponding drop down bar.
  fireEvent.click(getByText(/Wells/i));

  expect(nameInput.value).toBe("mike");
  expect(moxios.requests.count()).toBe(5);
  expect(moxios.requests.at(0).url).toMatch("/api/Authenticate/CheckUser");
  expect(moxios.requests.at(1).url).toMatch(/http\:\/\/api.openweathermap.org/);
  expect(moxios.requests.at(2).url).toMatch("api/friend");
  expect(moxios.requests.at(3).url).toMatch(
    /api\/location\?type=location&query=/
  );

  moxios.stubRequest("api/friend", {
    status: 200,
    response: [LocationArrayMock1]
  });

  //submit the add friend form
  fireEvent.click(getByText(/^add/i));
  await flushPromises();

  expect(moxios.requests.count()).toBe(9);
  expect(moxios.requests.at(4).url).toMatch(/http\:\/\/api.openweathermap.org/);
  expect(moxios.requests.at(5).url).toMatch(/http\:\/\/api.openweathermap.org/);
  expect(moxios.requests.at(6).url).toMatch(/http\:\/\/api.openweathermap.org/);
  expect(moxios.requests.at(7).url).toMatch("api/friend");

  let request = JSON.parse(moxios.requests.at(7).config.data);
  expect(request).toEqual({
    Name: "mike",
    LocationId: 2179530
  });
  expect(moxios.requests.at(7).config.method).toBe("post");
  expect(moxios.requests.at(8).url).toMatch("api/friend");

  await wait(() => {
    getByText(FriendMock1.Name);
  });

  expect(locationInput2.value).toBeFalsy();
  expect(getByTestId(`Friend${FriendMock1.Id}`)).toBeTruthy();
  done();
});

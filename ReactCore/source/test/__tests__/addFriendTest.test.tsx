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
  moxios.stubRequest(`/api/location/get?type=location&query=${LocationValue}`, {
    status: 200,
    response: LocationArrayMock1
  });

  //setup moxios to load a friend from the DB
  //this API should be refactored into in own endpoint to make the mocking more specific.

  moxios.stubOnce("GET", "api/friend/getall", {
    status: 200,
    response: []
  });

  sessionStorage.setItem(
    "user",
    '{"Id":"b6b62585-3b8c-4b0c-a65e-1b0a17ec8fb8","FirstName":"Michael","LastName":"Knight","Email":"michaelknight492@gmail.com"}'
  );
});

it("can add a new Friend", async () => {
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

  expect(window.location.href).toBe("http://localhost/");

  const weatherLink = await waitForElement(() => getByTestId("weatherLink"));
  fireEvent.click(weatherLink);

  await flushPromises();
  expect(window.location.href).toBe("http://localhost/weather");
  await wait(() => expect(getByTestId("friendFormComponent")).toBeTruthy());

  const nameInput = getByLabelText(/name/i) as HTMLInputElement;
  let locationInput2 = getByLabelText(/location/i) as HTMLInputElement;

  //click on the name input and add the name "mike"
  fireEvent.click(nameInput);
  fireEvent.change(nameInput, { target: { value: "mike" } });

  //add that locationvalue stub into the location TypeAhead
  fireEvent.change(locationInput2, { target: { value: LocationValue } });

  //focus on the location TypeAhead so that the dropdown appears

  locationInput2.focus();

  let WellsTA = await waitForElement(() => getByText(/Wells/i), { container });

  //selectthe element that has the corresponding drop down bar.
  fireEvent.click(WellsTA);
  await flushPromises();
  expect(nameInput.value).toBe("mike");
  expect(moxios.requests.count()).toBe(7);
  expect(moxios.requests.at(0).url).toMatch("/api/Authenticate/CheckUser");
  expect(moxios.requests.at(1).url).toMatch(/api\/location\/random/);
  expect(moxios.requests.at(2).url).toMatch(/api.openweathermap.org/);
  expect(moxios.requests.at(3).url).toMatch("api/friend/getall");
  expect(moxios.requests.at(4).url).toMatch(
    /api\/location\/get\?type=location&query=/
  );
  //need to change the way the weather API is called to reduced unnecessary calls
  expect(moxios.requests.at(5).url).toMatch(/api.openweathermap.org/);
  expect(moxios.requests.at(6).url).toMatch(/api.openweathermap.org/);
  moxios.uninstall();
  moxios.install();
  moxios.stubOnce("GET", "api/friend/getall", {
    status: 200,
    response: [FriendMock1]
  });
  moxios.stubRequest("api/friend/create", {
    status: 200,
    response: []
  });

  //submit the add friend form
  fireEvent.click(getByText(/^add/i));
  await flushPromises();

  let request = JSON.parse(moxios.requests.at(0).config.data);
  expect(request).toEqual({
    Name: "mike",
    LocationId: 2179530
  });
  expect(moxios.requests.at(0).config.method).toBe("post");
  //expect(moxios.requests.at(7).url).toMatch("api/friend/getall");

  await wait(() => {
    getByText(FriendMock1.Name);
  });
  expect(locationInput2.value).toBeFalsy();
  expect(getByTestId(`Friend${FriendMock1.Id}`)).toBeTruthy();
  expect(moxios.requests.count()).toBe(3);
  expect(moxios.requests.at(0).url).toMatch("api/friend/create");
  expect(moxios.requests.at(1).url).toMatch("api/friend/getall");
  expect(moxios.requests.at(2).url).toMatch(/api.openweathermap.org/);
});

//RENAME APIS

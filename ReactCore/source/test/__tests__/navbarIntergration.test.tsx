import * as React from "react";

//testing libs
import { render, fireEvent } from "react-testing-library";
import { shallow, mount } from "enzyme";
import { create } from "react-test-renderer";

//components
import App from "components/app/app";
import Saga from "components/app/saga";
import NavBar from "components/navigation/navigation";

//redux
import { Root, SagaTestRoot, SagaRootKit } from "redux/store/configure-store";

//helpers
import { HF } from "helpers";

//models
import { Friend, Locations, WeatherObject } from "models";

//mocks
import { FriendMock1, weatherMock1, ApplicationUserMock1 } from "test/mocks";
import * as moxios from "moxios";

let component, NavBarComponent;

beforeEach(() => {
  moxios.install();
  moxios.stubRequest("/api/Authenticate/CheckUser", {
    status: 200,
    response: ApplicationUserMock1
  });
  component = mount(
    <SagaTestRoot initialState={{}}>
      <NavBar />
    </SagaTestRoot>
  );
  NavBarComponent = component.find(NavBar);

  sessionStorage.setItem(
    "user",
    '{"Id":"b6b62585-3b8c-4b0c-a65e-1b0a17ec8fb8","FirstName":"Michael","LastName":"Knight","Email":"michaelknight492@gmail.com"}'
  );
});

afterEach(() => {
  component.unmount();
});

it("can fetch a user and display their first name in the navbar", done => {
  //expect it to contain just links initially - hopefully will change with Server side rendering
  expect(NavBarComponent.render().text()).not.toContain(
    ApplicationUserMock1.FirstName
  );

  //then expect it to contain the users first  once network req. fired
  moxios.wait(() => {
    component.update();
    expect(NavBarComponent.render().text()).toContain(
      ApplicationUserMock1.FirstName
    );
    done();
  });
});

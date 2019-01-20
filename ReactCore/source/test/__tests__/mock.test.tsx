import * as React from "react";

//testing libs
import { render, fireEvent } from "react-testing-library";
import { shallow, mount } from "enzyme";
import { create } from "react-test-renderer";

//components
import App from "components/app/app";
import Mockcomponent from "test/__tests__/mock";

//redux
import { Root, SagaTestRoot, SagaRootKit } from "redux/store/configure-store";

//helpers
import { HF } from "helpers";

//models
import { Friend, Locations, WeatherObject } from "models";

//mocks
import { FriendMock1, weatherMock1, ApplicationUserMock1 } from "test/mocks";
import * as moxios from "moxios";

let component;

beforeEach(() => {
  moxios.install();
  moxios.stubRequest("test", {
    status: 200,
    response: "test"
  });

  component = mount(<Mockcomponent />);
});

afterEach(() => {
  component.unmount();
});

it("can fetch a something from a mocked axios request and render it", done => {
  moxios.wait(() => {
    component.update();
    expect(component.render().text()).toEqual("test");
    done();
  });
});

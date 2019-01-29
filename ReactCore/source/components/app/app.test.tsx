import * as React from "react";
import { shallow, mount } from "enzyme";
import { render, fireEvent } from "react-testing-library";
import { create } from "react-test-renderer";
import App from "./app";
import NavBar from "components/navigation/navigation";
import IndexPage from "components/pages/index/index-page";

let component;

beforeEach(() => {
    component = shallow(<App  />);

  window.fetch = jest.fn(async () => {
    return {
      ok: true
    };
  });
});

afterEach(() => {
  component.unmount();
});

// test("it Renders without crashing", () => {
//   const component = render(<App />);
// });

it("shows a Navigation Bar", () => {
  expect(component.find(NavBar).length).toEqual(1);
});

it("shows the index page", () => {
  expect(component.find(IndexPage).length).toEqual(1);
});

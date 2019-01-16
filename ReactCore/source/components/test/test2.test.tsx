import * as React from "react";
import { shallow, mount } from "enzyme";
import { render, fireEvent } from "react-testing-library";
import { create } from "react-test-renderer";
import { Test2 } from "./test2";
import NavBar from "components/navigation/navigation";
import IndexPage from "components/pages/index/index-page";

let component;

beforeEach(() => {
  component = mount(<Test2 />);

  window.fetch = jest.fn(async () => {
    return {
      ok: true
    };
  });
});

afterEach(() => {
  component.unmount();
});

test("it Renders without crashing", () => {});

it("contains a button", () => {
  expect(component.find("button").length).toEqual(1);
});

it("contains a p element", () => {
  expect(component.find("p").length).toEqual(1);
});

it("contains a textarea", () => {
  expect(component.find("textarea").length).toEqual(1);
});

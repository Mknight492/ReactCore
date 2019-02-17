import * as React from "react";
import { shallow, mount } from "enzyme";
import {
  render,
  fireEvent,
  cleanup
} from "react-testing-library";
import { create } from "react-test-renderer";
import { Test2 } from "./test2";
import * as userEvent from "user-events";

/**
 * @jest-environment jsdom
 */

let component;

beforeEach(() => {
  component = mount(<Test2 />);


});

afterEach(() => {
  component.unmount();
  cleanup();
});

test("it Renders without crashing", () => {});

it("contains a button", () => {
  expect(component.find("button").length).toEqual(1);
});

it("contains a p element", () => {
  expect(component.find("p").length).toEqual(1);
});

it("contains a button with the content 'Click me' ", () => {
  const { container } = render(<Test2 />);
  let button = container.getElementsByTagName("button")[0];
  expect(button.textContent).toBe("Click me");
});

it("contains a button which increments the count", () => {
  const { container } = render(<Test2 />);
  let button = container.getElementsByTagName("button")[0];
  let p = container.getElementsByTagName("p")[0];

  expect(p.textContent).toBe("You clicked 0 times");
  fireEvent.click(button);
  expect(p.textContent).toBe("You clicked 1 times");
});

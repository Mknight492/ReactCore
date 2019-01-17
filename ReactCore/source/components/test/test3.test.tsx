import * as React from "react";
import { shallow, mount } from "enzyme";
import {
  render,
  fireEvent,
  cleanup,
  flushEffects
} from "react-testing-library";
import { create } from "react-test-renderer";
import { Test3 } from "./test3";
import * as userEvent from "user-events";

/**
 * @jest-environment jsdom
 */

let component;

beforeEach(() => {
  component = mount(<Test3 />);

  window.fetch = jest.fn(async () => {
    return {
      ok: true
    };
  });
});

afterEach(() => {
  component.unmount();
  cleanup();
});

it("contains a textarea", () => {
  const { container } = render(<Test3 />);
  let textArea = container.getElementsByTagName("textarea")[0];
  expect(textArea).toBeTruthy();
});
it("contains a textarea", () => {
  const { container } = render(<Test3 />);
  let textArea = container.getElementsByTagName("textarea")[0];
  expect(textArea).toBeTruthy();
});

// it("contains a textarea the updates when types into", () => {
//   const { container } = render(<Test3 />);
//   let textArea = container.getElementsByTagName("textarea")[0];
//   fireEvent.click(textArea);
//   fireEvent.keyDown(window, { key: "h", code: 72 });
//   fireEvent.keyPress(window, { key: "h", code: 72 });
//   fireEvent.keyUp(window, { key: "h", code: 72 });
//   flushEffects();
//   expect(textArea.value).toEqual("h");
// });

describe(" the text area", () => {
  beforeEach(() => {
    component.find("textarea").simulate("change", {
      target: { value: "hi" }
    });
    component.update();
  });

  it("contains a textarea the updates when types into", () => {
    expect(component.find("textarea").prop("value")).toEqual("hi");
  });

  it("empties the textarea on click", () => {
    expect(component.find("textarea").prop("value")).toEqual("hi");
    component.find("button").simulate("click");
    component.update();
    expect(component.find("textarea").prop("value")).toEqual("");
  });
});

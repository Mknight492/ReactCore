"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const enzyme_1 = require("enzyme");
const react_testing_library_1 = require("react-testing-library");
const app_1 = require("./app");
const navigation_1 = require("components/navigation/navigation");
const index_page_1 = require("components/pages/index/index-page");
let component;
beforeEach(() => {
    component = enzyme_1.shallow(React.createElement(app_1.default, null));
    window.fetch = jest.fn(async () => {
        return {
            ok: true
        };
    });
});
test("it Renders without crashing", () => {
    const component = react_testing_library_1.render(React.createElement(app_1.default, null));
    component.unmount();
});
it("shows a Navigation Bar", () => {
    expect(component.find(navigation_1.default).length).toEqual(1);
    component.unmount();
});
it("shows the index page", () => {
    expect(component.find(index_page_1.default).length).toEqual(1);
    component.unmount();
});
//# sourceMappingURL=app.test.js.map
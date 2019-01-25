"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const enzyme_1 = require("enzyme");
const app_1 = __importDefault(require("./app"));
const navigation_1 = __importDefault(require("components/navigation/navigation"));
const index_page_1 = __importDefault(require("components/pages/index/index-page"));
let component;
beforeEach(() => {
    component = enzyme_1.shallow(React.createElement(app_1.default, null));
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
    expect(component.find(navigation_1.default).length).toEqual(1);
});
it("shows the index page", () => {
    expect(component.find(index_page_1.default).length).toEqual(1);
});
//# sourceMappingURL=app.test.js.map
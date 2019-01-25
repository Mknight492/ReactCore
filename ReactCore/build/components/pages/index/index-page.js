import * as React from "react";
import { Test2 } from "../../test/test2";
import { Test3 } from "../../test/test3";
import TypeAhead from "components/typeAhead/typeAhead";
import { LocationArrayMock1 } from "test/mocks";
const IndexPage = props => {
    return (React.createElement(React.Fragment, null,
        React.createElement("h2", null, " you shouldn't be here.."),
        React.createElement("h2", null, " you shouldn't be here"),
        React.createElement(Test2, null),
        React.createElement(Test3, null),
        React.createElement(TypeAhead, { suggestions: LocationArrayMock1 })));
};
export default IndexPage;
//# sourceMappingURL=index-page.js.map
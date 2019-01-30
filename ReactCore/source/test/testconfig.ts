import * as Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { GlobalWithFetchMock } from "jest-fetch-mock";

Enzyme.configure({ adapter: new Adapter() });

export interface myGlobal extends GlobalWithFetchMock {
  google: {
    maps: {
      Map: (a) => void;
      Marker: Function;
      SymbolPath: {
        CIRCLE: any;
      };
    };
  };
}

// const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
// customGlobal.fetch = require("jest-fetch-mock");
// customGlobal.fetchMock = customGlobal.fetch;

// (global as myGlobal).fetch = require("jest-fetch-mock");
// (global as myGlobal).fetchMock = global.fetch;
// //declare var global: myGlobal;
//global.window as myWindow;
if (!window.localStorage) {
}
var localStorageMock = (function() {
  var store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key) {
      delete store[key];
    }
  };
})();

// if (navigator.userAgent.includes("jsdom")) {
//   console.log("!!!JSDOM");
// }
// if (navigator.userAgent.includes("Node.js")) {
//   console.log("!!!Node");
// }

(global as myGlobal).google = {
  maps: {
    Map: function(a) {
      //@ts-ignore
      this.a = a;
    },
    Marker: function(a) {
      //@ts-ignore
      this.a = a;
    },
    SymbolPath: {
      CIRCLE: {}
    }
  }
};

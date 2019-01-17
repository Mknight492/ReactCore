import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { any } from "prop-types";
import { AnyARecord } from "dns";

Enzyme.configure({ adapter: new Adapter() });

export interface myGlobal extends NodeJS.Global {
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

//declare var global: myGlobal;
//global.window as myWindow;

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

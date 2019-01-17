import * as React from "react";
import { render, fireEvent } from "react-testing-library";
import { shallow, mount } from "enzyme";
import { create } from "react-test-renderer";

import FriendComponent from "./friendHook";
import { Friend, Locations, WeatherObject } from "models";

import { Root } from "redux/store/configure-store";

let Location: Locations = {
  Admin1Code: "00",
  Admin2Code: null,
  Admin3Code: null,
  Admin4Code: null,
  Alternatenames: "Masterton",
  Asciiname: "Masterton County",
  Cc2: "NZ",
  CountryCode: "NZ",
  Dem: 121,
  Elevation: null,
  FeatureClass: "A",
  FeatureCode: "ADM1H",
  Geonameid: 2187237,
  Latitude: -40.91667,
  Longitude: 175.83333,
  ModificationDate: "2012-07-21T00:00:00",
  Name: "Masterton County",
  Population: 0,
  Timezone: "Pacific/Auckland"
};

let FriendObj: Friend = {
  Id: 143,
  Location: Location,
  LocationId: 2187237,
  Name: "me",
  UserId: "811be611-e47f-4117-8f61-4e1781cd6617"
};

let weather: WeatherObject = {
  base: "stations",
  clouds: { all: 12 },
  cod: 200,
  coord: { lon: 175.67, lat: -40.95 },
  dt: 1547685926,
  id: 2187238,
  main: {
    grnd_level: 989.63,
    humidity: 93,
    pressure: 989.63,
    sea_level: 1021.7,
    temp: 22.01,
    temp_max: 22.01,
    temp_min: 22.01
  },
  name: "Masterton District",
  sys: {
    message: 0.0171,
    country: "NZ",
    sunrise: 1547658281,
    sunset: 1547711348
  },
  weather: [
    { id: 801, main: "Clouds", description: "few clouds", icon: "02d" }
  ],
  wind: { speed: 0.62, deg: 233.5 }
};

let component;

//need to setup a googlemaps mock

beforeEach(() => {
  component = mount(
    <Root>
      <FriendComponent Friend={FriendObj} weatherTest={weather} />
    </Root>
  );
});

afterEach(() => {
  component.unmount();
});

test("it Renders without crashing", () => {
  expect(component).toBeTruthy();
});

// test("clicking edit make current friend active", () => {
//   let friend = component.find(FriendComponent);
//   console.log(friend)
//   friend.find("button").simulate("click"); //this is simulating the click
//   //this is updating the state equal the friend id but is throwing an error when the friend
//   //form component is mounted
//   component.update();
//   expect(component.find(FriendComponent).prop("isActive")).toBeTruthy();
// });

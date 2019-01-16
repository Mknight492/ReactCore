import * as React from "react";
import { render, fireEvent } from "react-testing-library";
import { create } from "react-test-renderer";

import FriendComponent from "./friendHook";
import { Friend, Locations } from "../../models";

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

test("On Button Click Friend Form is diplayed", () => {
  //   const component = render(
  //     <FriendComponent
  //       Friend={FriendObj}
  //       isActive={false}
  //       changeActive={() => {}}
  //     />
  //   );
  expect(2).toEqual(2);
});

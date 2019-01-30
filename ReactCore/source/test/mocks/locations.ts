import { Locations, Friend } from "models";

export const LocationMock1: Locations = {
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

export const LocationMock2: Locations = {
  Admin1Code: "00",
  Admin2Code: null,
  Admin3Code: null,
  Admin4Code: null,
  Alternatenames: "West Branch",
  Asciiname: "West Branch Charwell River",
  Cc2: "NZ",
  CountryCode: "NZ",
  Dem: 452,
  Elevation: null,
  FeatureClass: "H",
  FeatureCode: "STM",
  Geonameid: 2179508,
  Latitude: -42.41667,
  Longitude: 173.36667,
  ModificationDate: "1993-12-30T00:00:00",
  Name: "West Branch Charwell River",
  Population: 0,
  Timezone: "Pacific/Auckland"
};

export const LocationMock3: Locations = {
  Admin1Code: "00",
  Admin2Code: null,
  Admin3Code: null,
  Admin4Code: null,
  Alternatenames: null,
  Asciiname: "Wellshot Stream",
  Cc2: null,
  CountryCode: "NZ",
  Dem: 323,
  Elevation: null,
  FeatureClass: "H",
  FeatureCode: "STM",
  Geonameid: 2179530,
  Latitude: -44.08333,
  Longitude: 170.81667,
  ModificationDate: "1993-12-30T00:00:00",
  Name: "Wellshot Stream",
  Population: 0,
  Timezone: "Pacific/Auckland"
};

export const LocationArrayMock1: Locations[] = [LocationMock2, LocationMock3];

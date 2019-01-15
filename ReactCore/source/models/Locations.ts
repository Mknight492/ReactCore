export interface Locations {
  Geonameid: number;
  Name: string;
  Asciiname: string;
  Alternatenames: string;
  Latitude: number;
  Longitude: number;
  FeatureClass: string;
  FeatureCode: string;
  CountryCode: string;
  Cc2: string;
  Admin1Code: string;
  Admin2Code: string;
  Admin3Code: string;
  Admin4Code: string;
  Population: number | null;
  Elevation: number | null;
  Dem: number | null;
  Timezone: string;
  ModificationDate: Date | string | null;
}

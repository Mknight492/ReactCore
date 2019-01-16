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
  Admin1Code?: string | null;
  Admin2Code?: string | null;
  Admin3Code?: string | null;
  Admin4Code?: string | null;
  Population: number | null;
  Elevation: number | null;
  Dem: number | null;
  Timezone: string;
  ModificationDate: Date | string | null;
}

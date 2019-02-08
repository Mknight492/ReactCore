import { Locations, Friend, WeatherObject, FriendsObj } from "models";

import { LocationMock1 } from "./locations";

export const FriendMock1: Friend = {
  Id: 143,
  Location: LocationMock1,
  LocationId: 2187237,
  Name: "mike",
  UserId: "811be611-e47f-4117-8f61-4e1781cd6617"
};

export const FriendMockAsState: FriendsObj = {
  143: {
    Id: 143,
    Location: {
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
    },

    LocationId: 2187237,
    Name: "me1",
    UserId: "811be611-e47f-4117-8f61-4e1781cd6617"
  }
};

export const FriendsStateMock1: FriendsObj = {
  143: {
    Id: 143,
    Location: {
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
    },

    LocationId: 2187237,
    Name: "me1",
    UserId: "811be611-e47f-4117-8f61-4e1781cd6617"
  },
  145: {
    Id: 145,

    Location: {
      Admin1Code: "G2",
      Admin2Code: "047",
      Admin3Code: null,
      Admin4Code: null,
      Alternatenames:
        "Gorad Velingtan,Hie-ling-dong,Hiê-lìng-dóng,Ouellin'nkton,Ouellinkton,Te Whanga-nui-a-Tara,Ueligitone,Uelingtun,Velington,Velingtona,Velingtonas,Velingtono,Vellington,Vellingtonia,Vellinqton,WLG,Welinton,Welintòn,Wellington,Wellinton,Weolingtun,Weolingtūn,Whanga-nui-a-Tara,hui ling dun,oyelintana,raelintana,uelingtʼoni,u~erinton,vailigatana,velingatana,velingtana,velingtoni,velintan,vellingtan,wei ling dun,wellingtan,wellingteon,wlyngtwn,wylynghtwn,wylynjtwn,Ουέλλιγκτον,Ουέλλινγκτον,Велингтон,Веллингтон,Веллінгтон,Горад Велінгтан,Уелингтън,Վելինգտոն,ולינגטון,װעלינגטאן,ولینگتون,ويلينجتون,ويلينغتون,ویلنگٹن,ۋېللىنگتون,वेलिंगटन,वेलिंग्टन,वेलिङ्गटन,ওয়েলিংটন,ৱেলিংটন,ਵੈਲਿੰਗਟਨ,વેલિંગ્ટન,வெலிங்டன்,ವೆಲ್ಲಿಂಗ್ಟನ್,വെല്ലിംഗ്ടൺ,เวลลิงตัน,ཝེ་ལིང་ཐོན།,ဝယ်လင်တန်မြို့,ველინგთონი,უელინგტონი,ዌሊንግተን,ウェリントン,威靈頓,惠灵顿,웰링턴",
      Asciiname: "Wellington",
      Cc2: null,
      CountryCode: "NZ",
      Dem: 31,
      Elevation: null,
      FeatureClass: "P",
      FeatureCode: "PPLC",
      Geonameid: 2179537,
      Latitude: -41.28664,
      Longitude: 174.77557,
      ModificationDate: "2011-08-01T00:00:00",
      Name: "Wellington",
      Population: 381900,
      Timezone: "Pacific/Auckland"
    },
    LocationId: 2179537,
    Name: "vicki..",
    UserId: "811be611-e47f-4117-8f61-4e1781cd6617"
  },
  147: {
    Id: 147,
    Location: {
      Admin1Code: "F3",
      Admin2Code: null,
      Admin3Code: null,
      Admin4Code: null,
      Alternatenames:
        "Dannevirke pa New Zealand,Dannevirke på New Zealand,Tamaki-nui-a-Rua,Tāmaki-nui-a-Rua",
      Asciiname: "Dannevirke",
      Cc2: null,
      CountryCode: "NZ",
      Dem: 212,
      Elevation: null,
      FeatureClass: "P",
      FeatureCode: "PPL",
      Geonameid: 6246205,
      Latitude: -40.20549,
      Longitude: 176.10084,
      ModificationDate: "2015-03-09T00:00:00",
      Name: "Dannevirke",
      Population: 0,
      Timezone: "Pacific/Auckland"
    },
    LocationId: 6246205,
    Name: "me",
    UserId: "811be611-e47f-4117-8f61-4e1781cd6617"
  }
};

import { HF } from "helpers";
import { Locations } from "models";

export const locationHelpers = {
  uniqueTAValues,
  uniqueLocationsList
};

function uniqueTAValues(TAArray, limit = 10) {
  return TAArray.reduce((acc, curr, i, arr) => {
    let formatedValue = HF.formatLocation(curr);
    if (!acc.includes(formatedValue) && acc.length < limit) {
      return [...acc, formatedValue];
    }
    return acc;
  }, []);
}

//allows the array to be filtered in O(n) time
function uniqueLocationsList(LocationsArray: Locations[], limit: number = 10) {
  let UniqueArray: Locations[] = [];
  let FormatedLocationSet = new Set();
  for (let location of LocationsArray) {
    if (UniqueArray.length >= limit) {
      break;
    }
    let formatedLocation = HF.formatLocation(location);
    if (!FormatedLocationSet.has(formatedLocation)) {
      UniqueArray.push(location);
      FormatedLocationSet.add(HF.formatLocation(location));
    }
  }
  return UniqueArray;
}

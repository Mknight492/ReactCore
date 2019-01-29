import { HF } from "helpers";

export const locationHelpers = {
  uniqueTAValues
};

function uniqueTAValues(TAArray, limit = 5) {
  return TAArray.reduce((acc, curr, i, arr) => {
    let formatedValue = HF.formatLocation(curr);
    if (!acc.includes(formatedValue) && acc.length < limit) {
      return [...acc, formatedValue];
    }
    return acc;
  }, []);
}

//helper function

export const helperFunctions = {
  isNullOrWhiteSpace
};

function isNullOrWhiteSpace(input) {
  if (typeof input === "undefined" || input == null) return true;

  return input.replace(/\s/g, "").length < 1;
}

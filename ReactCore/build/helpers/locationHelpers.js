"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
exports.locationHelpers = {
    uniqueTAValues
};
function uniqueTAValues(TAArray, limit = 5) {
    return TAArray.reduce((acc, curr, i, arr) => {
        let formatedValue = index_1.HF.formatLocation(curr);
        if (!acc.includes(formatedValue) && acc.length < limit) {
            return [...acc, formatedValue];
        }
        return acc;
    }, []);
}
//# sourceMappingURL=locationHelpers.js.map
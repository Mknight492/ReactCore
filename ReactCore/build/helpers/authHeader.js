"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authHeader() {
    // return authorization header with jwt token
    let userString = localStorage.getItem("user");
    let user;
    if (userString) {
        user = JSON.parse(userString);
    }
    if (user && user.token) {
        return { Authorization: "Bearer " + user.token };
    }
    else {
        return { Authorization: "" };
    }
}
exports.authHeader = authHeader;
//# sourceMappingURL=authHeader.js.map
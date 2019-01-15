"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
        return { Authorization: "Bearer " + user.token };
    }
    else {
        return {};
    }
}
exports.authHeader = authHeader;
//# sourceMappingURL=authHeader.js.map
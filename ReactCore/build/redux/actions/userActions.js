"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../constants/index");
const index_2 = require("../services/index");
const index_3 = require("./index");
exports.userActions = {
    //login,
    logout,
    register,
    getAll,
    delete: _delete,
    getUserRequest,
    getUserFailure,
    getUserSuccess
};
function getUserRequest() {
    return {
        type: index_1.userConstants.GET_USER_REQUEST
    };
}
function getUserFailure() {
    return {
        type: index_1.userConstants.GET_USER_FAILURE
    };
}
function getUserSuccess(user) {
    console.log(user);
    return {
        type: index_1.userConstants.GET_USER_SUCCESS,
        payload: user
    };
}
/*
function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      user => {
        dispatch(success(user));
        history.push("/");
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };*/
function request(user) {
    return { type: index_1.userConstants.LOGIN_REQUEST, user };
}
function success(user) {
    return { type: index_1.userConstants.LOGIN_SUCCESS, user };
}
function failure(error) {
    return { type: index_1.userConstants.LOGIN_FAILURE, error };
}
function logout() {
    index_2.userService.logout();
    return { type: index_1.userConstants.LOGOUT };
}
function register(user) {
    return dispatch => {
        dispatch(request(user));
        index_2.userService.register(user).then(user => {
            dispatch(success(user));
            //history.push("/login");
            dispatch(index_3.alertActions.success("Registration successful"));
        }, error => {
            dispatch(failure(error));
            dispatch(index_3.alertActions.error(error));
        });
    };
    function request(user) {
        return { type: index_1.userConstants.REGISTER_REQUEST, user };
    }
    function success(user) {
        return { type: index_1.userConstants.REGISTER_SUCCESS, user };
    }
    function failure(error) {
        return { type: index_1.userConstants.REGISTER_FAILURE, error };
    }
}
function getAll() {
    return dispatch => {
        dispatch(request());
        index_2.userService.getAll().then(users => dispatch(success(users)), error => {
            dispatch(failure(error));
            dispatch(index_3.alertActions.error(error));
        });
    };
    function request() {
        return { type: index_1.userConstants.GETALL_REQUEST };
    }
    function success(users) {
        return { type: index_1.userConstants.GETALL_SUCCESS, users };
    }
    function failure(error) {
        return { type: index_1.userConstants.GETALL_FAILURE, error };
    }
}
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));
        index_2.userService.delete(id).then(user => {
            dispatch(success(id));
        }, error => {
            dispatch(failure(id, error));
        });
    };
    function request(id) {
        return { type: index_1.userConstants.DELETE_REQUEST, id };
    }
    function success(id) {
        return { type: index_1.userConstants.DELETE_SUCCESS, id };
    }
    function failure(id, error) {
        return { type: index_1.userConstants.DELETE_FAILURE, id, error };
    }
}
//# sourceMappingURL=userActions.js.map
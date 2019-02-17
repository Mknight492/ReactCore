import * as React from "react";

//testin framework
import { render, fireEvent } from "react-testing-library";
import { shallow, mount } from "enzyme";
import { create } from "react-test-renderer";

//models
import { ApplicationUserDto, userState } from "models";

//mocks

import { UserReducerInitalStateMock, ApplicationUserMock1 } from "test/mocks";
//redux
import { Root } from "redux/store/configure-store";
import userReducer from "redux/reducers/usersReducer";
import { userConstants } from "redux/constants";

it("handles actions with unknown type", () => {
  const initialState = UserReducerInitalStateMock;

  const newState = userReducer(initialState, {});

  expect(newState).toEqual(initialState);
});

it(`handles actions of type ${userConstants.GET_USER_REQUEST}`, () => {
  const initialState = UserReducerInitalStateMock;

  const action = {
    type: userConstants.GET_USER_REQUEST
  };
  const newState = userReducer(initialState, action);

  const expectedState = { ...initialState, loading: true };

  expect(newState).toEqual(expectedState);
});

it(`handles actions of type ${userConstants.GET_USER_SUCCESS}`, () => {
  const initialState = UserReducerInitalStateMock;

  const action = {
    type: userConstants.GET_USER_SUCCESS,
    payload: ApplicationUserMock1
  };
  const newState = userReducer(initialState, action);

  const expectedState = {
    ...initialState,
    LoggedIn: true,
    user: ApplicationUserMock1
    };
    expect(ApplicationUserMock1).toBeTruthy();
  expect(newState).toEqual(expectedState);
});

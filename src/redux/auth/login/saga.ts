import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { AuthLoginActionTypes } from "./types";
import {
  authLoginApiResponseSuccess,
  authLoginApiResponseError,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getFirebaseBackend,
  setLoggeedInUser,
} from "../../../helpers/firebase_helper";

import axios from "axios";
const apiUrl = 'http://localhost:3001/auth/login';

const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user } }: any) {
  try {
    const response: Promise<any> = yield call(axios.post, apiUrl, {
      username: user.email,
      password: user.password,
    });

    setLoggeedInUser(response);
    yield put(
      authLoginApiResponseSuccess(AuthLoginActionTypes.LOGIN_USER, response)
    );
  } catch (error: any) {
    yield put(
      authLoginApiResponseError(AuthLoginActionTypes.LOGIN_USER, error)
    );
  }
}


function* logoutUser() {
  try {
    localStorage.removeItem("authUser");
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response: Promise<any> = yield call(fireBaseBackend.logout);
      yield put(
        authLoginApiResponseSuccess(AuthLoginActionTypes.LOGOUT_USER, response)
      );
    } else {
      yield put(
        authLoginApiResponseSuccess(AuthLoginActionTypes.LOGOUT_USER, true)
      );
    }
  } catch (error: any) {
    yield put(
      authLoginApiResponseError(AuthLoginActionTypes.LOGOUT_USER, error)
    );
  }
}

function* loginSaga() {
  yield takeEvery(AuthLoginActionTypes.LOGIN_USER, loginUser);
  yield takeEvery(AuthLoginActionTypes.LOGOUT_USER, logoutUser);
}

export default loginSaga;

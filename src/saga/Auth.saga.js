import { call, put, takeEvery, all } from 'redux-saga/effects'

function* Signup(action) {

   try {
      const user = yield call(SignUpapi, action.payload);
    //   yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
    //   yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

function* watchSignUp() {
  yield takeEvery(ActionType.SIGN_UP, Signup);
}

export function* signUpSaga() {
    yield all([
        watchSignUp
    ])
}
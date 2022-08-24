import { call, put, takeEvery, all } from 'redux-saga/effects'
import * as ActionType from '../redux/ActionType';
import { SignInapi, SignUpapi } from '../common/api/Auth.api';

function* Signup(action) {

   try {
      const user = yield call(SignUpapi, action.payload);
    //   yield put({type: "USER_FETCH_SUCCEEDED", user: user});
    console.log(user);
    
   } catch (e) {
    //   yield put({type: "USER_FETCH_FAILED", message: e.message});
    console.log(e);
   }
}

function* SignIn(action){
  try {
    const user = yield call(SignInapi, action.payload);
    console.log(user);

  } catch (e) {
    console.log(e);
  }
}

function* watchSignUp() {
  yield takeEvery(ActionType.SIGN_UP, Signup);
}

function* watchSignIn(){
  yield takeEvery(ActionType.SIGN_IN , SignIn);
}

export function* signUpSaga() {
    yield all([
        watchSignUp(),
        watchSignIn()
    ])
}

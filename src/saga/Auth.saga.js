import { call, put, takeEvery, all } from 'redux-saga/effects'
import * as ActionType from '../redux/ActionType';
import { SignInapi, SignOutapi, SignUpapi, ForgotPassApi, googleSigninApi } from '../common/api/Auth.api';
import { setAlert } from '../redux/action/alert.action';
import { signedInAction, signedOutAction } from '../redux/action/auth.action';
import { history } from '../History/history';

function* Signup(action) {

   try {
      const user = yield call(SignUpapi, action.payload);
      yield put(setAlert({ text: user.payload, color: "success" }))
    //   yield put({type: "USER_FETCH_SUCCEEDED", user: user});
    console.log(user);
    
   } catch (e) {
      yield put(setAlert({ text: e.payload, color: "error" }))
    //   yield put({type: "USER_FETCH_FAILED", message: e.message});
    console.log(e);
   }
}

function* SignIn(action){
  try {
    const user = yield call(SignInapi, action.payload);
    yield put(setAlert({ text: user.payload, color: "success" }))
    yield put(signedInAction(user))
    history.push('/');

    console.log(user);

  } catch (e) {
    yield put(setAlert({ text: e.payload, color: "error" }))
    console.log(e);
  }
}

function* SignOut(action) {
  try {
    const user = yield call(SignOutapi);
    yield put(setAlert({ text: user.payload, color: "success" }))
    console.log(user);

  } catch (e) {
    yield put(setAlert({ text: e.payload, color: "error" }))
    console.log(e);
  }
}


function* forgotPassword(action) {
  try {

    const user = yield call(ForgotPassApi, action.payload)
    yield put(signedOutAction(user))
    history.push('/');
    console.log(user);
    yield put(setAlert({ text: user.payload, color: "success" }))

  } catch (e) {
    yield put(setAlert({ text: e.payload, color: "error" }))
    console.log(e);
  }
}

function* googleSignin(action) {
  try {

    const user = yield call(googleSigninApi, action.payload);
    yield put(signedInAction(user))
    history.push('/');
    yield put(setAlert({ text: "Login Is SuccessFully", color: "success" }))
    console.log(user);

  } catch (e) {
    yield put(setAlert({ text: e.payload, color: "error" }))
    console.log(e);
  }
}



function* watchSignUp() {
  yield takeEvery(ActionType.SIGN_UP, Signup);
}

function* watchSignIn(){
  yield takeEvery(ActionType.SIGN_IN, SignIn);
}

function* watchSignOut() {
  yield takeEvery(ActionType.SIGN_OUT, SignOut);
}

function* watchForgotPass() {
  yield takeEvery(ActionType.FORGOT_PASSWORD, forgotPassword);
}

function* watchGoogleSignin() {
  yield takeEvery(ActionType.GOOGLESIGN_IN, googleSignin);
}


export function* signUpSaga() {
    yield all([
        watchSignUp(),
        watchSignIn(),
        watchSignOut(),
        watchForgotPass(),
        watchGoogleSignin()

    ])
}


import { createUserWithEmailAndPassword,  sendEmailVerification, sendPasswordResetEmail, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged} from "firebase/auth";
import { auth } from "../../Firebase/Firebase";


export const SignUpapi = (data) => {

    console.log("SignUpapi",data);
 
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {

                const user = userCredential.user;
                console.log(user);

                onAuthStateChanged(auth, (user) => {
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                           resolve({payload : "Check your emails"});
                        })
                        .catch((e) => {
                            reject({payload : e});
                        })
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode.localeCompare("auth/email-already-exists") === 0) 
                {
                        reject({payload : "Email is already verified"});                
                } 
                else 
                {
                        reject({payload : errorMessage});
                }

                console.log(error);
            });
    })
}
export const SignInapi = (data) => {
    console.log("SignInapi", data);

    return new Promise((resolve, reject) => {

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;

                if (user.emailVerified) {

                    resolve({ payload: "Login Is Succesfully"});
                }
                else
                {
                    resolve({ payload: "Varify Your Email."});
                }

                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                // const errorMessage = error.message;

                if (errorCode.localeCompare("auth/user-not-found") === 0) 
                {
                    reject({ payload: "Please Check Your Email And Password." });
                }
                else
                {
                    reject({ payload: errorCode });
                }
                console.log(error);
            });
        })
}

export const SignOutapi = () => {

    console.log("data");

    return new Promise((resolve, reject) => {

        signOut(auth)
            .then(() => 
            {
                resolve({payload : "Logout Is SuccessFully." })
            })
            .catch(() => 
            {
                reject({payload : "SomeThing Is Worng." });
            })
    })
}


export const googleSigninApi = () => {
    // console.log(data);

    return new Promise((resolve, reject) => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                resolve({ payload: user })

            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                reject({ payload: error })
            });
    })
}

export const ForgotPassApi = (data) => {
    // console.log(data);

    return new Promise((resolve, reject) => {
        sendPasswordResetEmail(auth, data.email)
            .then(() => {
                resolve({payload : "Forgot PassWord SuccessFully "})
            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                reject({payload : "Your Email Is Wrong "})
                console.log(errorCode);
            });
    })
}
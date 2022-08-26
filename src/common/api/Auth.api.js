
import { createUserWithEmailAndPassword,  sendEmailVerification, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";
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

                    reject({ payload: "Login Is Succesfully"});
                }
                else
                {
                    reject({ payload: "Please Varify Your Email."});
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
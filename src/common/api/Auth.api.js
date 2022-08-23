
import { createUserWithEmailAndPassword,  sendEmailVerification,  onAuthStateChanged} from "firebase/auth";
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
import React, { useRef } from 'react';

function Refexample() {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const cofpasswordRef = useRef();



    const handleSubmit = () => {
        console.log(nameRef.current.value);
        console.log(emailRef.current.value);
        console.log(passwordRef.current.value);
        console.log(cofpasswordRef.current.value);

        


        nameRef.current.style.backgroundColor = '#fc5d35'
        nameRef.current.style.color = '#fff'
        emailRef.current.focus();
        cofpasswordRef.current.style.backgroundColor = '#fc5d35'
        cofpasswordRef.current.style.color = '#fff'

    }

    return (

        <div>
            <center>
                <br></br>
                <br></br>
                <input ref={nameRef} type="text" name="name" placeholder="Your Name" />
                <br></br>
                <br></br>
                <input ref={emailRef} type="text" name="email" placeholder="Your Email" />

                <input ref={passwordRef} type="password" name="password" placeholder="Your Password" />
                <br></br>
                <br></br>
                <input ref={cofpasswordRef} type="password" name="password" placeholder="Confirm Password" />
                <br></br>
                <br></br>
                <button class="appointment-btn scrollto" onClick={() => handleSubmit()}>Submit</button>
            </center>
        </div>
    );
}

export default Refexample;
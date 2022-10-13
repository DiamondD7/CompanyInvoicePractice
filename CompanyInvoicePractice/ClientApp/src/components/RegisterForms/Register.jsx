import React, { useRef, useState, useEffect } from 'react';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const Register = () => {

    const userRef = useRef();
    const errRef = useRef();



    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');



    const [user, setUser] = useState('');
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);



    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidUser(result);
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        const match = pwd === matchPwd;
        setValidMatch(match);

    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg('Invalid Entry')
            return;
        }

        fetch('https://localhost:7043/api/RegisteredMembers', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                FirstName: firstName,
                LastName: lastName,
                PhoneNumber: phoneNumber,
                Email: email,
                UserName: user,
                PassW: pwd
            })
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setSuccess(true);
            })
    }
    return (
        <section>
            {success ?
                <div>
                    <h1>Success!</h1>

                    <span>
                        <a href="/SignIn">Sign in</a>
                    </span>

                </div>
                :

                <form className="form" onSubmit={handleSubmit}>
                    <h1>Register</h1>

                    <label htmlFor="userfirstnameid" className="form--label">First name:</label>
                    <input className="form--input" id="userfirstnameid" type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <label htmlFor="userlastnameid" className="form--label">Last name:</label>
                    <input className="form--input" id="userlastnameid" type="text"
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <label htmlFor="userphoneid" className="form--label">Phone number:</label>
                    <input className="form--input" id="userphoneid" type="text"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />

                    <label htmlFor="useremailid" className="form--label">Email:</label>
                    <input className="form--input" id="useremailid" type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="username" className="form--label">
                        Username:
                        <span className={validUser ? "valid" : "hide"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="validation--icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </span>

                        <span className={validUser || !user ? "hide" : "invalid"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="validation--icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </label>
                    <input className="form--input" id="username" type="text"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        required
                        aria-invalid={validUser ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />

                    <p id="uidnote" className={userFocus && user && !validUser ? "instructions" : "offscreen"}>
                        4 to 24 characters. <br />
                        Must begin with a letter. <br />
                        Letters, numbers, underscored, hyphens allowed.
                    </p>


                    <label className="form--label">
                        Password:
                        <span className={validPwd ? "valid" : "hide"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="validation--icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </span>

                        <span className={validPwd || !pwd ? "hide" : "invalid"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="validation--icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>

                        </span>
                    </label>
                    <input className="form--input" type="password"
                        ref={userRef}
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        aria-invalid={validUser ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />

                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructionsPwd" : "offscreen"}>
                        8 to 24 characters. <br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span>
                        <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                        <span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
                    </p>


                    <label className="form--label">
                        Confirm Password:
                        <span className={validPwd && validMatch && matchPwd ? "valid" : "hide"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="validation--icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </span>

                        <span className={validPwd || validMatch || !matchPwd ? "hide" : "invalid"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="validation--icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>

                        </span>
                    </label>
                    <input className="form--input" type="password"
                        ref={userRef}
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructionsConfPwd" : "offscreen"}>
                        Must match the first password input field
                    </p>

                    
                    <button className="btn btn-primary mt-5" disabled={!validUser || !validPwd || !validMatch ? true : false}>Confirm</button>
                    <p>
                        Already have an account?<br/>
                        <span>Click <a href="/SignIn">here</a></span>
                    </p>
                </form>
            }
        </section>
    )
}

export default Register;
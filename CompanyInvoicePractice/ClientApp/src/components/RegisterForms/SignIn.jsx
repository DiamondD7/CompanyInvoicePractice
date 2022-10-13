import React, { useState, useEffect } from 'react';


const SignIn = () => {

    const [user, setUser] = useState([]);

    const [loggedUserName, setLoggedUserName] = useState('');
    const [loggedPassword, setLoggedPassword] = useState('');


    useEffect(() => {
        fetch('https://localhost:7043/api/RegisteredMembers')
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setUser(data)
            })
    }, [])

    const checkDetails = () => {

        for (let i = 0; i < user.length; i++) {
            if (user[i].UserName === loggedUserName && user[i].PassW === loggedPassword) {
                console.log('Successful login');
                return;
                
            } else {
                console.log('Incorrect credentials');
            } 
        }
    }

    return (
        <>
            <section>
                <form className="form mt-3">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="user--icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>

                    </span>
                    <input type="text" className="form--input mt-4" placeholder="Username" onChange={(e) => setLoggedUserName(e.target.value)} />
                    <input type="password" className="form--input mt-3" placeholder="Password" onChange={(e) => setLoggedPassword(e.target.value)} />

                    <button className="btn btn-primary mt-5" onClick={checkDetails}>Sign in </button>
                    <a className="btn btn-outline-danger mt-2" href="/">Cancel </a>

                    <p>Click <a href="/Register">Here</a> to create a new account</p>
                </form>
            </section>

        </>
    )
}

export default SignIn;
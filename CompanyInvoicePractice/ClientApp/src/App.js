import React, { useState } from 'react';
import Home from './components/Home';
import BookTable from './components/BookTable';
import CustomerTable from './components/CustomerTable';
import Register from './components/RegisterForms/Register';
import SignIn from './components/RegisterForms/SignIn';

export default function App() {

    let component;
    switch (window.location.pathname) {
        case "/":
            component = <Home />
            break;
        case "/BookTable":
            component = <BookTable />
            break;
        case "/CustomerTable":
            component = <CustomerTable />
            break;
        case "/Register":
            component = <Register />
            break;
        case "/SignIn":
            component = <SignIn />
            break;
        default:
            console.log("default error");
            break;
    }


    return (
        <div>
            <div className="d-flex justify-content-between">
                <ul className="navigation-list">
                    <li><a href="/">Home</a></li>
                    <li>|</li>
                    <li><a href="/BookTable">Books</a></li>
                    <li>|</li>
                    <li><a href="/CustomerTable">Members</a></li>
                </ul>

                <div>
                    <a className="btn-register" href="/Register">Register</a>
                    
                    <a className="btn-signin" href="/SignIn">Sign in</a>
                </div>
            </div>


            {component}
        </div>
    )
}
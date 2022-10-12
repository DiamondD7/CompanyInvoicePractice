import React, {useState} from 'react';
import Home from './components/Home';
import BookTable from './components/BookTable';
import CustomerTable from './components/CustomerTable';
import Register from './components/RegisterForms/Register';

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
        default:
            console.log("default error");
            break;
    }

    return (
        <div>
            <div className="d-flex justify-content-between">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/BookTable">Books</a></li>
                    <li><a href="/CustomerTable">Members</a></li>
                </ul>
                <div className= "mt-3 me-3">
                    <a className="btn btn-primary" href="/Register">Register</a>
                    <a className="btn btn-outline-primary ms-3" href="/Register">Sign in</a>
                </div>
            </div>

            {component}
        </div>
    )
}
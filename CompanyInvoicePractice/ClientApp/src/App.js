import React from 'react';
import Home from './components/Home';
import BookTable from './components/BookTable';
import CustomerTable from './components/CustomerTable';

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
        default:
            console.log("default error");
            break;
    }

    return (
        <div>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/BookTable">Books</a></li>
                <li><a href="/CustomerTable">Members</a></li>
            </ul>

            {component}
        </div>
        )
}
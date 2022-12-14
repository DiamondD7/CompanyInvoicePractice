import React, { useEffect, useState } from 'react';
import bookpic from '../Images/deletesoonbooks.jpg';

const Home = (props) => {

    const [items, setItems] = useState([]);
    const [userFirstName, setUserFirstName] = useState(props.loggedFirstName);
    const [userLastName, setUserLastName] = useState(props.loggedLastName);


    useEffect(() => {
        fetch('https://localhost:7043/api/BookProps')
            .then(res => res.json())
            .then((data) => {
                setItems(data);
            }, (error) => {
                console.log(error);
            })
    }, [])
    return (
        <div>
            {props ? <h1 className="text-center mt-5">Welcome {userFirstName} to the Best Bookstore in the Web</h1> :
                <h1 className="text-center mt-5">Welcome to the Best Bookstore in the Web</h1>
            }

            <div className="booksdiv">
                {items.map((item) =>
                    <div className="test-div">
                        <img className="image--book" src={bookpic} alt="picture of books" />
                        <div className="text-start">
                            <p>Title: {item.BookName}</p>
                            <p>By: {item.Author}</p>
                            <p>Released Date: {item.ReleasedDate}</p>
                            <button className="btn btn-success">Checkout</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home;
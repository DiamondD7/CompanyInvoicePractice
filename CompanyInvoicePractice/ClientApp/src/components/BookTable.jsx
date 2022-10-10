import React, { useEffect, useState } from 'react';

const BookTable = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://localhost:7043/api/BookProps')
            .then(res => res.json())
            .then((data) => {
                setItems(data)
                console.log(data);
            }, (error) => {
                console.log(error);
            })
    }, [])

    return (
        <div>
            <table className="table">
                <thead className="thead primary">
                    <tr>
                        <th>Author</th>
                        <th>Book Name</th>
                        <th>Released Date</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) =>
                        <tr key={item.id}>
                            <td>{item.BookName}</td>
                            <td>{item.Author}</td>
                            <td>{item.ReleasedDate}</td>
                            <td><button className="btn-primary">Update</button></td>
                            <td><button className="btn-danger">Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default BookTable;
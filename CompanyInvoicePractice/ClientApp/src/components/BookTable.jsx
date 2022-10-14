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

    const deleteItem = (id) => {
        fetch('https://localhost:7043/api/BookProps/' + id, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            }
        })
            .then(res => res)
            .then((data) => {
                console.log('Delete Successful',data);
            })
    }

    return (
        <div>
            <table className="table">
                <thead className="thead primary">
                    <tr>
                        <th>#</th>
                        <th>Author</th>
                        <th>Book Name</th>
                        <th>Released Date</th>
                        <th><button className="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="add-icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                            Add
                        </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item,index) =>
                        <tr key={index}>
                            <td>{item.Id}</td>
                            <td>{item.BookName}</td>
                            <td>{item.Author}</td>
                            <td>{item.ReleasedDate}</td>
                            <td><button className="btn btn-success">Update</button></td>
                            <td><button className="btn btn-danger" onClick={() => deleteItem(item.Id)}>Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default BookTable;
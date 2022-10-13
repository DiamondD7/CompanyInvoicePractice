import React, { useEffect, useState } from 'react';

const CustomerTable = () => {
    const [item, setItem] = useState([]);

    useEffect(() => {
        fetch('https://localhost:7043/api/RegisteredMembers')
            .then(res => res.json())
            .then((data) => {
                setItem(data)
                console.log(data);
            }, (error) => {
                console.log(error);
            })

    },[])

    return (
        <div>
            <table className="table">
                <thead className="thead primary">
                    <tr>
                        <th>#</th>
                        <th>Customer Name</th>
                        <th>Phone #</th>
                        <th>Email</th>
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
                    {item.map((item,index) =>
                        <tr key={index}>
                            <td>{item.Id}</td>
                            <td>{item.FirstName} {item.LastName}</td>
                            <td>{item.PhoneNumber}</td>
                            <td>{item.Email}</td>

                            <td><button className="btn btn-success">Update</button></td>
                            <td><button className="btn btn-danger">Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        )
}

export default CustomerTable;
import React, { useEffect, useState } from 'react';

const CustomerTable = () => {
    const [item, setItem] = useState([]);

    useEffect(() => {
        fetch('https://localhost:7043/api/CustomerDetails')
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
                        <th>Customer Name</th>
                        <th>Phone #</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {item.map((item) =>
                        <tr key={item.id}>
                            <td>{item.CustomerFirstName} {item.CustomerLastName}</td>
                            <td>{item.PhoneNumber}</td>
                            <td>{item.Email}</td>
                            <td><button className="btn-primary">Update</button></td>
                            <td><button className="btn-danger">Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        )
}

export default CustomerTable;
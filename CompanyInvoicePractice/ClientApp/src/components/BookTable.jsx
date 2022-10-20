import { Modal } from 'bootstrap';
import React, { useEffect, useState } from 'react';

const BookTable = () => {
    const [items, setItems] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const [bId, setBID] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');


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
                "Content-Type": "application/json"
            }
        })
            .then(res => res)
            .then((data) => {
                console.log('Delete Successful', data);
            })

        window.location.reload();
    }

    const modalOn = (item,isOpen) => {
        setOpenModal(isOpen)

        setBID(item.Id)
        setTitle(item.BookName)
        setAuthor(item.Author)
        setDate(item.ReleasedDate)
    }


    return (
        <div>
            {openModal ?
                <div>
                    <div className="overlay"></div>
                    <OpenModal openModal={modalOn} bookId={bId} bookTitle={title} bookAuthor={author} bookDate={date} />
                </div>
                :
                ""}
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
                    {items.map((item, index) =>
                        <tr key={index}>
                            <td>{item.Id}</td>
                            <td>{item.BookName}</td>
                            <td>{item.Author}</td>
                            <td>{item.ReleasedDate}</td>
                            <td><button className="btn btn-success" onClick={() => modalOn(item,!openModal)}>Update</button></td>
                            <td><button className="btn btn-danger" onClick={() => deleteItem(item.Id)}>Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

const OpenModal = (props) => {
    const [modalIsFalse, setModalIsFalse] = useState(false);

    const [bookId, setBookId] = useState(props.bookId);
    const [bTitle, setBTitle] = useState(props.bookTitle);
    const [bAuthor, setBAuthor] = useState(props.bookAuthor);
    const [bDate, setBDate] = useState(props.bookDate);

    const updateItem = (e) => {
        e.preventDefault();
        fetch('https://localhost:7043/api/BookProps/' + bookId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Id: bookId,
                BookName: bTitle,
                Author: bAuthor,
                ReleasedDate: bDate
            })
        })
            .then(res => console.log(res))
            .then(() => {
                console.log('Successful');
            })
        props.openModal(modalIsFalse)
        window.location.reload();
    }

    return (
        <div className="div--form">

            <section>
                <form className="form" onSubmit={updateItem}>
                    <h3>Update data</h3>
                    <label htmlFor="title" className="form--label">Book Title</label>
                    <input id="title" className="form--input" type="text" value={bTitle} onChange={(e) => setBTitle(e.target.value)} />

                    <label htmlFor="author" className="form--label">Author</label>
                    <input id="author" className="form--input" type="text" value={bAuthor} onChange={(e) => setBAuthor(e.target.value)} />

                    <label htmlFor="date" className="form--label">Released Date</label>
                    <input id="date" className="form--input" type="text" placeholder="DD/MM/YYYY" value={bDate} onChange={(e) => setBDate(e.target.value)} />

                    <button className="btn btn-success mt-5">Update</button>
                    <button className="btn btn-danger mt-2" onClick={() => props.openModal(modalIsFalse)}>Cancel</button>
                </form>
            </section>
        </div>
    )
}

export default BookTable;
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillPlusCircle } from "react-icons/ai"; //add icon
import books from './db';

const Home = () => {

    const [predefineBooks, setpredefineBooks] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('user'));

        // Check if the stored data is valid JSON before parsing
        let data = [];
        try {
            data = storedData ? storedData : [];
        } catch (e) {
            console.error("Error parsing localStorage data:", e);
            data = [];
        }

        // const data = JSON.parse(localStorage.getItem('user')) || [];
        if (data.length === 0) {
            localStorage.setItem('user', JSON.stringify(books));
            setpredefineBooks(books);
        }
        else {
            const combine = [...data, ...books.filter(i => !data.find(d => d.id === i.id))];
            setpredefineBooks(combine);
        }
    }, [])

    const getData = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filteredRecord = predefineBooks.filter(val => val.title.toLowerCase().includes(searchValue));
        setpredefineBooks(filteredRecord);
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="heading text-center mt-2">
                        <h1 style={{fontStyle:"italic"}}>E-library Management App</h1>
                    </div>
                    <div className='search-bar d-flex justify-content-center my-5'>
                        <input
                            placeholder='Search recipe...'
                            type='text'
                            className='w-25 py-2 px-3 rounded-pill search-input'
                            onInput={getData}
                        />
                    </div>
                    <div className="booksection row justify-content-center align-items-center">
                        {/* Add new book card */}
                        <div className="col-lg-3 my-3 ">
                            <div className="card " style={{ width: '18rem', height: "200px" }}>
                                <div className="card-body text-center d-flex justify-content-center align-items-center">
                                    <Link to={'/add'} className="btn btn-primary"><AiFillPlusCircle size={40} /></Link>
                                </div>
                            </div>
                        </div>
                        {/* predefine books card */}
                        {
                            predefineBooks.map((val) => {
                                console.log(val.date);

                                return (
                                    <div className="col-lg-3 my-3" key={val.id}>
                                        <div className="card">
                                            <div className="card-body d-flex justify-content-center align-items-center flex-column">
                                                <h5 className="card-title text-center mb-3">{val.title}</h5>
                                                <p className="card-author text-center">{val.author}</p>
                                                <div className="button">
                                                    <Link to={`/details/${val.id}`} className="btn btn-primary mx-3">Borrow</Link>
                                                    <button className="btn btn-secondary mt-0">Return</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home

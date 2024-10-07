import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Edit = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const {record} = location.state || {};

  const [title, setTitle] = useState(record.title);
  const [author, setAuthor] = useState(record.author);
  const [date, setDate] = useState(record.date);
  const [img, setImg] = useState(record.img)


  const handleSubmit = (e) => {
    e.preventDefault();


    const obj = {
      id: record.id,
      title,
      author,
      date,
      img,
    }

    const all = JSON.parse(localStorage.getItem('user')) || [];
    const newRecord = all.map(r => (r.id === record.id ? obj : r));

    

    localStorage.setItem('user', JSON.stringify(newRecord));

    alert("Edit!");
    setTitle("");
    setAuthor("");
    setDate("");
    setImg(null);
    navigate('/');
  }

  return (
    <div>
      <div className='d-flex justify-content-center align-items-center mt-5'>
        <div className="col-lg-5">
          <form className='bg-dark text-light p-5' onSubmit={handleSubmit}>
            <h2 className='text-center'>Edit E-library Book</h2>
            <div className="mb-3">
              <label className="form-label">Title:</label>
              <input type="text" className="form-control" aria-describedby="emailHelp" onChange={(e) => setTitle(e.target.value)} value={title || ""} />
            </div>
            <div className="mb-3">
              <label className="form-label">Author:</label>
              <input type="text" className="form-control" onChange={(e) => setAuthor(e.target.value)} value={author || ""} />
            </div>
            <div className="mb-3">
              <label className="form-label">Publication Date:</label>
              <input type="date" className="form-control" onChange={(e) => setDate(e.target.value)} value={date || ""} />
            </div>
            <div className="mb-4">
              <label className="form-label">Input File:</label>
              <input type="file" className='d-block'
                onChange={(e) => setImg(URL.createObjectURL(e.target.files[0]))} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Edit

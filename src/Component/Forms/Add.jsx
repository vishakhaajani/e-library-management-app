import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Add = () => {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [img, setImg] = useState(null)

  const navigate = useNavigate();

  const storedData = JSON.parse(localStorage.getItem('user'));
  const data = storedData ? storedData : [];
  const [record, setRecord] = useState(Array.isArray(data) ? data : []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!title || !author || !date){
      alert("E-library can't be empty!");
      return false;
    }

    const obj = {
      id: Math.floor(Math.random()*10000),
      title,
      author,
      date,
      img : img || '',
    }

    const all = [...record, obj];
    localStorage.setItem('user', JSON.stringify(all));
    setRecord(all);


    alert("Add!");
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
          <h2 className='text-center'>Add E-library Book</h2>
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

export default Add

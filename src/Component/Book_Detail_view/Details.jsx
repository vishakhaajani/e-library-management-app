import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../style.css';

const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null); // Initialize as null

  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user')) || [];
    const selectedBook = data.find((val) => val.id === parseInt(id));
    console.log(selectedBook);
    
    setDetails(selectedBook);
  }, [id]);

  const handleDelete = (id) => {
    const updatedDetails = JSON.parse(localStorage.getItem('user')) || [];
    const filteredDetails = updatedDetails.filter(details => details.id !== id);
    localStorage.setItem('user', JSON.stringify(filteredDetails));
    alert("Delete!");
    navigate('/');
  }

  const handleEdit = (record) => {
    navigate('/edit', { state: { record } });
  }

  if (!details) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div key={details.id}>
        <div>
          <div className='msg'>
            <img src={details.img} alt={details.title} width={300} height={300} style={{border:"1px solid grey", padding:"10px", objectFit:"cover"}} />
            <div>
              <div className='info'>
                <h3 className='mb-4 text-capitalize'>{details.title}</h3>
                <b>Author:</b>
                <p>{details.author}</p> {/* Ensure that the author is displayed */}
                <b>Publication Date:</b>
                <p>{details.date}</p> {/* Ensure that the date is displayed */}
              </div>
              <div className='button'>
                <button onClick={() => handleEdit(details)} className='me-3 px-4 btn-primary btn'>Edit</button>
                <button onClick={() => handleDelete(details.id)} className='px-4 btn-secondary btn'>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details;

import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';


const EditBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [language, setLanguage] = useState('')
  const [pages, setPages] = useState('')
  const [year, setYear] = useState('')
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams();

  const {enqueueSnackbar } = useSnackbar();


  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:5555/book/${id}`)
    .then((response)=>{
      setAuthor(response.data.author);
      setTitle(response.data.title);
      setLanguage(response.data.language);
      setPages(response.data.pages);
      setYear(response.data.year);
      setLoading(false);
    }).catch((err)=>{
      setLoading(false);
      alert("Error : Please check console");
      console.log(err);
    });
  },[])

  const handleEditBook = () => {
    const data = {
      author,
      language,
      pages,
      title,
      year,
    };
    setLoading(true);
    axios.put(`http://localhost:5555/book/${id}`, data)
    .then(()=>{
      setLoading(false);
      enqueueSnackbar('Book Edited Successfully',{variant:'success'})
      navigate('/');
    })
    .catch((err)=>{
      setLoading(false);
      // alert("Error : Please check Console")
      enqueueSnackbar('Error',{variant:'error'});
      console.log(err);
    })
  }

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {
        loading ? <Spinner/> : ''
      }
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input 
          type="text" 
          value={title} 
          onChange={(e)=>setTitle(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input 
          type="text" 
          value={author} 
          onChange={(e)=>setAuthor(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Language</label>
          <input 
          type="text" 
          value={language} 
          onChange={(e)=>setLanguage(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Pages</label>
          <input 
          type="text" 
          value={pages} 
          onChange={(e)=>setPages(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input 
          type="text" 
          value={year} 
          onChange={(e)=>setYear(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBook;
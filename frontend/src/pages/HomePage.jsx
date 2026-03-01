import React from 'react'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import RateLimitUI from '../components/RateLimitUI';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
     const [isRateLimited,setIsRateLimited] = useState(false);
     const [notes,setNotes] = useState([]);
     const [loading,setLoading] = useState(true)

     useEffect(()=>{
        const fetchNotes = async () =>{
            try{
                const res = await axios.get("http://localhost:4000/api/notes");
                console.log(res.data);
                setNotes(res.data);
                setIsRateLimited(false);
            } catch (error){
                console.log("Error Fetching notes");
                if(error.response?.status === 429){
                    setIsRateLimited(true);
                }
                else{
                    toast.error("failed to load notes");
                }
            }
            finally{
                setLoading(false);
            }
        };
        fetchNotes();
     }, []);

  return (
    <div className='min-h-screen'>
        <Navbar/>

        {isRateLimited && <RateLimitUI/>}
    </div>
  )
}

export default HomePage

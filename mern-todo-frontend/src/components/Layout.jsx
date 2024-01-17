import React, { useEffect } from 'react'
import {Outlet} from 'react-router-dom'
import Header from './Header'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'


export const Layout = () => {
const dispatch = useDispatch()
  useEffect(() => {

    (async() => {
    
      // Define your data payload
   
      try {
       const response = await fetch(`${import.meta.env.VITE_LINK}/api/v1/users/get-user`, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           credentials: 'include', // Add this line
         });
     
         if (!response.ok) {
           throw new Error('Network response was not ok.');
         }
      
     
         const responseData = await response.json();
       
         console.log(responseData);
         if(responseData) {
          
          dispatch(login(responseData)
          );}
         
       } catch (error) {
         console.error('Error:', error);
        
       }
   
    })()

      
    }, [])

  
  return (
    <>
    <Header />
    <Outlet/>

    </>
  )
}

export default Layout   
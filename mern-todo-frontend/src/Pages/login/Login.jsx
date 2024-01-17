import React, {useState} from 'react'
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import { login } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import Input from '../../components/Input'
import Button from '../../components/Button'


const Login = () => {
console.log(import.meta.env.VITE_LINK)
const dispatch = useDispatch()
const navigate = useNavigate();
const [inputs,setInputs] = useState({

  email:'',
  password:'',
})
const dataSubmit  = async (data)=>{
  console.log(data)
if(data.email===''||data.password===''){
  toast.error('Please Fill All Fields')
  console.log('Please Fill All Fields')
}
else{

  
  try {
    const response = await fetch(`${import.meta.env.VITE_LINK}/api/v1/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include', // Add this line

    });
console.log(response)
// console.log(response.ok) // true
    if (response.ok) {


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
      
     
         const userData = await response.json();
       
         console.log(userData);
         if(userData) dispatch(login(userData));
         
       } catch (error) {
         console.error('Error:', error);
        
       }
   
    })()
 

      navigate('/avaliable-task')
      toast.success('Account Login Successfully')
      // Handle success, maybe redirect to another page or show a success message
    } else {
      // Handle error, maybe show an error message
      const errorData = await response.json();
      console.error('Error:', errorData.message);
      toast.error(errorData.message)
    }
  } catch (error) {
    // Handle network errors or other issues
    console.error('Error:', error);
  }
}



}

  return (
    <form 
      
      className="  lg:w-[60%] w-full  mt-20  mx-auto flex justify-center item-center flex-col">


    <Input name="Email" title="Email:" type="email" 
      place="Enter Your Valid Email"
    fn={(e)=>{
        setInputs({...inputs,email:e.target.value})
     
    }} />
    <Input 
      place="Enter Your Valid Password"
    name="Password" title="Password:" type='password' classes="gap-4 pr-2" fn={(e)=>{
        setInputs({...inputs,password:e.target.value})
       
    }} />
    <Button fn={   async (e)=>{
        
        e.preventDefault()
       await dataSubmit(inputs)
      }} title="Login" classes="  w-28 h-10 font-bold    hover:bg-green-400
      bg-zinc-600 flex text-center justify-center mt-5 mx-auto px-18" />

</form>
  )
}

export default Login
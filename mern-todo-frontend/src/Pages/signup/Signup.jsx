import React, {useState} from 'react'
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'


import Input from '../../components/Input'
import Button from '../../components/Button'

const Signup = () => {


const navigate = useNavigate();
const [inputs,setInputs] = useState({
  name:'',
  email:'',
  password:'',
})
const dataSubmit  = async (data)=>{
  console.log(data)
if(data.name===''||data.email===''||data.password===''){
  toast.error('Please Fill All Fields')
  console.log('Please Fill All Fields')
}
else{

  
  try {
    const response = await fetch(`${import.meta.env.VITE_LINK}/api/v1/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
console.log(response)
// console.log(response.ok) // true
    if (response.ok) {
      navigate('/login')
      toast.success('Account Created Successfully')
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
      
      className="
     w-full  mt-20  mx-auto flex justify-center item-center flex-col">

    <Input name="Name" title="Name:" type="name" 
       place="Enter Your Name"
    fn={(e)=>{
        setInputs({...inputs,name:e.target.value})
       
    }} />
    <Input name="Email" title="Email:" type="email" 
       place="Enter Your Valid Email"
    fn={(e)=>{
        setInputs({...inputs,email:e.target.value})
       
    }} />
    <Input name="Password" 
       place="Enter Your Valid Password"
    title="Password:" type='password' lc=" m-18" fn={(e)=>{
        setInputs({...inputs,password:e.target.value})
       
    }} />
    <Button fn={   (e)=>{
        
        e.preventDefault()
        dataSubmit(inputs)
      }} title="Sign up" classes=" w-28 h-10 font-bold    hover:bg-green-400
      bg-zinc-600 flex text-center justify-center mt-5 mx-auto px-18" />

</form>
  )
}

export default Signup
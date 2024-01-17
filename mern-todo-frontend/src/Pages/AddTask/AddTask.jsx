import React,{useEffect, useState} from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AddTask = () => {
  const navigate=useNavigate()
const [inputs,setInputs]=useState({content:""})
const dataSubmit = async(data)=>{
    console.log(data)


 try {
  if(data.content.trim()===""){
      toast.error("Please Enter a Valid Task")
  }
    else{ 
      const res = await fetch(`${import.meta.env.VITE_LINK}/api/v1/users/add-todo`,{
         method:"POST",
         headers:{
             "Content-Type":"application/json"
         },
         body:JSON.stringify(data),
         credentials:"include"
     })
      const response = await res.json()
      console.log(response)
      if(response.statusCode===200){
          toast.success("Task Added Successfully")
        //   setInputs({content:e.target.value})
        setInputs((prev) => ({ ...prev, content: "" }))
        navigate("/avaliable-task")
      }
      else{
          toast.error(`Something Went Wrong : ${response.message}`)
      }
     
    }
 } catch (error) {
  
console.log("Error : ",error)
toast.error(`Something Went Wrong: ${error}`)

 }
}

  return (
  
  <div>

<form 
      
      className="w-[98%] mt-24  mx-auto flex justify-center item center flex-col">

<div>
    <h1 className="text-3xl text-center font-bold mb-3 ">Add Task</h1>
</div>

    <Input  classes='w-full h-12 m-[0px] py-6 px-16 ' name="click here to write task" type="text"
    chk={inputs}
    place="Click Here to Enter Your Task"
    fn={(e)=>{
   
            setInputs({content:e.target.value})
    
       
    }} />
    
    <Button
    fn={   (e)=>{
        
        e.preventDefault()
        dataSubmit(inputs)
      }} title="Add Task" classes=" 
      hover:bg-green-400 
      bg-zinc-600 flex text-center justify-center mt-2 mx-auto h-12 w-32" />

</form>


    </div>
  )
}

export default AddTask
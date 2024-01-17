import React, { useEffect , useState} from 'react';
import Input from "./components/Input"
import Button from "./components/Button"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


 function  App(){

  const authStatus = useSelector((state) => state.auth.status)
  // Call getData somewhere in your code
    
  

  return (
    <div>
   <div className='mt-10 w-[95%] mx-auto  '> 


<div className='w-[95%] mx-auto flex h-96 rounded-lg  dark:bg-gray-500 bg-slate-200 flex-col
md:flex-row lg:justify-evenly '>

<div className=' flex gap-1 ml-22 px-10 pt-5 text-8xl lg:relative lg:top-[10%] cursor-pointer'>
   <span>
    Task
   </span>
         <span className='mt-3 text-3xl font-thin'>Manager</span>
 </div>
 <div className='flex flex-col lg:flex-1 lg:relative lg:left-[-35%] lg:top-[10%]
 
 md:flex-1 md:relative md:left-[-45%] md:top-[5%]
 
 justify-center items-center ml-10 lg:m-0 lg:p-0 mt-2 lg:gap-20'>
  <span className='text-2xl  lg:text-3xl  lg:relative
  lg:top-[15%]
  md:text-3xl md:top-[1%] md:relative
  '>Welcome to Task Manager
  </span>
  {authStatus ? (<span> 
<Button title={ <Link to={"/add-task"}>
Add Task
</Link>} classes="

lg:top-[-20%] lg:relative lg:left-[-25%]
lg:m-0
md:top-[5%] md:relative md:left-[-10%]
md:m-0
mt-4 hover:bg-green-400 ml-16
px-18 py-3
bg-slate-600 w-48 h-22"/>

</span>):(<span>
<Button title={ <Link to={"/signup"}>
Register
</Link>} classes="
lg:top-[-10%] lg:relative lg:left-[-85%]
lg:m-0
md:top-[5%] md:relative md:left-[-10%]
md:m-0
mt-4 hover:bg-green-400 ml-16 bg-slate-600 px-10 py-3"/>

</span>)}

</div>
 <div>

 </div>

<div className=' '>

  <img className="ml-5 w-48 md:w-64 
  lg:static
  
  md:relative md:left-[-40%]
  md:top-[10%]" src="https://miro.medium.com/v2/resize:fit:978/1*WF0GnDiTXbWpOD6D9xPINA.png" alt="" />
</div>

</div>
<div className='md:mt-24  mt-52 '>
  <div className='h-[2px] mx-auto rounded-xl m-10 w-[85%] bg-blue-500'> </div>



<div className='w-[95%] mb-5 bg-slate-600 text-white font-mono  mx-auto p-10 rounded-lg'>

<h1 className='text-2xl'>
  What makes a good to-do list app?
</h1>
<h2 className=' font-semibold text-lg py-2'>
  The best to-do list apps:
</h2>
<ul>


  <li className='py-2 font-medium text-lg '>
  •  Make it fast to add and organize tasks. Ideally, a task is added and categorized in a couple taps or keystrokes. If adding your to-dos is a hassle, you just won't do it.

  </li>
  <li className='py-2 font-medium text-lg '>

  •  Offer multiple ways to organize your tasks. Tags, lists, projects, and due dates are all helpful, and the best to-do apps offer at least a few categories like this.

</li>
<li className='py-2 font-medium text-lg '>

•  Remind you about self-imposed deadlines. Notifications, widgets, emails—if you're using an online to-do list, it should help you track what needs to happen when. This is one of the big reasons to use an app over a notebook.

</li>
<li className='py-2 font-medium text-lg '>
•  Offer clean user interfaces. The best to-do app fits into your workflow, so you can get back to what you're supposed to be doing. As a professional reviewer who spends a lot of time testing, I generally have a phobia of ugly apps.



</li>
</ul>


</div>







</div>



   </div>


<footer className='text-white h-12 w-full flex justify-center items-center  mt-16 bg-blue-500'>
<a className='m-auto  'target="_blank" href="https://github.com/heyibad/mern-todo/">
<h1
className=' m-auto flex 
my-2 text-sm
'>© Created by Muhammad Ibad Ansari &nbsp; | &nbsp;  Code is on Github &nbsp; &nbsp; 

 


<i className="fa-brands fa-github mt-1"></i>

  
  
  

</h1>
 </a>
</footer>
   </div>
  );
  
}

export default App

import React, { useEffect , useState} from 'react';

import Button from "../../components/Button"
import toast from 'react-hot-toast';



 function  Avaliable(){
const [todo,settodo]=useState([{}])

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_LINK}/api/v1/users/get-todo`, {
        method: "GET",
        headers: {
          "Content-Type": "Avaliablelication/json"
        },
        credentials: "include"
      });
      
      const data = await res.json();
      console.log(data.data);
      settodo(data.data);
    } catch (error) {
      console.error('There was a problem fetching the data:', error);
      // Handle error state or show a message to the user
    }
  };

  fetchData();
  console.log(todo.length)
}, []);

const deleteTodo = async (_id) => {
  // filter out the todo with the id and set the new todo object

try {

  const res = await fetch(`${import.meta.env.VITE_LINK}/api/v1/users/delete-todo/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body:JSON.stringify({_id})
  });
  
  const data = await res.json();
  const updatedTodo = todo.filter((item) => item._id !== _id);
  // updatedTodo have all the todo except the one with the id
  settodo(updatedTodo);
  console.log(updatedTodo)
  console.log(data)
  toast.success("Task Deleted Successfully")
  
} catch (error) {
  console.log("There is some issue in deleting task",error)
  
}




}

  // Call getData somewhere in your code
    
  

  return (
<div>
  
{
    todo && todo.length >= 0 ? (            
    <h1 className="text-3xl text-center mt-12 font-bold">Available Tasks:</h1>
    ):(            <h1 className="text-3xl text-center mt-48 font-bold">Available Tasks:</h1>
    )
  }



    <div className="w-[95%]  h-max mx-auto my-4  flex flex-col-reverse justify-center items-center">
 


      {todo && todo.length > 0 ? (
        todo.map((item) => (
          <div key={item._id} className='flex justify-between 
           dark:bg-gray-500
          
          bg-slate-100 rounded-lg text-lg w-full mt-6 p-5 m-auto'>
            {/* Content for each todo item */}
           
           
<h1 className='overflow-auto'>
      <p className="  para">{item.content}</p>
</h1>
        
            {/* <p class="line-through ...">The quick brown fox ... {item.content}</p> */}
            <span className='flex justify-center   items-center ml-4 gap-2 '>
              <Button
               key={item._id}
              classes="  w-16 h-10 font-bold   hover:bg-red-400
              bg-zinc-600 "
              title={<i className=" fa-solid fa-trash"></i>} fn={(e) => {
                e.preventDefault();
                console.log(item._id)
                deleteTodo(item._id);



                console.log("delete");


                // Handle delete logic here
              }} />
              {/* <Button
               classes=" w-16 h-10 font-bold   hover:bg-green-400
               bg-zinc-600 "
              title={<i className="fa-solid fa-pen"></i>} /> */}

              

            </span>
          </div>
        ))
      ) : (
        <h3 className="text-xl mt-4 font-bold">Not Found</h3>
      )}
    </div>

    </div>
  );
  
}

export default Avaliable

import { useState } from "react";

const Input=(props)=>{

    const [inn,setinn]= useState("")

    return(
        <div className="flex w-full p-5 justify-center  md:w-[80%] items-center mx-auto gap-12 ">
    {
        props.title ? (
            <label for="helper-text" class={`block mb-1  w-[10%] text-lg text-gray-900 dark:text-white gap-5 ${props.classes} ${props.lc}`}>
    {props.title} </label>
        ): ("")
    }    


<input onChange={props.fn } type={props.type} id="helper-text" 
chk={props.chk} 
aria-describedby="helper-text-explanation" class={`

bg-gray-50 border border-gray-300 md:w-[90%] w-full text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  ${props.classes}`} placeholder={` ${props.place}`}/>
   </div>
    )
}
export default Input;
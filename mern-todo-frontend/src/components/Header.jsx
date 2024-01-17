import React from 'react'
import Button from './Button.jsx'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status)
  const logout = async () => {



    // Define your data payload

    try {
      const response = await fetch(`${import.meta.env.VITE_LINK}/api/v1/users/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Add this line
      });




      const responseData = await response.json();

      console.log(responseData);
      if (responseData.statusCode === 200) {

        dispatch(logout());
      }

      window.location.reload();
      toast.success("Logout Successfully")
      navigate('/login')

    } catch (error) {
      console.error('Error:', error);

    }



    console.log("done")
  }

  return (
    <header className=' sticky flex justify-between items-center px-5 bg-blue-500 text-white h-14 '>

      <Link to={"/"}>

        <div className='flex gap-1  text-2xl font-semibold cursor-pointer'>
   <span>
    Task
   </span>
         <span className='mt-3 text-sm font-thin'>Manager</span>
        </div>
      </Link>







      {
        authStatus ? (
          <ul className='flex md:gap-5 gap-1 text-[14px] md:ml-8 px-2 md:text-lg   md:px-16 md:font-light sm:px-0  '>
            <li className='cursor-pointer'>
              <NavLink
                to={"/avaliable-task"}
                className={({ isActive }) =>
                  `${isActive ? "text-white-500 font-semibold" : ""}  mr-3 hover:text-green-300 `
                }
              >Avaliable Task
              </NavLink>
            </li>

            <li className='cursor-pointer'>
              <NavLink
                to={"/add-task"}
                className={({ isActive }) =>
                  `${isActive ? "text-white-500 font-semibold" : ""}  ml-3  hover:text-green-300 `
                }
              > Add Task
              </NavLink>
            </li>     </ul>

        ) : (null)
      }





      {authStatus ? (
        <div className='flex text-white gap-2'>

          <Button title="Logout" classes="
           w-16 h-10 font-bold 
          hover:bg-red-400
    bg-zinc-600 " fn={logout} />

        </div>


      ) : (

        <div className='flex text-white gap-2'>

          <Link to="/signup">
            <Button title="Sign Up"
              classes="  
              w-16 h-10 font-bold   hover:bg-green-400
bg-zinc-600 " />

          </Link>
          <Link to="/login">
            <Button title="Login"
              classes="   w-16 h-10 font-bold   hover:bg-green-400
bg-zinc-600 "/>

          </Link>

        </div>
      )

      }




    </header>
  )
}

export default Header
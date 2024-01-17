import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Header from './components/Header.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Signup from './Pages/signup/Signup.jsx'
import Login from './Pages/login/Login.jsx'
import AddTask from './Pages/AddTask/AddTask.jsx'
import  { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux'
import store from './store/store.js'
import Avaliable from './Pages/Avaliable-task/avaliable-task.jsx'

const router = createBrowserRouter([
  { path: '/',
   element: <Layout /> ,
  children:[
    {path:'/',element:<App/>},
    {path:'/signup',element:<Signup/>},
    {path:'/login',element:<Login/>},
    {path:'/add-task',element:<AddTask/>},
    {path:'/avaliable-task',element:<Avaliable/>}
  ] },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>


    <Provider store={store}>

  <Toaster
  position="top-right"
  reverseOrder={false}
/>


    <RouterProvider router={router}/>


    </Provider>
  </React.StrictMode>,
)

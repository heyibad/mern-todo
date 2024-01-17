import {ApiResponse} from "../ApiResponse.js"
import {ApiError} from "../ApiError.js"
import {asyncHandler} from "../asyncHandler.js"
import { User } from "../models/user.model.js"
import { Todo } from "../models/todo.model.js"
import Jwt from "jsonwebtoken"
import bycrypt from "bcrypt"

const login = asyncHandler(async(req,res)=>{

    const {email,password} =req.body

    console.log(req.body)
    if (
        !(email|| password)
    ) {
        throw new ApiError(400, "All fields are required")
    }
    try {

        const user = await User.findOne({email})
        console.log(user)
        if(!user){
            throw new ApiError(400,"User not found")
        }
        const isPasswordMatch = await user.comparePassword(password)
        if (!isPasswordMatch) {
            throw new ApiError(401, "Invalid password") }
        // const Token =  Jwt.sign({
        //     _id:user._id,
        //     email:user.email,
        //     name:user.name

        // },process.env.TOKEN,{expiresIn:Token_EXPIRY})
        const Token = user.generateToken()

        console.log(Token)
        return res
        .status(200)
        .cookie("Token",Token,{
    httpOnly: true,
    secure:true
})
        .json(new ApiResponse(200,"login Sucessfully",{Token}))

        
    } catch (error) {
        
        throw new ApiError(400,"Login seems uncessfull")
    }



})

const logout = asyncHandler(async(req,res)=>{

    // const data= req.user
    const option={
  httpOnly:true,      
secure:true
    }

    return res
    .status(200)
    .clearCookie("Token",option)
.json( new ApiResponse(200,"Logout Sucessfully",{}))




    

    
})
const register = asyncHandler(async(req,res)=>{

    const {name,email,password} =req.body

   
    if (
        [name, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    console.log(User)
    console.log(req.body)
    const existedUser = await User.findOne({email})
console.log("existed User", existedUser)
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }


        const user = await User.create({name,email,password} )
    console.log(user)
        const Saved= await User.findById(user._id).select("-password")
console.log(Saved)
    if(!Saved){ throw new ApiError(500,"User not saved")}
      
    return res
    .status(200)
    .json(new ApiResponse(200,"Reqisted Sucessfully",Saved))
    

})


// const register = asyncHandler( async (req, res) => {
//     // get user details from frontend
//     // validation - not empty
//     // check if user already exists: username, email
//     // check for images, check for avatar
//     // upload them to cloudinary, avatar
//     // create user object - create entry in db
//     // remove password and refresh Token field from response
//     // check for user creation
//     // return res


//     const { email, name, password } = req.body
//     //console.log("email: ", email);

//     if (
//         [ email, name, password].some((field) => field?.trim() === "")
//     ) {
//         throw new ApiError(400, "All fields are required")
//     }

//     const existedUser = await User.findOne({
//        email
//     })

//     if (existedUser) {
//         throw new ApiError(409, "User with email or username already exists")
//     }
//     //console.log(req.files);

    

    
//     const user = await User.create({
//          name,
//         email, 
//         password
      
//     })

//     const createdUser = await User.findById(user._id).select(
//         "-password"
//     )

//     if (!createdUser) {
//         throw new ApiError(500, "Something went wrong while registering the user")
//     }

//     return res.status(201).json(
//         new ApiResponse(200, createdUser, "User registered Successfully")
//     )

// } )





const getTodos = asyncHandler(async(req,res)=>{

    
    console.log(req.user)
    const user = await User.findById(req.user._id)


try {
    
     const todos = await Todo.find({user:user._id})
    
        return res
        .status(200)
        .json(new ApiResponse(200,"Todo added Sucessfully",todos))
    
    
    
} catch (error) {
    throw new ApiError(400,"Todo not found")
}

    
})
const addTodo = asyncHandler(async(req,res)=>{

   
    const user = await User.findById(req.user._id)

    if(!user) throw new ApiError(400,"User not found")
    const {content}=req.body
try {
    
        const todo = await Todo.create({content,user:user._id})
        console.log(todo)
    
        return res
        .status(200)
        .json(new ApiResponse(200,"Todo added Sucessfully",todo))
    
} catch (error) {
    throw new ApiError(400,"Todo not added")
}

    
})
const deleteTodo= asyncHandler(async (req,res)=>{
   const {_id} = req.body

  const del=await  Todo.findByIdAndDelete(_id)
  if(!del) throw new ApiError(400,"Todo not deleted")

  return res
  .status(200)
  .json(new ApiResponse(200,"Deleted Sucessfully",{}))

})


const updateTodo= asyncHandler(async ()=>{
    const Token= req.cookies.Token || req.body.Token
    console.log(Token)
    const decoded= await Jwt.verify("Token",process.env.TOKEN,{httpOnly:true,secure:true})

    if(!decoded) throw new ApiError(400,"Decodig error")

  await  Todo.findByIdAndUpdate(
    decoded_id,
    {
        $set:{

        }
    },
    {new:true}
  )

  return res
  .status(200)
  .json(new ApiResponse(200,"Deleted Sucessfully",{}))

})

const getUser = asyncHandler(async (req, res) => {
    const Token=req.cookies?.Token || req.header("Authorization")?.replace('Bearer ', '')

    
    console.log(req.cookies);

  
    if (!Token) {
      throw new ApiError(200, 'Token not found');
    }
  
 
  
    try {
      const decoded = await Jwt.verify(Token, process.env.TOKEN, {httpOnly:true,secure:true});
      console.log(decoded);
  
      return res.status(200).json(decoded );
    } catch (error) {
      // Handle Token verification errors
      throw new ApiError(401, 'Invalid Token');
    }
  });
  


export{
    login,
    logout,
    getTodos,
    register,
    addTodo,
    getUser,
    deleteTodo
}
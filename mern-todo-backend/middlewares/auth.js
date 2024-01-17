 import  Jwt  from "jsonwebtoken";
import { asyncHandler } from "../asyncHandler.js";
import { ApiError } from "../ApiError.js"
import { ApiResponse } from "../ApiResponse.js"


  export const auth = asyncHandler(async(req,res,next)=>{

    const token=req.cookies.Token || req.body.Token
    console.log(token)
    if(!token || token==undefined || token==""){
      throw new ApiError(200,"token not found")
    }
try {
  
      const option={
        httpOnly:true,
        secure:true
      }
      const decoded = await Jwt.verify(token,process.env.TOKEN,option)
  
    
  
      req.user= decoded
      next()
  
  
} catch (error) {
  console.log("Middelware process failed")
}
  })
import mongoose,{Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema= new Schema(
    {
        name:{
            type:String,
            required:[true,"name is required"]
        }
    ,
    
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        trim: true,
        lowercase: true,
    },
    password:{
        type:String,
        required:[true,"password is required"],
       
    },
    
    
    
    },{
    timestamps:true
})
userSchema.pre('save', async function(next){
    // only run this function if password was actually modified // next is a function that will be called after this function is done #middleware
  // this.isModified('password') this is a mongoose method that checks if the password is modified , True?false
  // false -  if the password is not modified
  // here false has ! revesrsed  to true
    if(!this.isModified('password')) return next()

    this.password= await bcrypt.hash(this.password, 10)
    next()
    
})
userSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password, this.password)

}

userSchema.methods.generateToken= function(){

    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        name: this.name,

     },
     process.env.TOKEN,
     {expiresIn:  process.env.TOKEN_EXPIRY},
     )

 }


export const User= mongoose.model("User",userSchema)



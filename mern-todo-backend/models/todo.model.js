import mongoose , {Schema} from "mongoose";

const todoSchema= new Schema(
    {
        content:{
            type:String,
            required:[true,"Content is required"]
        }
        ,
   isActive:{
type:Boolean,
default:true
        },
        user:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps:true
    }
)

export const Todo= mongoose.model("Todo",todoSchema)
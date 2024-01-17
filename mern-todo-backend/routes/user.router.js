import { Router } from "express";
import {  login, logout, getTodos, deleteTodo, register, addTodo,getUser} from "../controlers/user.conroler.js"
import { auth } from "../middlewares/auth.js";
const userRouter = Router();

userRouter.get("/new", (req, res) => {

    res
    .status(200)
    .json({
        message: "Hello from new user route"
    })

})

userRouter.route("/login").post(login)
userRouter.route("/logout").post(auth,logout)
userRouter.route("/register").post(register)
userRouter.route("/get-todo").get(auth,getTodos)
userRouter.route("/add-todo").post(auth,addTodo)
userRouter.route("/get-user").post(getUser)
userRouter.route("/delete-todo").delete(auth,deleteTodo)

export default userRouter;
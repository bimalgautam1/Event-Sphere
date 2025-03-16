import express, { Router } from 'express'
import userController from '../controllers/userController'
// import errorHandler from '../services/errorHandler'
const router:Router = express.Router()

// router.post("/register",UserController.register)
// router.get("/register",UserController.register)


router.route("/register").post(userController.register)
router.route("/login").post(userController.login)
router.route("/forget-password").post(userController.forgetPassword)

// router.route("/login").post(UserController.login)
// router.route("/forget-password").post(UserController.forgetPassword)


export default router  
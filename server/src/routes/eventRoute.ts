import express, { Router } from 'express'
import EventController from '../controllers/eventController'
import UserMiddleware, { Role } from '../middleware/userMiddleware'
// import errorHandler from '../services/errorHandler'
import { multer,storage } from "../middleware/multerMiddleware";
import errorHandeling from '../services/errorHandeling';
const upload = multer({storage:storage})
const router:Router = express.Router()


// router.post("/register",UserController.register)
// router.get("/register",UserController.register)


router.route("/")
.post(UserMiddleware.isUserLoggedIn,UserMiddleware.restrictTo(Role.Organizer),errorHandeling(upload.single("productImage")),errorHandeling(EventController.createNewEvent))

router.route("/get-all-users/:id").get(UserMiddleware.isUserLoggedIn,UserMiddleware.restrictTo(Role.Organizer),errorHandeling(EventController.getRegisteredUsers))

router.route("/get-registered-users/:id").get(UserMiddleware.isUserLoggedIn,UserMiddleware.restrictTo(Role.Organizer),errorHandeling(EventController.getRegisteredCount))

router.route('/get-total-users').get(UserMiddleware.isUserLoggedIn,UserMiddleware.restrictTo(Role.Organizer),errorHandeling(EventController.getTotalAttendees))

export default router  
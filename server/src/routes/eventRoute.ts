import express, { Router } from 'express'
import EventController from '../controllers/eventController'
import UserMiddleware, { Role } from '../middleware/userMiddleware'
// import errorHandler from '../services/errorHandler'
import { multer,storage } from "../middleware/multerMiddleware";
const upload = multer({storage:storage})
const router:Router = express.Router()


// router.post("/register",UserController.register)
// router.get("/register",UserController.register)


router.route("/").post(UserMiddleware.isUserLoggedIn,UserMiddleware.restrictTo(Role.Organizer),upload.single("productImage"),EventController.createNewEvent).get(EventController.getAllEvents)
router.route("/:id").get(EventController.getOneEvent)



export default router  
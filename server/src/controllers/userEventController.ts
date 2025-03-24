
import { Request,Response } from "express";
import sendResponse from "../services/sendResponse";
import Event from "../database/models/eventModel";
import User from "../database/models/userModel";
import UserEventRegister from '../database/models/userEventRegister'
import {IExtendedRequest} from '../middleware/userMiddleware';

// interface IRequest extends Request{
//     user:{
//         id:string,
//     }
// }

class UserEventController{
    async eventRegister(req:IExtendedRequest, res:Response):Promise<void>{
        const userId = req.user?.id
        const {eventId } = req.body

        if(!userId || !eventId){
            sendResponse(res,400,"Provide with UserId and EventId")
            return
        }
        console.log(userId,eventId)
        const userdata = await User.findOne({
            where:{
                id:userId
            },
            include:[{
                model:Event,
                where : {id:eventId}
            }]
        })

        if(userdata){
            sendResponse(res,400,"User may not be registered or event is not created")
            return
        }

        const userEventdata = await UserEventRegister.findOne({
            where:{
                userId,eventId
            }
        })
        if(!userEventdata){
        await UserEventRegister.create({
            userId,eventId
        })
        sendResponse(res,200,"User have registered a event")
        return
        }
    sendResponse(res,403,"User have already registered that event")

        
    }
    async cancelRegister(req:IExtendedRequest, res:Response):Promise<void>{
        const userId = req.user?.id
        const {eventId } = req.body

        if(!userId || !eventId){
            sendResponse(res,400,"Provide with UserId and EventId")
            return
        }
        console.log(userId,eventId);
        
        const userdata = await User.findByPk(userId)
        if(!userdata){
            sendResponse(res,400,"User may not be registered")
            return
        }
        const userEventdata = await UserEventRegister.findOne({
            where:{
                userId,eventId
            }
        })
        if(!userEventdata){
            sendResponse(res,400,"User may not have registered this event")
            return
        }
        await UserEventRegister.destroy({
            where:{userId,eventId}
        })
        sendResponse(res,200,"Event has been cancelled successfully")
       
        
    }
    async getAllEvents(req:IExtendedRequest,res:Response):Promise<void>{
        const datas = await Event.findAll({})
        if(datas.length===0){
            res.status(404).json({
                message:"Eventnot found"
            })
            return
        }
        res.status(200).json({
            message:"Event Found",
            datas
        })
    }
    async getOneEvent(req:IExtendedRequest,res:Response):Promise<void>{
        const {eventId} = req.body
        const datas = await Event.findOne({
            where:{
                id:eventId
            }
        })
        if(!datas){
            sendResponse(res,400,"Event not found")
            return
        }
        res.status(200).json({
            message:`Data retrived`,
            datas
        })
    }
}
export default new UserEventController


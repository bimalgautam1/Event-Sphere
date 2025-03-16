import { Request, Response } from "express";
import sendResponse from "../services/sendResponse";
import Event from "../database/models/eventModel";
import User from "../database/models/userModel";


// interface IEventRequest extends Request{
//     file:{
//         filename:string
//     }
// }
class EventController{
    async createNewEvent(req:Request, res:Response):Promise<void>{
        const{title,description,price,date,userId} = req.body

        const filename = req.file?.filename
        if(!filename){
            sendResponse(res,400,"Image not found")
            return
        }

        if(!title||!description||!date){
            sendResponse(res,400,"Please provide title,description,price,date,organizer_id")
        }
        await Event.create({
            title,
            description,
            price : price || "free",
            date,
            image_url : filename,
            userId : userId
        })
        sendResponse(res,200,"Data Successfully inserted")
    }
    async getAllEvents(req:Request,res:Response):Promise<void>{
        const datas = Event.findAll({
            include:{
                model:User
            }
        })
        sendResponse(res,200,"All the events are given here",datas)
    }
    async getOneEvent(req:Request,res:Response):Promise<void>{
        const {id} = req.params
        const datas = Event.findAll({
            where:{
                id:id
            },
            include:[
                {
                    model:User
                }
            ]
        })
        sendResponse(res,200,`Events organized by him/her are:`,datas)
    }

}
export default new EventController
import { BelongsTo, ForeignKey, Sequelize } from "sequelize-typescript";
import {config} from "dotenv"
import envConfig from "../config/config";
import User from './models/userModel'
import UserEventRegister from './models/userEventRegister'
import Event from "./models/eventModel";


config()
const sequelize = new Sequelize(envConfig.database_url as string, {
    dialect: "postgres",
    // models : [__dirname + '/models'],  // ✅ Register models
    models: [User, Event,UserEventRegister ],
    logging: false,  // ✅ Disable logging unless debugging
});
Event.belongsTo(User, { foreignKey: "organizerId" });  // ✅ Correct
User.hasMany(Event, { foreignKey: "organizerId" });    // ✅ Correct


UserEventRegister.belongsTo(User, { foreignKey: 'userId' });
UserEventRegister.belongsTo(Event, { foreignKey: 'eventId' });
User.hasMany(UserEventRegister, { foreignKey: 'userId' });
Event.hasMany(UserEventRegister, { foreignKey: 'eventId' });





export default sequelize 
import { BelongsTo, ForeignKey, Sequelize } from "sequelize-typescript";
import {config} from "dotenv"
import envConfig from "../config/config";
import User from './models/userModel'
import Event from "./models/eventModel";

config()
const sequelize = new Sequelize(envConfig.database_url as string, {
    dialect: "postgres",
    models : [__dirname + '/models'],  // ✅ Register models
    // models: [User, Event],
    logging: false,  // ✅ Disable logging unless debugging
});
Event.belongsTo(User, { foreignKey: "userId" });  // ✅ Correct
User.hasMany(Event, { foreignKey: "userId" });    // ✅ Correct



export default sequelize 
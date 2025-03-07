import { Sequelize } from "sequelize-typescript";
import {config} from "dotenv"
import envConfig from "../config/config";
import User from "./models/userModel";

config()
const sequelize = new Sequelize(envConfig.database_url as string, {
    dialect: "postgres",
    models: [User],  // ✅ Register models
    logging: false,  // ✅ Disable logging unless debugging
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully.");

        await sequelize.sync({ alter: false }); // ✅ Ensures models sync to DB
        console.log("✅ Database synchronized.");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
    }
});

export default sequelize 
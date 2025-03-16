import express from 'express';
import sequelize from './database/connection'; // Adjust the path as needed
import userRoute from './routes/userRoute'; // Adjust the path as needed
import eventRoute from './routes/eventRoute';

const app = express();
app.use(express.json());


(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully.");

        await sequelize.sync({  force:false,alter: false }); // ✅ Ensures models sync to DB
        console.log("✅ Database synchronized.");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
    }
})();

app.use('/api/auth', userRoute);
app.use('/api/event', eventRoute)


export default app



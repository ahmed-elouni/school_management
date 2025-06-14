import express from "express";
import { config } from "dotenv";
import cors from "cors";
import {dbConnection} from "./database/dbConnection.js";
import studentRouter from "./routers/StudentRouter.js";
import eventRouter from "./routers/eventRouter.js";
import classRouter from "./routers/classRouter.js";
import { ErrorHandlerCours } from './middlewares/ErrorHandlerCours.js';
import matiereRoutes from './routers/matiereRoutes.js';
import disciplineRoutes from './routers/disciplineRoutes.js';
import niveauRoutes from './routers/niveauRoutes.js';
import affectationRoutes from './routers/affectationRoutes.js';
import { errorHandler } from "./middlewares/errorHandler.js";
import emploiDuTempsRoutes from './routers/emploiDuTempsRoutes.js';
import examRoutes from './routers/examRoutes.js';
import performanceRoutes from './routers/performanceRoutes.js';
import teacherRoutes from './routers/teacherRoutes.js';
import attendanceRouter from "./routers/attendanceRouter.js";
import adminRegisterRouter from "./routers/adminRegisterRouter.js"
import announcementRouter from "./routers/announcementRouter.js";
import trimestreRoutes from "./routers/trimestreRoutes.js";
import AnneeScolaireRoutes from "./routers/anneeScolaireRoutes.js";
import usersRouter from "./routers/usersRouter.js"
const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

config({path: "./config/config.env"});
app.use((err,req,res,next)=>{
    errorHandler(err,req,res,next)
}
)
app.use (express.urlencoded({extended:true}));
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    next(err);
  });
app.use("/api/v1/students",studentRouter);
app.use("/api/v1/teachers", teacherRoutes);
app.use("/api/v1/events",eventRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1", adminRegisterRouter);
app.use('/api/v1/matieres', matiereRoutes);
app.use('/api/v1/disciplines', disciplineRoutes);
app.use('/api/v1/niveaux', niveauRoutes);
app.use('/api/v1/affectations', affectationRoutes);
app.use('/api/v1/emplois-du-temps', emploiDuTempsRoutes);
app.use('/api/v1/exams', examRoutes);
app.use('/api/v1/performance', performanceRoutes);
app.use('/api/v1/attendance', attendanceRouter);
app.use("/api/v1/trimestres", trimestreRoutes);
app.use("/api/v1/announcements", announcementRouter);
app.use("/api/v1/annees-scolaires", AnneeScolaireRoutes);


// Global error handler
app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

dbConnection();

export default app;

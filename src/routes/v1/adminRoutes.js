import express, { Router } from 'express'
import { isAdmin, isLoggedIn } from '../../middlewares/authMiddleware.js';
import { getAllUsersController } from '../../controller/userController.js';

const adminRouter = express.Router();

adminRouter.get("/users", isLoggedIn, isAdmin, getAllUsersController);

export default adminRouter;

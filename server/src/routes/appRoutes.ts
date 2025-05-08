import { Router } from 'express';
import usrRoute from './users/userRoutes'
import eventRoutes from './events/eventRoutes';
import commentRoutes from './Comment/CommentRoutes';

const allRoutes = Router();

allRoutes.use('/user', usrRoute);
allRoutes.use('/evento', eventRoutes);
allRoutes.use('/comment', commentRoutes);

export default allRoutes;
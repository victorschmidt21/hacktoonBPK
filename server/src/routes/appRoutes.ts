import { Router } from 'express';
import usrRoute from './users/userRoutes'
import eventRoutes from './events/eventRoutes';
import commentRoutes from './Comment/CommentRoutes';
import articlesRoutes from './articles/ArticlesRoutes';

const allRoutes = Router();

allRoutes.use('/articles', articlesRoutes);
allRoutes.use('/evento', eventRoutes);
allRoutes.use('/user', usrRoute);
allRoutes.use('/evento', eventRoutes);
allRoutes.use('/comment', commentRoutes);

export default allRoutes;
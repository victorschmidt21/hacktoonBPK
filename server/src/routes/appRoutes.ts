import { Router } from 'express';
import usrRoute from './users/userRoutes'
import eventRoutes from './events/eventRoutes';
import articlesRoutes from './articles/ArticlesRoutes';
import reviewRoutes from './reviews/ReviewRoutes';


const allRoutes = Router();

allRoutes.use('/articles', articlesRoutes);
allRoutes.use('/reviews', reviewRoutes);
allRoutes.use('/evento', eventRoutes);
allRoutes.use('/user', usrRoute);

export default allRoutes;
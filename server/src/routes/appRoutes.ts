import { Router } from 'express';
import usrRoute from './users/userRoutes'
import eventRoutes from './events/eventRoutes';
import articlesRoutes from './articles/ArticlesRoutes';


const allRoutes = Router();

allRoutes.use('/artigo', articlesRoutes);
allRoutes.use('/evento', eventRoutes);
allRoutes.use('/user', usrRoute);

export default allRoutes;
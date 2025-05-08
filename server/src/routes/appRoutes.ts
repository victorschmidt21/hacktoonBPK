import { Router } from 'express';
import usrRoute from './users/userRoutes'
import eventRoutes from './events/eventRoutes';

const allRoutes = Router();

allRoutes.use('/user', usrRoute);
allRoutes.use('/evento', eventRoutes);

export default allRoutes;
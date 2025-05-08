import express from "express";
import cors from 'cors';
import allRoutes from './routes/appRoutes';

const app = express();
const routes = allRoutes;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/', routes);

export default app;
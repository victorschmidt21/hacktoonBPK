import express from "express";
import cors from 'cors';
import allRoutes from './routes/appRoutes';

const app = express();
const routes = allRoutes;

app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: '*' }));
app.use('/', routes);

export default app;
import express, { type Application } from 'express';
import cors from 'cors';
import notFound from './middlewares/not-found.middleware';
import authRoutes from './modules/auth/auth.routes'
import issueRoutes from './modules/issue/issue.route'

const app : Application = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/auth',authRoutes);
app.use('/api/issues',issueRoutes);

app.use(notFound);

export default app;
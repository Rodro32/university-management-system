import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors'
import { userRoute } from './app/modules/user/user.route';
import globalErrorhandler from './app/midlewares/globalErrorHandler';
import notFound from './app/midlewares/notFound';
import { studentRoute } from './app/modules/student/student.route';
import router from './app/routes';
const app: Application = express()
const port = 3000;


app.use(express.json());
app.use(cors());

app.use('/api/v1',router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(globalErrorhandler);

app.use(notFound);


export default app;


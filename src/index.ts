import express, { Application } from 'express';
import modules from './modules';
import { handleError } from './middlewares/errorHandler';
import cors from 'cors';
require('dotenv').config();
const PORT: string | number = process.env.PORT || 5000;

const app: Application = express();

app.use(cors());
app.use(express.json());
modules.router.forEach((router) => app.use('/', router));
app.use(handleError);

app.listen(PORT, () => console.log(`Server run on PORT ${PORT}`)).on('error', (e) => console.log(e));

// strict false - to fix

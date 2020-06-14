import 'reflect-metadata';
import 'dotenv/config';

import { errors } from 'celebrate';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';
import routes from './routes';

import '../database';
import '@shared/container';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  console.error(err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀 server started on port 3333 !!! ');
});

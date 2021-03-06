import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import AppointmentsController from './app/controllers/AppointmentsConrtoller';

import authMiddleware from './app/middlewares/auth';
import ProviderController from './app/controllers/ProviderController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationsController from './app/controllers/NotificationsController';
import AvaliableController from './app/controllers/AvaliableController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/appointments', AppointmentsController.index);
routes.post('/appointments', AppointmentsController.store);
routes.delete('/appointments/:id', AppointmentsController.delete);

routes.get('/schedule', ScheduleController.index);
routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/avaliable', AvaliableController.index);

routes.get('/notifications', NotificationsController.index);
routes.put('/notifications/:id', NotificationsController.update);

export default routes;

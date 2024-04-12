import express from 'express';

import validateBody from '../helpers/validateBody.js';
import isEmptyBody from '../middlewares/isEmptyBody.js';
import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';
import { userRegisterSchema, userLoginSchema, userSubscriptionSchema } from '../models/User.js';
import {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} from '../controllers/auth-controller.js';

const authRouter = express.Router();

authRouter.post(
  '/register',
  upload.single('avatar'),
  isEmptyBody,
  validateBody(userRegisterSchema),
  register
);

authRouter.post('/login', isEmptyBody, validateBody(userLoginSchema), login);

authRouter.get('/current', authenticate, getCurrent);

authRouter.post('/logout', authenticate, logout);

authRouter.patch('/', authenticate, validateBody(userSubscriptionSchema), updateSubscription);

authRouter.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);

export default authRouter;

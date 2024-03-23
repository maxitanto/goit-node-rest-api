import express from 'express';

import validateBody from '../helpers/validateBody.js';
import isEmptyBody from '../middlewares/isEmptyBody.js';
import authenticate from '../middlewares/authenticate.js';
import { userRegisterSchema, userLoginSchema, userSubscriptionSchema } from '../models/User.js';
import {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} from '../controllers/auth-controller.js';

const authRouter = express.Router();

authRouter.post('/register', isEmptyBody, validateBody(userRegisterSchema), register);

authRouter.post('/login', isEmptyBody, validateBody(userLoginSchema), login);

authRouter.get('/current', authenticate, getCurrent);

authRouter.post('/logout', authenticate, logout);

authRouter.patch('/', authenticate, validateBody(userSubscriptionSchema), updateSubscription);

export default authRouter;

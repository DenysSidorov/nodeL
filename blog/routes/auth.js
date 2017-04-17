import express from 'express';
import * as AuthController from '../controllers/auth';

const router = express.Router();

router.post('/signin', AuthController.singin);
router.post('/signup', AuthController.singup);

export default router;
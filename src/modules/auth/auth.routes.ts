import express from 'express';
import *as authController from '../auth/auth.controller'
const router=express.Router();

router.post('/signup',authController.signup);

export default router
import express from 'express';
import { AuthController } from '../Controllers/auth.controller.js';
import verifyToken from '../Middleware/verifyToken.js';

const controller = new AuthController();

// makes router obejct
const router = express.Router();

router.post('/login', (req, res) => { controller.login(req,res) })
router.get('/protected', verifyToken, (req, res) => { controller.protected(req,res) })

export { router }
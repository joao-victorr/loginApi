import { Request, Response, Router } from 'express';

import * as loginController from "../controller/loginController";
import { privateRouter } from '../config/passport';

const router = Router();

router.get('/ping', (req, res) => {
    res.json({pong: true});
})

router.post('/login', loginController.loginPost);

router.post('/cadastro', loginController.cadastroPost);




export default router;
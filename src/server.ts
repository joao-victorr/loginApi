import express, { ErrorRequestHandler, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import Mustache from 'mustache-express';
import cookieParser from 'cookie-parser';
const socketIO = require('socket.io');
import { Socket } from 'socket.io';
import http from 'http';
import router from './routers/router';
import cors from 'cors';

const server = express();
const app = http.createServer(server);
const io = socketIO(app);

dotenv.config();

server.use(express.static(path.join(__dirname, "../public")));
server.use(express.urlencoded({extended: true}));
server.use(cookieParser());
server.use(express.json());

server.use(cors({
    origin: '*'
}));


server.set('view engine', 'mustache');
server.set('views', path.join(__dirname, 'views'));
server.engine('mustache', Mustache());

server.use(router)

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

    if (err.status) {
        res.status(err.status);
    } else {
        res.status(400); // Bad Request
    }

    if(err.message) {
        res.json({ error: err.message });
    } else {
        res.json({ error: 'Ocorreu algum erro.' });
    }
}
server.use(errorHandler);


app.listen(process.env.PORT);

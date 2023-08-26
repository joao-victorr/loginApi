import { Response, Request } from "express";

import { User, UserInstance } from "../models/users";
import { generateToken } from "../config/passport"


export const loginPost = async (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
        const user = await User.findOne({
            where: { 
                email: req.body.email,
            }
        });
        
        //if (user.length == 0) {
        //	res.json({status: 404, err: "dados incorreto"});
        //	return
        //}

        if (user) {
            if (user.password == req.body.password) {

                const token = generateToken({id: user.id, name: user.name});

                res.json({status: 200, id: user.id, name: user.name})
                return;
            }
        }
        res.json({status: 404, err: "dados incorreto"});
    }

    res.json({status: 404, err: "faltando dados"});
};

export const cadastro = async (req: Request, res: Response) => {
    res.render("cadastro")
};

export const cadastroPost = async (req: Request, res: Response) => {

    if (req.body.name && req.body.email && req.body.password) {
        const verifyEmail = await User.findOne({
            where: { email: req.body.email}
        })
        if (verifyEmail === null) {
            // cadastro o ususario
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            res.json({status: 201});
            return
        }
    }
    res.json({err: "dados insuficiente"});
    return
};

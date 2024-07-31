import jwt from "jsonwebtoken";
import Users from "../model/UserModel.js";

export const auth =async(req, res, next)=>{
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    const tokenUser = await Users.findOne({
        where : {
            token : token
        }
    });
    if(!tokenUser) return res.sendStatus(403);
    jwt.verify(tokenUser.token, 'hsfkjdshf49u539u5jshfkjhf94u5934', (error, decoded)=>{
        if(error) return res.sendStatus(403);
        req.id = decoded.userId;
        next();
    })
}
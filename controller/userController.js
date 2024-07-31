import Users from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async(req,res)=>{

    const{username, email, password} = req.body;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password,salt);
    try {
        await Users.create({
            username : username,
            email : email,
            password : hash
        })
        res.status(201).json({msg : "Success"})    
    } catch (error) {
        res.status(500).json(error);
    }
} 

export const getUsers = async(req, res)=>{
    try {
        const user = await Users.findOne({
            attributes:['id', 'username', 'email'],
            where : {
                id : req.id
            }
        });
        if(!user) return res.status(404).json({msg : "Not Found"});
        res.status(200).json({
            msg : "Success",
            data : user
        })
    } catch (error) {
        res.status(500).json(error);
    }
}

export const login = async(req, res)=>{
    const {email, password} = req.body;

    try {
        const login = await Users.findOne({
            where: {
                email:email
            }
        })
        if(!login) return res.status(404).json({msg : "email not found"});
        const match = await bcrypt.compare(password, login.password);
        if(!match) return res.status(403).json({msg: "wrong password"});
        const userId = login.id;
        const userUsername = login.username;
        const userEmail = login.email;
        const token = jwt.sign({userId, userUsername, userEmail}, 'hsfkjdshf49u539u5jshfkjhf94u5934',{
            expiresIn : '1h'
        });
        await Users.update({
            token: token
        },{
            where: {
                id: userId
            }
        })
        res.status(202).json({
            token : token, 
            msg: "anda telah login"
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

export const logout = async(req, res)=>{
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    try {
        const tokenUser = await Users.findOne({
            where : {
                token : token
            }
        });
        if(!tokenUser) return res.sendStatus(401);
        await Users.update({
            token : null
        },{
            where:{
                id : tokenUser.id
            }
        })
        res.status(200).json({msg : "Anda telah logout"});
    } catch (error) {
        res.status(500).json(error); 
    }
}
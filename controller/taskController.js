import Tasks from "../model/TaskModel.js";
import Users from "../model/UserModel.js";


export const getTask = async(req, res)=>{
    try {
        const task = await Tasks.findAll({
            attributes:['id', 'title', 'description', 'status'],
            where: {
                userId: req.id
            },
            include: [{
                model: Users,
                attributes:['username']
            }]
        })
        res.status(200).json({
            msg : "Success",
            data : task
        })
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getAllTask = async(req, res)=>{
    try {
        const task = await Tasks.findAll({
            attributes:['id', 'title', 'description', 'status'],
            include:[{
                model: Users,
                attributes: ['username']
            }]
        })
        res.status(200).json({
            msg: "Success",
            data: task
        })
    } catch (error) {
        res.status(500).json(error);
    }
}

export const createTask = async(req, res)=>{
    const {title, description, status} = req.body;
    try {
        await Tasks.create({
            title: title,
            description: description,
            status: status,
            userId: req.id
        })
        res.status(201).json({msg: "Success"});
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getTaskById = async(req, res)=>{
    try {
        const task = await Tasks.findOne({
            where: {
                id : req.params.id,
                userId : req.id
            },
            attributes:['id', 'title', 'description', 'status']
        })
        if(!task) return res.status(404).json({msg : "task not found"});
        res.status(200).json({
            msg : "Success",
            data : task
        })
    } catch (error) {
        res.status(500).json(error);
    }


}

export const updateTask = async(req, res)=>{
    const {title, description, status} = req.body;
    try {
        const task = await Tasks.findOne({
            where: {
                id : req.params.id,
                userId : req.id
            }
        })
        if(!task) return res.status(404).json({msg : "task not found"});
        await Tasks.update({
            title: title,
            description: description,
            status: status
        },{
            where : {
                id : task.id
            }
        })
        res.status(200).json({msg: "Update Success"});
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteTask = async(req, res)=>{
    const {title, description, status} = req.body;
    try {
        const task = await Tasks.findOne({
            where: {
                id : req.params.id,
                userId : req.id
            }
        })
        if(!task) return res.status(404).json({msg : "task not found"});
        await Tasks.destroy({
            where : {
                id : task.id
            }
        })
        res.status(200).json({msg: "delete Success"});
    } catch (error) {
        res.status(500).json(error);
    }
}


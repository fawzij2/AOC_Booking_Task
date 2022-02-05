const {UserType} = require("../../db/models/userType");



const addType = async (req,res) => {
    const {type, permissions} = req.body;

    const newUserType = new UserType({
        type,
        permissions
    })

    try {
        const createdUserType = await newUserType.save();
        res.status(201).json({
            message: "user type created",
            userType: createdUserType,
        })
    } catch (e) {
        res.status(500).json({message:e.message})
    }
}

const getType = async (req,res)=>{

    try {
        const foundType = await UserType.findById(req.token.userType);
        if (!foundType) {
            res.status(403).json({message: "forbidden"})
            return
        }
        res.status(200).json({
            message: "type send",
            userType: foundType.type
        })
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

module.exports = {
    addType,
    getType
}
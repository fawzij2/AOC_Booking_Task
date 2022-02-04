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


module.exports = {
    addType
}
const {Service} = require("../../db/models/service");


const addService = async (req,res) =>{
    const {name, serviceProvider, price, description, image} = req.body;

    const newService = new Service({
        name,
        serviceProvider,
        price,
        description,
        image
    })
    try {
        const createdService = await newService.save();
        res.status(201).json({
            message: "service created",
            service: createdService
        })
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

const getAllServices = async (req,res) => {
    try {
        const allServices = await Service.find();

        if (allServices.length === 0){
            res.status(404).json({message:"no services found"})
            return
        }

        res.status(200).json({
            message: "services found",
            services: allServices
        })
    }catch (e) {
        res.status(500).json({message:e.message})
    }
}

const searchServicesByName = async (req,res) => {
    const name = req.query.name
    try {
        const foundServices = await Service.find(
            {name: {$regex: name, $options: "i"}}
        )

        if(foundServices.length === 0 ){
            res.status(404).json({message: "no services match your search"})
            return
        }

        res.status(200).json({
            message:"services found",
            services: foundServices,
        });
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}


module.exports = {
    addService,
    getAllServices,
    searchServicesByName
}
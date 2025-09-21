const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const { v4: uuid } = require('uuid');

async function createFood(req, res) {
    try {
        /*console.log(req.foodPartner);
        console.log(req.body);
        console.log(req.file);*/

        const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

        // console.log(fileUploadResult);

        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner.id
        })

        res.status(201).json({
            message: 'Food created successfully.',
            food: foodItem
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

async function getFoodItem(req, res) {
    try {
        const foodItems = await foodModel.find();

        res.status(200).json({
            message: 'Food items fetched successfully',
            foodItems
        })
    } catch (err) {
        console.log(err),
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

module.exports = {
    createFood,
    getFoodItem
}
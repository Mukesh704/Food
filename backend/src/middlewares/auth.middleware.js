const foodPartnerModel = require('../models/foodPartner.model');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function authFoodPartnerMiddleware(req, res, next) {
    try {
        const token = req.cookies.token;

        if(!token) {
            return res.status(401).json({
                message: 'Please login first'
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            return res.status(401).json({
                message: 'Invalid Token'
            })
        }

        const foodPartner = await foodPartnerModel.findById(decoded.id);

        if(!foodPartner) {
            return res.status(402).json({
                error: 'Access Denied'
            })
        }

        req.foodPartner = foodPartner;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

async function authUserMiddleware(req, res, next) {
    try {
        const token = req.cookies.token;

        if(!token) {
            return res.status(401).json({
                mwssage: 'Please login first',
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            return res.status(401).json({
                message: 'Invalid Token'
            })
        }

        const user = await userModel.findById(decoded.id);

        if(!user) {
            return res.status(402).json({
                error: 'Access Denied'
            })
        }

        req.user = user;
        next();

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error',
        })
    }
}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware,
}
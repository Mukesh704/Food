const foodPartnerModel = require('../models/foodPartner.model')
const jwt = require('jsonwebtoken')

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
        req.foodPartner = foodPartner;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

module.exports = {
    authFoodPartnerMiddleware
}
const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodPartner.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    try {
        const {fullname, email, password} = req.body;

        const isAlreadyExist = await userModel.findOne({email: email});

        if(isAlreadyExist) {
            return res.status(400).json({
                message: 'User already exists.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            fullname,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET);

        res.cookie("token", token);

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                _id: user._id,
                email: user.email,
                fullname: user.fullname,
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

async function loginUser(req, res) {
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email});

        if(!user) {
            return res.status(400).json({
                message: 'Invalid email or password'
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(400).json({
                message: 'Invalid email or password'
            })
        }

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET);

        res.cookie("token", token);

        res.status(200).json({
            message: 'User logged in successfully',
            user: {
                _id: user._id,
                email: user.email,
                fullname: user.fullname
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: 'Internal Server Error',
        })
    }
}

async function logoutUser(req, res) {
    try {
        res.clearCookie("token");
        res.status(200).json({
            message: 'User logged out successfully.'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

async function registerFoodPartner(req, res) {
    try {
        const {name, email, password} = req.body;

        const isAlreadyExist = await foodPartnerModel.findOne({email: email});

        if(isAlreadyExist) {
            return res.status(400).json({
                message: 'Food Partner already exist, please login!'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const foodPartner = await foodPartnerModel.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({
            id: foodPartner._id
        }, process.env.JWT_SECRET);

        res.cookie("token", token);

        res.status(201).json({
            message: 'Food Partner registered successfully',
            user: {
                _id: foodPartner._id,
                email: foodPartner.email,
                fullname: foodPartner.fullname,
            }
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

async function loginFoodPartner(req, res) {
    try {
        const {email, password} = req.body;
        
        const foodPartner = await foodPartnerModel.findOne({email});

        if(!foodPartner) {
            return res.status(400).json({
                message: 'Invalid email or password'
            })
        }

        const isPasswordValid = bcrypt.compare(password, foodPartner.password);

        if(!isPasswordValid) {
            return res.status(400).json({
                message: 'Invalid email or password'
            })
        }

        const token = jwt.sign({
            id: foodPartner._id,
        }, process.env.JWT_SECRET);

        res.cookie("token", token);

        res.status(200).json({
            message: 'Food Partner logged in successfully',
            user: {
                _id: foodPartner._id,
                email: foodPartner.email,
                name: foodPartner.name
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

function logoutFoodPartner(req, res) {
    try {
        res.clearCookie("token");
        res.status(200).json({
            message: 'Food Partner logged out successfully.'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
}
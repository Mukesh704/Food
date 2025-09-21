const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodcontroller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');

const upload = multer({
    storage : multer.memoryStorage(),
})

router.post('/', authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood);
router.get('/', authMiddleware.authUserMiddleware, foodController.getFoodItem);

module.exports = router;
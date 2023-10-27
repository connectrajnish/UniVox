const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);

// whenever the path is '/post' then use following route which will redirect to corresponding controller's api
// router.use('/post',require('./post'));

router.use('/user',require('./user'));

module.exports=router;
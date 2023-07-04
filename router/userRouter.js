const express = require('express');
const router = express();
const {register, login} = require('../controller/userController');

const basePath = '/user';

router.post(`${basePath}/register`, register);
router.post(`${basePath}/login`, login);

exports.default = (app) => {
    app.use('/api', router);
};


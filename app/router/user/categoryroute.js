const express = require('express');
const routeLabel = require('route-label');
const categoryController = require('../../module/category/controller/controller');
// const { AdminuiAuth } = require('../../middleware/admin_auth/uiauth'); // For UI auth

// Initiallize the express router for router object
const router = express.Router();
const namedRouter = routeLabel(router);

// namedRouter.get('categorycount', '/user/categorycount', categoryController)

module.exports = router; 
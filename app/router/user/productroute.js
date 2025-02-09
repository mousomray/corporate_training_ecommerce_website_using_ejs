const express = require('express');
const uploadImage = require('../../helper/imagehandler') // Image area
const routeLabel = require('route-label');
const productController = require('../../module/product/controller/UserController');
const { UseruiAuth } = require('../../middleware/user_auth/uiauth'); // For UI auth

// Initiallize the express router for router object
const router = express.Router();
const namedRouter = routeLabel(router);

namedRouter.get('product', '/user/product', UseruiAuth, productController.showproduct)
namedRouter.get('productdetails', '/user/product/:id', UseruiAuth, productController.singleproduct)
namedRouter.get('catwiseproduct', '/user/categorywiseproduct/:id', UseruiAuth, productController.catwiseproduct)
namedRouter.get('usersearchproduct', '/user/searchproduct', UseruiAuth, productController.search)
namedRouter.get('pricefilter', '/user/pricefilter', UseruiAuth, productController.filterByPrice)
namedRouter.get('postorder', '/user/postorder/:id', UseruiAuth, productController.PostOrderGet)
namedRouter.post('postordercreate', '/user/postordercreate/:id', UseruiAuth, productController.PostOrderPost)
namedRouter.get('orderlist', '/user/orderlist', UseruiAuth, productController.OrderList)

module.exports = router;   
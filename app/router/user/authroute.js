const express = require('express');
const uploadImage = require('../../helper/imagehandler') // Image area
const routeLabel = require('route-label');
const authController = require('../../module/auth/controller/User.Controller');
const { UseruiAuth } = require('../../middleware/user_auth/uiauth'); // For UI auth
// Initiallize the express router for router object
const router = express.Router();
const namedRouter = routeLabel(router);

namedRouter.get('reglog', '/user/signin', authController.regLogGet)
namedRouter.post('signupcreate', '/user/signupcreate', uploadImage.single('image'), authController.signUpPost)
// namedRouter.get('otpverify', '/admin/otpverify', authController.otpVerifyGet)
// namedRouter.post('otpverifycreate', '/admin/otpverifycreate', authController.otpVerifyPost)
namedRouter.post('sigincreate', '/user/sigincreate', authController.signinPost)
namedRouter.get('signout', '/user/signout', authController.logout)
namedRouter.get('account', '/user/account', UseruiAuth, authController.profilepage)
// namedRouter.get('updatepassword', '/admin/updatepassword', AdminuiAuth, authController.updatepasswordGet)
// namedRouter.post('updatepasswordcreate', '/admin/updatepasswordcreate', AdminuiAuth, authController.updatepasswordPost)
// namedRouter.get('resetpasswordlink', '/admin/resetpasswordlink', authController.resetpasswordlinkGet)
// namedRouter.post('resetpasswordlinkcreate', '/admin/resetpasswordlinkcreate', authController.resetpasswordlinkPost)
// namedRouter.get('forgetpassword', '/admin/forgetpassword/:id/:token', authController.forgetPasswordGet)
// namedRouter.post('forgetpasswordcreate', '/admin/forgetpasswordcreate/:id/:token', authController.forgetPasswordPost)

module.exports = router; 
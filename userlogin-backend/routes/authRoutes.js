const {Router} = require('express');
const authController = require('../controllers/authControllers');

const router = Router();

router.get('/user/verify/:userID/:uniqueString', authController.verify_get);
router.post('/api/pwdreset/:email?', authController.pwdReset_post);
router.get('/api/user/verified', authController.verified_get);
router.get('/api/orders', authController.orders_get);
router.post('/api/login', authController.login_post);
router.post('/api/signup', authController.signup_post)
router.post('/api/forgetPwd', authController.forgetpwd_post);
router.get('/api/logout', authController.logout_get);

module.exports = router;
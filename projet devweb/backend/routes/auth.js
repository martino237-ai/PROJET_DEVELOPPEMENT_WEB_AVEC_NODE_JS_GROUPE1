const express=require('express');
const router=express.Router(); 
const controllerauth=require('../controllers/auth');
const authMiddleware = require('../controllers/authMiddleware');

router.post('/register',controllerauth.register);
router.post('/login',controllerauth.login); 
router.get('/me', authMiddleware, controllerauth.getProfil);

module.exports=router;
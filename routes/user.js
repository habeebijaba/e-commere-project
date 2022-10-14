var express = require('express');
var router = express.Router();
const userHelper=require('../helpers/user-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user/index', { });
});
router.get('/signup',(req,res)=>{
  res.render('user/user_signup',{})
})
router.post('/signup',(req,res)=>{
  userHelper.userSignup(req.body).then((response)=>{
    res.redirect('/login')
  })
})

router.get('/login',(req,res)=>{
  res.render('user/user_login',{loginError: req.session.loginError,blockError:req.session.blockError})
  req.session.loginError = false
  req.session.blockError=false


})
router.post('/login',(req,res)=>{
  userHelper.userLogin(req.body).then((response)=>{

    if(response.isBlocked){
      req.session.blockError=true
      res.redirect('/login')
    }else{

    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      req.session.loginError=true
      res.redirect('/login')
    }}
  })
})


router.get('/view-products',(req,res)=>{
  res.render('user/view_products',{})
})

module.exports = router;

var express = require('express');
const { Db } = require('mongodb');
const { response } = require('../app');
const adminHelpers = require('../helpers/admin-helpers');
var router = express.Router();
const adminHelper = require('../helpers/admin-helpers')



// const setAdminLayout=(req,res,next)=>{
// res.locals.layout='adminlayout'
// next()
// }
// router.use(setAdminLayout)

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('admin/dashboard', { admin: true })
});
router.get('/login', (req, res, next) => {
  res.render('admin/admin_login', { admin: true })
})
router.post('/login', (req, res) => {
  adminHelper.adminLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.admin = response.user
      res.redirect('/admin')

    } else {
      res.redirect('/admin/login')
    }

  })

})

router.get('/user-management', (req, res, next) => {
  adminHelpers.getAllUsers().then((allUsers) => {
    // console.log(allUsers);
    res.render('admin/user_management', { admin: true, allUsers })

  })
})

  router.get('/block-user/:_id', (req, res) => {
    let id = req.params._id
    console.log(id);
    adminHelpers.blockUser(id).then((response) => {
      console.log(response);
      res.redirect('/admin/user-management')
    })
  })
  router.get('/unblock-user/:_id',(req,res)=>{
    let id=req.params._id
    adminHelpers.unblockUser(id).then((response)=>{
      res.redirect('/admin/user-management')
    })
  })






router.get('/product-management', (req, res, next) => {
  res.render('admin/product_management', { admin: true })
})

router.get('/category-management', (req, res) => {
  res.render('admin/category_management', { admin: true })

  router.get('/add-category', (req, res) => {
    res.render('admin/add_category', { admin: true })
  })



})
router.get('/add-product', (req, res) => {
  res.render('admin/add_product', { admin: true })
})
module.exports = router;

var express = require('express');
const { Db } = require('mongodb');
const { response } = require('../app');
const { getAllCategories } = require('../helpers/admin-helpers');
const adminHelpers = require('../helpers/admin-helpers');
var router = express.Router();
const adminHelper = require('../helpers/admin-helpers')
const productHelper = require('../helpers/product-helpers')
var fs = require('fs')



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
router.get('/unblock-user/:_id', (req, res) => {
  let id = req.params._id
  adminHelpers.unblockUser(id).then((response) => {
    res.redirect('/admin/user-management')
  })
})

router.get('/category-management', (req, res) => {
  adminHelper.getAllCategories().then((allCategories) => {
    res.render('admin/category_management', { admin: true, allCategories })


  })

})

router.get('/add-category', (req, res) => {
  res.render('admin/add_category', { admin: true, CategoryRedundanyError: req.session.CategoryRedundanyError })
  req.session.CategoryRedundanyError = false
})
router.post('/add-category', (req, res) => {
  adminHelper.addCategory(req.body).then((response) => {
    // console.log(response);
    if (response.status) {
      res.redirect('/admin/category-management')
    } else {
      req.session.CategoryRedundanyError = true
      res.redirect('/admin/add-category')
    }


  })
})
router.get('/delete-category/:_id', (req, res) => {
  let id = req.params._id
  adminHelper.deleteCategory(id).then((response) => {
    res.redirect('/admin/category-management')

  })
})



router.get('/product-management', (req, res, next) => {
  productHelper.getAllProducts().then((allProducts) => {


    res.render('admin/product_management', { admin: true, allProducts })

  })
})


router.get('/add-product', (req, res) => {
  adminHelper.getAllCategories().then((allCategories) => {
    res.render('admin/add_product', { admin: true, allCategories })

  })
})
router.post('/add-product', (req, res) => {
  productHelper.addProduct(req.body).then((response) => {
    let id = response.insertedId
    let image1 = req.files.image1
    let image2 = req.files.image2
    let image3 = req.files.image3
    let image4 = req.files.image4
    image1.mv('./public/product-images/' + id + '1.jpg')
    image2.mv('./public/product-images/' + id + '2.jpg')
    image3.mv('./public/product-images/' + id + '3.jpg')
    image4.mv('./public/product-images/' + id + '4.jpg')

    res.redirect('/admin/add-product')


  })


})
router.get('/delete-product/:id', (req, res) => {
  let id = req.params.id
  console.log(id);
  productHelper.deleteProduct(id).then(() => {
    res.redirect('/admin/product-management')
    fs.unlinkSync('public/product-images/' + id + '1.jpg')
    fs.unlinkSync('public/product-images/' + id + '2.jpg')
    fs.unlinkSync('public/product-images/' + id + '3.jpg')
    fs.unlinkSync('public/product-images/' + id + '4.jpg')
  })
})

router.get('/edit-product/:id',(req,res)=>{
  let id=req.params.id
  productHelper.getProductDetails(id).then((productDetails)=>{
    res.render('admin/edit-product',{productDetails})
  })
})








module.exports = router;

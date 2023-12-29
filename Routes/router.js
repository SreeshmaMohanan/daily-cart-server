const express=require('express')
const productController=require('../Controllers/productController')
const userController=require('../Controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const wishlistController=require('../Controllers/wishlistController')
const cartController=require('../Controllers/cartController')
const router =new express.Router();
//get all products
router.get('/products/all',productController.getAllProductsController)
// register
router.post("/user/register",userController.registerController)
//login
router.post("/user/login",userController.loginController)
//get a single product
router.get("/product/get/:id",productController.getProductController)
// add to wishlist
router.post('/wishlist/add',jwtMiddleware,wishlistController.addToWishlistCotroller)
//get wishlist
router.get('/wishlist/get-allproducts',jwtMiddleware,wishlistController.getWishlistController)
//delete from wishlist
router.delete('/wishlist/remove/:id',jwtMiddleware,wishlistController.removeWishlistItemController)
//add to cart
router.post('/cart/add',jwtMiddleware,cartController.addToCartController)
//get cart
router.get('/cart/get-all-products',jwtMiddleware,cartController.getCartItemsController)
//increment cart
router.get('/cart/increment/:id',jwtMiddleware,cartController.incQuantityController)
//decrement cart
router.get('/cart/decrement/:id',jwtMiddleware,cartController.decQuantityController)
// delete from cart
router.delete('/cart/remove/:id',jwtMiddleware,cartController.removeCartItemController)
//emptycart
router.delete('/cart/empty',jwtMiddleware,cartController.emptyCartController)


module.exports=router
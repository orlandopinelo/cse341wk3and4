const router = require("express").Router();
const productControllers = require('../controllers/products')
const {isAuthenticated} = require("../utilities/authenticate");


router.get('/', productControllers.getAllProducts)
router.get('/:id', productControllers.getSingleProduct)
router.post('/',isAuthenticated, productControllers.createProduct);
router.put('/:id', isAuthenticated, productControllers.updateProduct);
router.delete('/:id', isAuthenticated, productControllers.deleteProduct);


module.exports = router
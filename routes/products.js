const router = require("express").Router();
const productControllers = require('../controllers/products')


router.get('/', productControllers.getAllProducts)
router.get('/:id', productControllers.getSingleProduct)
router.post('/', productControllers.createProduct);
router.put('/:id', productControllers.updateProduct);
router.delete('/:id', productControllers.deleteProduct);


module.exports = router
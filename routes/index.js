const router = require("express").Router();
router.use('/', require('./swagger'));
router.use('/customers', require('./customers'));
router.use('/products', require('./products') );


module.exports = router;
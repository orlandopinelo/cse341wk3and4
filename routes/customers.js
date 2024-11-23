const router = require("express").Router();
const customerControllers = require('../controllers/customers')


router.get('/', customerControllers.getAllCustomers)
router.get('/:id', customerControllers.getSingleCustomer)
router.post('/', customerControllers.createCustomer);
router.put('/:id', customerControllers.updateCustomer);
router.delete('/:id', customerControllers.deleteCustomer);


module.exports = router
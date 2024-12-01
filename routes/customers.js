const router = require("express").Router();
const customerControllers = require('../controllers/customers')
const {isAuthenticated} = require("../utilities/authenticate");


router.get('/', customerControllers.getAllCustomers)
router.get('/:id', customerControllers.getSingleCustomer)
router.post('/', isAuthenticated, customerControllers.createCustomer);
router.put('/:id', isAuthenticated, customerControllers.updateCustomer);
router.delete('/:id', isAuthenticated, customerControllers.deleteCustomer);


module.exports = router
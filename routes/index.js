const router = require("express").Router();
router.use('/', require('./swagger'));
router.use('/customers', require('./customers'));
router.use('/products', require('./products') );
const passport = require('passport');

router.get('/login', passport.authenticate('github'), (req, res) =>{});

router.get('/logout', function(req, res, next){
    req.logout(function(err){
        if (err){return next(err);}
        res.redirect('/');
    });
});

module.exports = router;
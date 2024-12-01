const isAuthenticated = (req, res) =>{
    if (req.session.user === undefined){
        return res.status(401).json("You do not have access.")
    }
};
module.exports = {isAuthenticated}
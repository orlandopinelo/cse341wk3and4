
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('./data/connection');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

dotenv.config();
const app = express();


const port = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,

}))
.use(passport.initialize())
.use(passport.session())
.use((req,res,next) =>{
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader(
         'Access-Control-Allow-Headers',
         'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
     );
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
     next();
    
})
.use(cors({ methods: ['GET' ,'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
.use(cors({origin: '*'}))
.use("/", require("./routes/index"))

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function(accessToken,refresToken,profile,done){
        return done(null,profile);
    }
))

passport.serializeUser((user, done) =>{
    done(null, user);
});
passport.deserializeUser((user, done) =>{
    done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out" )});
app.get('/github/callback', passport.authenticate('github',{
failureRedirect: '/api-docs', session: false}),
(req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
//     );
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     next();
// });
 

// Connect to MongoDB
connectDB(); 

// Routes
//app.use('/', require('./routes'));

// Start the Server After Successful Connection
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});

// Handle Connection Errors
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

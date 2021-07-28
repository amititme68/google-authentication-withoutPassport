const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');

const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID =process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

router.get('/login',(req,res)=>{
    res.render('login');
});

router.post('/login',(req,res)=>{
    const token = req.body.token;

    console.log(token);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];// if we are using database in our app you will use sub key from payload to 
        //register your user within your application 
        console.log(payload);
    }
      verify()
      .then(()=>{ 
        res.cookie('session-token',token);
        res.send('success');
       })
      .catch(console.error);
});


router.get('/dashboard',auth,(req,res)=>{
    let user = req.user;
    res.render('dashboard',{user});
});

router.get('/protectedroute',auth,(req,res)=>{
    res.render('protectedroute');
});

router.get('/logout',(req,res)=>{
    res.clearCookie('session-token');// it will clear the cookie from the session and
    res.redirect('/login'); // then redirect back to login route
});

module.exports = router;
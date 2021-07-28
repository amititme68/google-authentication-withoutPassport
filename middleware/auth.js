module.exports = function (req,res,next){
    const {OAuth2Client} = require('google-auth-library');
    const CLIENT_ID =process.env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(CLIENT_ID);
    let token = req.cookies['session-token'];
    // it allows us to look into cookies that comes into request which we created above
    let user = {};
    async function verify(){
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,// client id of app that access the backend
        });
        const payload = ticket.getPayload();// from the payload we get access to user 
        user.name = payload.name;   // setting this to user object
        user.email = payload.email;
        user.picture = payload.picture;
    }
    verify().then(()=>{
        req.user = user;
        next();
    }).catch(err=>{
        res.redirect('/login');// if without login if we try to access dashboard route you will
        // be redirected to login page
    })
}
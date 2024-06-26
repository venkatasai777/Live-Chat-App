
const jwt = require('jsonwebtoken')
const AsyncHandler = require('express-async-handler')

const protect = AsyncHandler(async (req, res, next) => {
    let token ;
    try {
        token = req.headers.authorization
        const decoded = await jwt.verify(token, process.env.SECRET_KEY)
        
            next()
      
    }catch(e) {
        console.log(e)
        res.status(401).json({message: "Not Authorized"})
    }
});

module.exports = protect
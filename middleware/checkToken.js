const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    console.log(req.path);
    const pathList = ['/api/user/login', '/api/user/register'];
    let check = pathList.includes(req.path);
    if (check) {
        next();
    } else {
        const token = req.headers.authorization?.split(' ')[1];
        console.log(token);
        if (!token) {
            res.status(200).json({
                error: true,
                message: 'Auth token required',
            });
            return;
        }
        jwt.varify(token,'12345',(err,decoded)=>{
            if(err){
             return res.status(200)
             .send({
                error:true,
                message:"Token Required"
            })
            }
            const query = 
            "SELECT * FROM users WHERE token = ?";
            db.query(query,[token],(err,results)=>{
                if(err){
                    console.log(err);
                    return;
                }
                if(results){
                    next();
                }
            })
        })

    }
};

module.exports = checkToken;

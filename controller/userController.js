const db = require('../lib/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//Register Section
const register = (req, res) => {
    const data = req.body;

    const authToken = jwt.sign(
        {email: data.email, username: data.username},
        '12345',
        {
            expiresIn: '24h',
        }
    );
    const hash = bcrypt.hashSync(data.password,15);
    data.password = hash;

    data.token = authToken;

    const query =
        'INSERT INTO users (username,email,password,token) values (?,?,?,?)';

    db.execute(
        query,
        [data.username, data.email, data.password, data.token],
        (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            res.status(200).json({
                error: false,
                message: 'user register successfully',
                data: {
                    id: result.insertId,
                    ...req.body,
                    authToken,
                },
            });
        }
    );
};
//Login section
const login = (req, res) => {
   
    const {email,password} = req.body;
    // return req.body;
    const token = jwt.sign(
   
        {email},"12345",{ expiresIn:"24hr"}
    )
    const query =
        'SELECT * FROM users WHERE email = ? ';
    db.query(query, [email], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        if(result.length === 0){
            console.log("Invalid Email or passoword");
            return;
        }else{
            const user = result[0];
            if(user && bcrypt.compareSync(password,user.password)){
                const query = "update users set token = ? where id=?";
                const values = [token,user.id];
                db.query(query,values, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
        
                    res.status(200).json({
                        error: false,
                        message: 'user login successfully',
                        data: {
                            id: result.insertId,
                            ...user,
                            token:token
                        },
                    });
                });

            }else{
                console.log("Incorrect Password");
            }
        }

       
       
       
       
    });
};

module.exports = {register, login};

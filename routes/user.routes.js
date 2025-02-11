const express = require('express')
const router = express.Router()
//express-validator
const {body , validationResult} = require('express-validator')
// user-model schema 
const userModel = require('../models/user.models')
// password ko hashing mein convert karna 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/register',
    body('email').trim().isEmail(),
    body('password').trim().isLength({min:6}),
    body('username').trim().isLength({min:4}),
   async  (req,res)=>{
        const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
            message: "Invalid Data",
        })
    }

    const{ email , username , password } = req.body ; 

    //bcrypt-concept 
    const hashpassword = await bcrypt.hash(password,10)
    
   
    const newUser = await userModel.create({
        email,
        username,
        password: hashpassword
    })
    
    console.log(newUser);
    
    res.json(newUser)
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/login',
    body('username').trim().isLength({min:3}),
    body('password').trim().isLength({min:5}),
    async (req,res)=>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:'Invalid data'
            })
        }

        const {username , password } = req.body;

        // read operation
        const user = await userModel.findOne({
            username : username
        })

        if(!user){
            return res.status(400).json({
                message :'username or password is  incorrect'
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({
                message :'username or password is incorrect'
            })
        }

        //jwt 
        const token = jwt.sign({
            userId : user._id,
            email: user.email,
            username: user.username
        },
        process.env.JWT_SECRET,
    )

    res.cookie('token',token)

    res.send('Logged In')


    }
)


module.exports = router 
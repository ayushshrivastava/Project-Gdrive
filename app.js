const express = require('express')
const userRouter = require('./routes/user.routes')

const dotenv = require('dotenv')
const connectToDB = require('./config/db')
const cookieParser = require('cookie-parser');
// environmental variable 
dotenv.config();
//connection set up 
connectToDB()
const app = express()

const indexRouter = require('./routes/index.route')

//ejs setup 
app.set('view engine','ejs');

app.use(cookieParser())

//builtin middleware 
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/',indexRouter)

// --> /user/register 
app.use('/user',userRouter)

app.listen(3000,()=>{
    console.log("Server is running");
    
})
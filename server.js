require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const {format} =  require('date-fns');
const {v4: uuid} = require('uuid');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;
const ejs = require('ejs');
const connectDB = require('./config/dbconfig');
const session = require('express-session'); 
const store = new session.MemoryStore();
const {isAuthUser,isAuthEmployee,isAuthEmployeeAndUser} =  require('./middlewares/auth');

const connection = connectDB();

app.set('view engine','ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.DATABASE_SECRET,
    name:process.env.DATABASE_NAME,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*3600
    },
    store
}));

app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/',require('./routes/root'));
app.use('/login',require('./routes/login'));
app.use('/logout',isAuthEmployeeAndUser,require('./routes/logout'));
app.use('/register',require('./routes/register'));
app.use('/books',require('./routes/books'));
app.use('/emplLogin',require('./routes/employeeLogin'));
app.use('/myAccount',isAuthEmployeeAndUser,require('./routes/myAccount'));
app.use('/employee',isAuthEmployee,require('./routes/employee'));
app.use('/employee/register',isAuthEmployee,require('./routes/employeeRegister'));
app.use('/employee/books',isAuthEmployee,require('./routes/employeeBooks'));
app.use('/employee/sales',isAuthEmployee,require('./routes/employeeSales'));
app.use('/employee/rent',isAuthEmployee,require('./routes/employeeRent'));

mongoose.connection.once('open',()=>{
    console.log('connected to mongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

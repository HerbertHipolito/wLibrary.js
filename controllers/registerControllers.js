const path =  require('path');
const users = require('../model/users');
const bcrypt = require('bcrypt');
const tagsControllers =  require('../controllers/tagsController');

const getRegisterController = (req,res) =>{
    
    if(req.session.authenticated){
        console.log('You are already logged');
        return  res.redirect('/');
    }

    tagsControllers(['header','bodyRegisUser','footer']).then(
        (tags) => {    
            res.render(path.join('..','views','register'),{
                header:tags['header'],
                body:tags['bodyRegisUser'],
                footer:tags['footer']
            });
        }
    )
}

const postRegisterController = async (req,res) =>{

    if(req.session.authenticated){
        console.log('You are already logged');
        return  res.redirect('/');
    }
    
    if (!req.body?.fullName || !req.body?.pwd || !req.body?.login) return res.status(400).json({'message':'The required Data are missing'});
    
    try{

        const duplicate = await users.findOne({login:req.body.login});
        if (duplicate) return res.status(409).json({'message':'The Login already exists.'});

        const hashedPassword = await bcrypt.hash(req.body.pwd,10);

        const result = await users.create({
            "fullname":req.body.fullName,
            "login":req.body.login,
            "pwd":hashedPassword,
            "country":req.body.country,
            "adress":req.body.adress,
            "role":1997
        });
        console.log('The count has been created sucessfully');
        return res.redirect('/');

    }catch(error){ 
        console.log(error);
        return res.status(400).json({'message':'deu merd4'});
    }
    
}


module.exports = {getRegisterController,postRegisterController};
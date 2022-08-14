const path = require('path');
const tagsController = require('../controllers/tagsController');
const {getEmployeesByNameAndMatch}  = require('../routes/api/employee');

const getEmplLoginController = (req,res) =>{
   
    if(req.session?.authenticated){
        console.log('You are already logged');
        return res.redirect('/');
    }
    else{
        tagsController(['headerLoginUser','bodyEmployee','footer']).then(
            (tags)=>{
                res.render(path.join('..','views','login'),{
                    header:tags['headerLoginUser'],
                    body:tags['bodyEmployee'],
                    footer:tags['footer']
                    }
                )
            }
        )
    }
}

const postEmplLoginController = (req,res) =>{

    if(req.session?.authenticated){
        console.log('You are already logged');
        return res.redirect('/');
    }

    if(!req.body.login || !req.body.pwd ){
        return res.status(400).json({'message':'data missing'});
    }
    
    getEmployeesByNameAndMatch(req.body.login,req.body.pwd,res).then(
        (user)=>{

            if(!user) return res.status(401).json({'message':'The password is wrong'});
            
            const login = user.login;
            const name =  user.fullname;
            const role = user.role;

            req.session.authenticated = true;
            req.session.user = {
                login,
                name,
                role
            };
            
            res.redirect('../employee');
        }   
    )

}

module.exports = {getEmplLoginController,postEmplLoginController};
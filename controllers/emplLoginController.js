const path = require('path');
const tagsController = require('../controllers/tagsController');
const {getEmployeesByNameAndMatch}  = require('../routes/api/employee');

const getEmplLoginController = (req,res) =>{

    if(req.session?.authenticated){
        console.log('You are already logged');
        return res.redirect('/');
    }
    else{
        tagsController(['headerLogin','bodyUser','footer']).then(
            (tags)=>{
                res.render(path.join('..','views','login'),{
                    header:tags['headerLogin'],
                    body:tags['bodyUser'],
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
            /*
            tagsController(['headerLoggedEmpl','footer']).then((tags)=>{

                res.render(path.join('..','views','index'),{
                    header:tags['headerLoggedEmpl'],
                    footer:tags['footer']
                })

            })
            */
            res.redirect('../employee');
        }   
    )

}

module.exports = {getEmplLoginController,postEmplLoginController};
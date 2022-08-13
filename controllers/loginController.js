const path = require('path');
const tagsController = require('../controllers/tagsController');
const {getAllUsers,getUsersByNameAndMatch} = require('../routes/api/user');

const getLoginController = (req,res)=>{

    if(req.session.authenticated){
        return res.redirect('/');
    }

    var header = 'headerLoginUser';    

    tagsController([header,'bodyUser','footer']).then((tags)=>{
        res.render(path.join('..','views','login'),{
            header:tags[header],
            footer:tags['footer'],
            body:tags['bodyUser']
                }
           )  
        }
    )
    
}

const postLoginController = (req,res)=>{

    if(req.session.authenticated){
        console.log(req.sessionID);
        return res.redirect('/');

    }else{
        
        if(!req.body.pwd || !req.body.login ) return res.status(400).json({'message':'login or/and pwd are missed'});
        
        getUsersByNameAndMatch(req.body.login,req.body.pwd,res).then((user)=>{

            if(!user) return res.status(401).json({'message':'login or password invalid'});

            const login = user.login;
            const name =  user.fullname;
            const role = user.role;
            
            req.session.authenticated = true;
            req.session.user = {
                login,
                name,
                role
            };
            
            tagsController(['headerLogin','footer']).then((tags)=>{
                res.render(path.join('..','views','index'),{
                    header:tags['headerLogin'],
                    footer:tags['footer']
                });
            })
        });
    }

}

module.exports = {getLoginController,postLoginController};
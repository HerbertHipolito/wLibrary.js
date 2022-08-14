const isAuthUser = (req,res, next)=>{
    (req.session.authenticated&&req.session.user.role === 1997)?next():res.status(400).json({'message':'unauthorized access from middleware'});
}

const isAuthEmployee = (req,res,next)=>{
    (req.session.authenticated&&req.session.user.role === 1964)?next():res.status(400).json({'message':'unauthorized access from middleware'});
}

const isAuthEmployeeAndUser = (req,res,next)=>{
    
    if(req.session.authenticated && (req.session.user.role === 1964 || req.session.user.role === 1997)){
        next()
    }else{
        return res.status(400).json({'message':'unauthorized access from middleware'});
    }
}

module.exports = {isAuthUser,isAuthEmployee,isAuthEmployeeAndUser};
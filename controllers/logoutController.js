
const logoutController = (req,res) =>{

    if(req.session.authenticated){
        req.session.destroy((error)=>{
            
            res.clearCookie('jonh cena');
            res.redirect('/');

        });
    }else{
        console.log('You are not logged.');
        return res.redirect('/');
    }

}


module.exports = logoutController;
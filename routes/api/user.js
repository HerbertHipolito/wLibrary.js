const path = require('path');
const users = require('../../model/users');
const bcrypt = require('bcrypt');

const getAllUsers = async (req,res)=>{

    const results = await users.find();
    if (!results) res.status(404).json({'message':'error'});
    return results;

}

const getUsersByNameAndMatch = async (login,pwd,res) =>{

    const usersSelected = await users.findOne({login:login});
    
    if  (!usersSelected?.pwd) return res.status(400).json({'message':'Login not found '});

    const match = await bcrypt.compare(pwd, usersSelected.pwd);
    
    if (!match) return null;

    return usersSelected;

}

module.exports = {getAllUsers,getUsersByNameAndMatch}


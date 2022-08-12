const bcrypt = require('bcrypt');
const employees = require('../../model/employees');
const path = require('path');


const getEmployeesByNameAndMatch = async (login,pwd,res) =>{

    const employeeFound = await employees.findOne({login:login});

    if(!employeeFound?.pwd) return res.status(400).json({'message':'Login or password are wrong'});
    console.log(employeeFound);
    const match = await bcrypt.compare(pwd, employeeFound.pwd);
    
    if (!match) return res.status(400).json({'message':'Login or password are wrong'});

    return employeeFound;

}

module.exports = {getEmployeesByNameAndMatch}
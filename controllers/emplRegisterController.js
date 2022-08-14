const employees = require('../model/employees');
const path = require('path');
const tagsController = require('../controllers/tagsController');
const bcrypt = require('bcrypt');

const getRegisterController = (req, res) => {

    tagsController(['headerLogin', 'bodyRegisEmployee', 'footer']).then(
        (tag) => {
            res.render(path.join('..', 'views', 'register'), {
                header: tag['headerLogin'],
                body: tag['bodyRegisEmployee'],
                footer: tag['footer']
            })
        }
    )

}

const postRegisterController = async (req, res) => {

    const { fullName, pwd, login, job } = req.body;

    if (!fullName || !pwd || !login || !job) {
        return res.status(400).json({ 'message': 'Data missing' });
    }
    try {

        const duplicate = await employees.findOne({ login: login });

        if (duplicate) return res.status(400).json({ 'message': 'login unavaliable' });

        const hashedPwd = await bcrypt.hash(pwd, 10);

        const result = await employees.create({
            'login': login,
            'fullname': fullName,
            'pwd': hashedPwd,
            'role': 1964,
            'job': job
        });

        return res.status(200).json({ 'message': 'The account has sucessfully been created' });

    } catch (error) {
        console.log(error);
    }

}

module.exports = { getRegisterController, postRegisterController };
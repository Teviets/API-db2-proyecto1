const UserSchema = require('../models/User');

const Register = async(req, res) => {
    const user = new UserSchema(req.body);
    await user
        .save()
        .then((data)=> res.json(data))
        .catch((error)=> res.json(error));
};

const Login = async(req, res) => {
    const { correo, contraseña } = req.body;
    await UserSchema.findOne({ correo, contraseña })
        .then((data)=> res.json(data))
        .catch((error)=> res.json(error));
}

const getUserByID = async(req, res) => {
    const { id } = req.query;
    await UserSchema.findOne({ _id: id })
        .then((data)=> res.json(data))
        .catch((error)=> res.json(error));
}



module.exports = {
    Register,
    Login,
    getUserByID
}

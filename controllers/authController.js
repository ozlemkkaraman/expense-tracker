const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(409).json({message: "user already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({message: "user created successfully"})
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
};

const login = async (req,res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "invalid email or password"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(404).json({message: "invalid email or password"})
        }
        const token = jwt.sign(
            {id: user._id}, 
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );
        res.status(200).json({token});
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
};

module.exports = {
    register,
    login
};

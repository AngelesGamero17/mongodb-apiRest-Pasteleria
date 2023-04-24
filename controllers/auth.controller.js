import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { generateToken } from '../utils/tokenManager.js';

export const register = async(req, res) =>{
    const{ email, password } = req.body;
    try {

        //alternativa buscando por email
        let user = await User.findOne({email})
        if(user)throw({code:1100});

        user = new User({ email, password });
        await user.save()

        //jwt token 

        return res.status(201).json({ok:true})
    } catch (error) {
        console.log(error);
        //alternativa por defecto mongoose 
        if(error.code === 1100){
            return res.status(400).json({error:"ya existe este usuario"});
        }
        return res.status(500).json({error : "error de servidor"});
    }
};

export const login = async (req, res) =>{
    try {
        const{ email, password } = req.body;

        let user = await User.findOne({email});
        if(!user) 
        return res.status(403).json({error:"no existe este usuario"});

        const respuestaPassword = await user.comparePassword(password);
        if(!respuestaPassword)
            return res.status(403).json({error:"contraseña incorrecta"});

        //Generar el token JWT
        const {token, expiresIn} = generateToken(user.id)

        res.cookie("token",token);

        return res.json({token,expiresIn});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error : "error de servidor"});
    }
};

export const infoUser = async(req, res) => {
    try {
        const user = await User.findById(req.uid).lean();
        return res.json({email: user.email, uid:user.id}); 
    } catch (error) {
        return res.status(500).json({error: "error del server "});
    }
};

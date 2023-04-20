import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';

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
        const token = jwt.sign({uid: user.id},process.env.JWT_SECRET)


        res.json({token});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error : "error de servidor"});
    }
};

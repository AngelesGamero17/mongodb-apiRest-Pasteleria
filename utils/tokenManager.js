import jwt from "jsonwebtoken"
export const generateToken = (uid) =>{

    const expiresIn = 60 * 15

    try {
        const token = jwt.sign({uid}, process.env.JWT_SECRET, {expiresIn})
        return {token, expiresIn}
    } catch (error) {
        console.log(error)
    }
};

export const errorsValidateToken = (error) =>{
    switch(error){
        case "invalid asignature":
            return "firma no valida";
        case "jwt expired":
            return "token expirado";
        case "invalide token":
            return "no inventa token";
        default:
            return error ;
    }
};
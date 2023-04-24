import jwt from 'jsonwebtoken';
export const requireToken = (req, res, next) =>{
    try {
            let token = req.headers?.authorization;

            if(!token)
                throw new Error ('No Bearer')

                token = token.split(" ") [1];
                const {uid} = jwt.verify(token, process.env.JWT_SECRET);

                req.uid = uid;

            next();
        } catch (error) {
            console.log(error.message);
            
            const tokenVerificationErrors ={
                "invalid signature": "la firma del jwt no es valida",
                "jwt expired": "jwt expirado",
                "invalid token": "jwt a expirado",
                "no bearer": "utiliza formato bearer",
                "jwt malformed" : "jwt formate no valido",
            };
            return res
            .status(401)
            .send({error: tokenVerificationErrors[error.message]});
        }
};
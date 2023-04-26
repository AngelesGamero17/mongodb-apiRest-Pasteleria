import axios from "axios";
import { validationResult, body, param} from "express-validator";

export const validationResultExpress = (req, res,next) =>{
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    next();

};

export const paramLinkValidator =[
    param("id", "formato no valido (expressValidor")
        .trim()
        .notEmpty()
        .escape()
    ,validationResultExpress
]

export const bodyLinkValidator = [
    body("longLink", "formato link incorrecto")
    .trim()
    .notEmpty()
    .custom(async (value) => {
        try {

            if(!value.startsWith('https://')){
                value = 'https://' + value
            }
            await axios.get(value);
            return value;
        } catch (error) {
            //console.log(error);
            throw new Error ('not found longlink 404');
        }
    }),
    validationResultExpress,
];

export const bodyRegisterValidator=[
    body('email','Formato de email incorrecta')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Minimo 6 caracteres")
    .trim()
    .isLength({min: 6 }),
    body("password","formato de password incorrecto")
        .custom((value,{req}) => {
                if(value !==req.body.repassword) {
                    throw new Error ('NO coinciden las contraseñas')
            }
            return value;
        }),
        validationResultExpress,
];

export const bodyLoginValidator =    [
    body('email','Formato de email incorrecta')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Minimo 6 caracteres")
        .trim()
        .isLength({min: 6 }),
        validationResultExpress
];
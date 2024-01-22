import { dirname } from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
export const __dirname = dirname(fileURLToPath(import.meta.url));
/* ------------------------------------ - ----------------------------------- */
import bcryptjs from 'bcryptjs';

/**
 * 
 * @param {*} user usuario encontrado en base de datos.
 * @param {*} password contraseña proporcionada por el usuario, sin encriptar.
 * @returns boolean
 */
export const isValidPassword = (user, password) => bcryptjs.compareSync(password, user.password);

//codigo random para el DTO
export const generateCode = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomCode = '';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        randomCode += caracteres[randomIndex];
    }
    return randomCode;
}

//JASONWEBTOKEN
const KEY = '123'

export const generateToken = (user) => {
    const token = jwt.sign({ user }, KEY, { expiresIn: '6h' })
}

export const authToken = (req, res, next) => {
    const headerAuth = req.headers
    console.log(req.headers.authorization);
    console.log(headerAuth);
    if (!headerAuth) return res.status(401).send({ status: 'error', error: 'No autorizado' });
    const token = headerAuth.split(' ')[1];

    jwt.verify(token, KEY, (error, credentials) => {
        if (error) return res.status(error).send({ status: 'error', error: 'no autorizado' });
        req.user = credentials.user;
        next();
    })

}
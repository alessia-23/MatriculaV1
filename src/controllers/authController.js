import Usuario from "../models/Usuario.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.js";
import { crearTokenJWT } from "../middleware/jwt.js";

const register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const existeUsuario = await Usuario.findOne({ email });
        if (existeUsuario) {
            return res.status(400).json({ msg: "El usuario ya existe" });
        }
        const passwordHasheado = await hashPassword(password);
        const nuevoUsuario = new Usuario({
            nombre,
            email,
            password: passwordHasheado
        });
        await nuevoUsuario.save();
        res.json({ msg: "Usuario creado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: "Error del servidor" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        const passwordValido = await comparePassword(password, usuario.password);
        if (!passwordValido) {
            return res.status(401).json({ msg: "Contraseña incorrecta" });
        }
        const token = crearTokenJWT(usuario._id);
        res.json({
            msg: "Login exitoso",
            token,
            usuario:{
                nombre: usuario.nombre,
                email: usuario.email
            }
        });
    } catch (error) {
        res.status(500).json({ msg: "Error del servidor" });
    }
};

export { register, login };


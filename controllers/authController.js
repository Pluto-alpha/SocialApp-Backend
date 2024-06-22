import db from '../DB/Connect.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Register = async (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], async (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(400).json("User already exists");
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const insertQuery = "INSERT INTO users (`username`, `email`, `password`, `name`) VALUES (?)";
            const values = [req.body.username, req.body.email, hashPassword, req.body.name];
            db.query(insertQuery, [values], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(201).json("User created successfully");
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    });
};

const Login = async (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(400).json("User not found");
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
        if (checkPassword) {
            const token = jwt.sign({ id: data[0].id }, process.env.SECRET_TOKEN, { expiresIn: '1h' });
            const { password, ...others } = data[0];
            res.cookie("accessToken", token, {
                httpOnly: true,
                maxAge: 3600000,
            }).json({ others, token });
        } else {
            return res.status(400).json("Invalid credentials");
        }

    });
};

const Logout = async (req, res) => {
    res.clearCookie("accessToken", { secure: true, sameSite: 'none' }).json("User has been logged out")
}

export default { Login, Register, Logout };

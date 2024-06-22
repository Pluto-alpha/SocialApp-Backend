import jwt from 'jsonwebtoken';


const validateToken = async(req,res,next)=>{
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json("Not logged in!");
    }
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(403).json("Token is not valid!");
        }
        req.user = decoded;
        next();
    });
}
export default validateToken;
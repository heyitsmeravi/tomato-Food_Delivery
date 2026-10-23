import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
    const {token} = req.headers;
    // console.log(req.headers);
    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided , Login again" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        console.log(req.body);
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}
export default authMiddleware;
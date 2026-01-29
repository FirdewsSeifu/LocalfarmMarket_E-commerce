import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authenticateSeller = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user || user.role !== "seller") {
            return res.status(403).json({ message: "Access denied, not a seller" });
        }

        req.user = user; // Attach user data to the request for further processing
        next();
    } catch (error) {
        res.status(500).json({ message: "Error authenticating seller", error });
    }
};

export default authenticateSeller;

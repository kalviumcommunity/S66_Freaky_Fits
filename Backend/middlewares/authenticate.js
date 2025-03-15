const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticate = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];  // Extract token from header
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);  // Verify the token
            if (decoded) {
                req.user = { // Store the decoded user data in req.user
                    userID: decoded.userID,
                    email: decoded.email
                };
                return next(); // Pass control to the next middleware
            } else {
                return res.status(401).json({ message: "Invalid token" });
            }
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    } else {
        return res.status(401).json({ message: "Login Please" });
    }
}

module.exports = authenticate;

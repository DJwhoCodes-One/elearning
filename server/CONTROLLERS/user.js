const userModel = require("../MODELS/user.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require("../MIDDLEWARES/sendMail.js");

const register = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        // Check if user already exists
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User Already Exists!"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create new user
        user = await userModel.create({
            name,
            email,
            password: hash,
        });

        // Generate OTP
        const otp = Math.floor(Math.random() * 1000000);

        // Create activation token
        const activationToken = jwt.sign(
            {
                user: { id: user._id, email: user.email, name: user.name },
                otp
            },
            process.env.Activation_Secret,
            {
                expiresIn: "5m"
            }
        );

        // Data to be sent in the email
        const data = {
            name,
            otp
        };

        // Send OTP email
        await sendMail(
            email,
            "E Learning",
            data
        );

        // Respond to client
        res.status(200).json({
            message: "OTP sent to your mail!",
            activationToken
        });

    } catch (error) {
        // Handle errors
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = register;

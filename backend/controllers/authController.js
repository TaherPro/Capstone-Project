import User from "../models/User.js";
import bcrypt from "bcrypts";
import jwt from "jsonwebtoken";

export const registerUser = async (res, req) => {
    try {
        const { name, email, password, role } = req.body;

        // if (!name || !email || !password || !role) {
        //     return res.status(400).json({ message: "All filed are required"})
        // }
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({
            message: "User registed successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                role: newUser.role,
            },
        })
    } catch (error){
        res.status(500).json({ message: "Server error", error});
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid creadentials"});

        // compare the passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid creadentials"});

        // create JWT
        const token = jwt.sign(
            { id: user.Id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d"}
        );
        res.json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
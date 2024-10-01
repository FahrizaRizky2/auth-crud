import bcrypt from "bcryptjs";
import crypto from 'crypto';

import {User} from "../models/user.model.js";
import {generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js";
import {sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail} from "../mailtrap/emails.js";

export const signup = async (req, res) => {
    const { email, name, password } = req.body;

    try{
     if(!email || !name || !password || !name.trim()){
         throw new Error("Isi semua form");
     }

     const userAlreadyExists = await User.findOne({email});
     if(userAlreadyExists){
         return res.status(400).json({ success:false, message: "Pengguna sudah ada" });
     }

     const hashedPassword = await bcrypt.hash(password, 12);
     const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

     const user = new User({
         email,
         name,
         password: hashedPassword,
         verificationToken,
         verificationExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours,
     });

        await user.save();

     //jwt
        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: "User berhasil dibuat ",
            user:{
                ...user._doc,
                password: undefined
            }
        })
    }catch(err){
       res.status(400).json({ success:false, message: err.message });
    }
};

export const verifyEmail = async (req, res) => {
    const { code } = req.body;

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationExpiresAt: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid verifikasi kode" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(201).json({
            success: true,
            message: "Email Terverifikasi",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("Error dalam verifikasi email ", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Password atau Email salah" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Password atau Email salah" });
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();

        await user.save();

        res.status(200).json({
            success: true,
            message: "Login Sukses",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
        
    } catch (error) {
        console.log("Gagal Login ", error);
        res.status(400).json({ success: false, message: "Gagal Login" });
    }
};

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Berhasil Log out" });
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Email Salah" });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 60 * 60 * 1000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({ success: true, message: "Link Reset Password Berhasil Dikirim" });

    } catch (error) {
        console.log("Link gagal dikirim", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    
    try {

        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne( {
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() } //Greater than now date
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Kode Reset Expired" });
        }
        
        //update password
        const hashedPassword = await bcrypt.hash(password, 12);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({ success: true, message: "Password Berhasil di Reset" });

    } catch (error) {
        console.log("Password Reset Gagal", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const checkAuth = async (req, res) => {

    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: "User Invalid" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Error ", error);
        res.status(400).json({ success: false, message: error.message });
    }
}
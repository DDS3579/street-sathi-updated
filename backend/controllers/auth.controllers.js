import { Rescuer } from "../models/rescuer.model.js";
import { User } from "../models/user.model.js";
import { genOtp } from "../utils/otpGen.js";
import { sendOtpMail } from "../utils/sendEmail.js";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

export class Auth {
register = async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required ... " });
  }

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const otp = await genOtp();
  const hashpass = await bcrypt.hash(password, 12);

  // ✅ FOR HACKATHON: Store OTP in DB but skip email
  const createUser = await User.create({
    name, email, phone, password: hashpass, role, otp
  });

  console.log(`🔢 OTP for ${email}: ${otp}`); // Shows in terminal

  return res.status(201).json({
    message: "Registration successful! Use the OTP below to verify",
    otp: otp, // ✅ Send OTP in response
    email: email
  });
}

checkOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!otp || !email) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // ✅ Debug logs (remove after hackathon)
  console.log("Submitted OTP:", otp, "Type:", typeof otp);
  console.log("Stored OTP:", user.otp, "Type:", typeof user.otp);
  console.log("Match:", Number(otp) === user.otp);

  // ✅ Correct OTP check
  if (Number(otp) !== user.otp) {
    return res.status(400).json({ message: "Invalid OTP. Check terminal for correct OTP" });
  }

  // ✅ OTP verified - clear it so it can't be reused
  await User.findByIdAndUpdate(user._id, { otp: null });

  return res.status(200).json({ message: "OTP verified successfully! You can now login." });
};

  login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required ..." });
    }

    const getUser = await User.findOne({ email });
    if (!getUser) {
      return res.status(400).json({ message: "User not registered please do register." });
    }

    const checkPass = await bcrypt.compare(password, getUser.password);
    if (!checkPass) {
      return res.status(400).json({ message: "Invalid Password .." });
    }

    const key = process.env.JWT_SECRET;
    const payload = {
      name: getUser.name,
      email: getUser.email,
      role: getUser.role,
      id: getUser._id,
    };

    const token = jwt.sign(payload, key, { expiresIn: "7d" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });

    return res.status(200).json({ message: "Login sucessfull ..", token, user:{id: getUser._id, name:getUser.name, email:getUser.email, role: getUser.role,}  });
  };

  rescuerRegister = async (req, res) => {
    const { name, email, phone, password, location } = req.body;

    const pancarDocs = req.files.file;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: "All fields are required ... ",
      });
    }

    if (!pancarDocs) {
      return res.status(400).json({ message: "Upload a file too ..." });
    }

    const hashpass = await bcrypt.hash(password, 12);

    const rescuer = await Rescuer.create({
      name,
      email,
      phone,
      password: hashpass,
      role: "rescuer",
      location,
      documents,
      verified: false,
    });

    return res
      .status(201)
      .json({
        message:
          "You are registered but not verified you will be able to login when you wil be verified . Your profile will be shortly validate by admin and you will be notified very soon via email.",
      });
  };

  rescuerLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required ... ",
      });
    }

    const getRescuer = await Rescuer.findOne({ email });

    if (!getRescuer) {
      return res
        .status(400)
        .json({ message: "Rescuer not registered please do register ." });
    }

    if (!getRescuer.verified) {
      return res
        .status(400)
        .json({
          message:
            "This account is not verified please keep a patience you will only be able to login after the admin verifies.",
        });
    }
    const checkPass = await bcrypt.compare(password, getRescuer.password);

    if (!checkPass) {
      return res.status(400).json({
        message: "Invalid Password ..",
      });
    }

    const key = process.env.JWT_SECRET;
    const payload = {
      name: getRescuer.name,
      email: getRescuer.email,
      password: getRescuer.password,
      role: getRescuer.role,
      verified: getRescuer.verified,
    };
    const token = jwt.sign(payload, key, {
      expiresIn: "7d",
    });

    res.cookie(token, token);

    return res.status(200).json({ message: "Login sucessfull .." });
  };
}

import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/jwt.helper.js";
import validator from "validator";

const register = async (req, res) => {
  let { username, email, password } = req.body;
  try {
    //* Chect if User Already Exists
    let checkExistingUser = await userModel.findOne({ email });
    if (checkExistingUser) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    //* Chect if Email format is correct
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter A Valid Email" });
    }

    //* Chect if Password with at least 8 characters
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Use Password with at least 8 characters",
      });
    }

    //* Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    let newUser = new userModel({
      username: username,
      email: email,
      password: hashedPass,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ success: true, message: "Registered Successfully" });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};

const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    let isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, message: "Login Successfully" });
  } catch (e) {
    return res.json({ success: false, message: "Error" });
  }
};

const logoutUser = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
    sameSite: "lax",
  });

  res.json({
    success: true,
    message: "Logged out",
  });
};

export { register, login, logoutUser };

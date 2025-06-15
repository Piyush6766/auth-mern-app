const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");

const signup = async (req, res) => {
  try {
    // Simulate user creation logic
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "user already exists, please login",
      });
    }
    const userModel = new UserModel({
      name,
      email,
      password,
    });
    userModel.password = await bcrypt.hash(userModel.password, 10);
    await userModel.save();
    res.status(201).json({
      message: "Congratulations, you have successfully signed up",
      success: true,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// This function handles user login, checking if the user exists and validating the password.

const login = async (req, res) => {
  try {
    // Simulate user creation logic
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Invalid email or password";
    if (!user) {
      return res.status(404).json({
        message: errorMsg,
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: errorMsg,
        success: false,
      });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "Congratulations, you have successfully logged in",
      success: true,
      token: jwtToken,
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
module.exports = {
  signup,
  login,
};

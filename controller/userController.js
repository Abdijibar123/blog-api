const bcrypt = require("bcrypt");
const User = require("../model/user");

exports.login = async (req, res) => {
  try {
    //emai , password
    const { email, password } = req.body;
    //check email   !email = email doesn't exist
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "email or password is incorrect" });
    }
    //check password match   !password = password incorrect
    const correctPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!correctPassword) {
      return res
        .status(400)
        .json({ message: "email or password is incorrect" });
    } //login response user
    //token
    res.status(201).json({
      message: "welcome back!",
      user: {
        id: existingUser.id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        avatar: existingUser.avatar,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "login failed" });
  }
};

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists
    const existingUser = await User.findOne({ email });

    // If the user exists, return an error message
    if (existingUser) {
      return res.json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;

    // Save the user data
    const user = await User.create(req.body);
    console.log(user);

    res.status(201).json({
      message: "Welcome new user",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
      },
    });
  } catch (e) {
    res.status(400).json({ message: "signup failed" });
  }
};
//change password

exports.changePassword = async (req, res) => {
  try {
    // old password, new password, confirm new, userid,
    const { oldPassword, newPassword, confirmNewPassword, userId } = req.body;
    //new password = confirm = success, != doesn't match
    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({ message: "the new passwords doesn't match" });
    }
    //find user,
    const user = await User.findById(userId);
    //user password = old password  != old password wrong
    const correctPassword = await bcrypt.compare(oldPassword, user.password);
    if (!correctPassword) {
      return res.status(400).json({ message: "password is incorrect" });
    }
    //encrypt password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    //edit password    //
    await User.findByIdAndUpdate(userId, { password: hashedPassword });
    res.status(201).json({ message: "password changed" });
  } catch (e) {
    res.status(400).json("change password failed");
  }
};

//edit profile
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    res.status(201).json({ message: "profile edited" });

    await User.findByIdAndUpdate(userId, req.body);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: "edit profile failed" });
  }
};

//get user
exports.getUser = (req, res) => {
  try {
    res.status(201).json({ message: "Here!" });
  } catch {
    console.log(e.message);
    res.status(400).json({ message: "edit profile failed" });
  }
};

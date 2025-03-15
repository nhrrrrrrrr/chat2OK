import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Group from "../models/group.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const creategroup = async (req, res) => {
  try {
    const { authUser: creator_id, groupname, members } = req.body;
    // const groupMembers = [...members, req.user._id];
    const newGroup = new Group({
      Groupname: groupname,
      creator: creator_id,
      members: members,
    });
    await newGroup.save();
    res.status(201).json({ message: "Group created successfully" });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    // if (password !== confirmPassword) {
    //   return res.status(400).json({ error: "Passwords don't match" });
    // }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // Generate JWT token here
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    // const isPasswordCorrect = function (password) {
    //   if (password === user.password) return true;
    //   else return false;
    // };
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
      token: token,
      role: user.role,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    // res.cookie("_csrf", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;
    const profilePic = `/images/${req.file.filename}`;

    // Assuming you have a User model and update logic
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePic },
      { new: true }
    );

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile picture" });
  }
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array [USER,ADMIN]
    if (!roles.includes(req.user.role)) {
      return next(
        new Error("you dont ave permission to perform this action", 403)
      );
    }
    next();
  };
};

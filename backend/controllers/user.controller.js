import mongoose from "mongoose";
import User from "../models/user.model.js";
import Group from "../models/group.js";
const ObjectId = mongoose.Types.ObjectId;

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const DeleteUser = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({
        message: "user not found",
      });
    }
    res.status(200).json({
      status: "success",
      user: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "there is an error",
      error: error,
    });
    console.log(error);
  }
};

export const getGroup = async (req, res) => {
  try {
    const senderId = req.user._id;
    // const { id: groupcreatorId } = req.params;
    const Groupinf = await Group.find({
      $or: [{ members: senderId }, { creator: senderId }],
    });

    res.status(200).json(Groupinf);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

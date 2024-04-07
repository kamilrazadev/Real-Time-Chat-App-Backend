import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } });

    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: " + error.message });
    console.log("error in getting all conversations: ", error.message);
  }
};

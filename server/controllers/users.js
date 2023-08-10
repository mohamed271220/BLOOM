import Group from "../models/Group.js";
import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((friendId) => User.findById(friendId))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => ({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
      })
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await friend.save();
    await user.save();
    const friends = await Promise.all(
      user.friends.map((friendId) => User.findById(friendId))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => ({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
      })
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//get groups
export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({ createdBy: req.params.userId });
    res.status(200).json(groups);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// get Group
export const getGroup = async (req, res) => {
  const { id } = req.body;
  try {
    const group = await Group.findById(id);
    res.status(200).json(group);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// make a group
export const createGroup = async (req, res) => {
  const { name, description ,picture,picturePath } = req.body;
  console.log(picturePath);
  const { userId } = req.params;

  if (!name || !description || !userId) {
    res.status(400).json({ message: "please fill all fields" });
  }

  try {
    const user = await User.findById(userId);
    const group = new Group({
      name,
      description,
      image: picture,
      createdBy: userId,
      users: [userId],
    });
    await group.save();
    await user.groups.push(group._id);
    await user.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// add friend to group
export const addFriendToGroup = async (req, res) => {
  const { id } = req.params;
  const { friendsIds } = req.body;

  try {
    const group = await Group.findById(id);
    if (group.createdBy !== req.userId)
      return res.status(401).json({ message: "unauthorized" });

    friendsIds.forEach(async (friendId) => {
      const user = await User.findById(friendId);
      group.users.push(friendId);
      user.groups.push(id);
      await user.save();
      await group.save();
    });
    res.status(201).json(group);
  } catch (err) {
    req.status(409).json({ message: err.message });
  }
};

// remove from group
export const removeFriendFromGroup = async (req, res) => {
  const { id } = req.params;
  const { friendId } = req.body;

  try {
    const group = await Group.findById(id);
    if (group.createdBy !== req.userId)
      return res.status(401).json({ message: "unauthorized" });

    const user = await User.findById(friendId);

    if (!user || !group)
      return res.status(404).json({ message: "user or group not found" });

    group.users = group.users.filter((id) => id !== friendId);
    user.groups = user.groups.filter((id) => id !== id);
    await group.save();
    await user.save();
    res.status(201).json(group);
  } catch (err) {
    req.status(409).json({ message: err.message });
  }
};

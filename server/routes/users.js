import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  createGroup,
  getGroup,
  addFriendToGroup,
  removeFriendFromGroup,
  getGroups,
} from "../controllers/users.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// /users

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

// groups
router.get("/:userId/groups", verifyToken, getGroups);
router.get("/:userId/groups/:id", verifyToken, getGroup);
router.put("/:userId/groups/:id", verifyToken, addFriendToGroup);
router.delete("/:userId/groups/:id", verifyToken, removeFriendFromGroup);

export default router;

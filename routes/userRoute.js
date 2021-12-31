import { getUsers, getUserById } from "../controllers/useController.js";
import express from "express";
const router = express.Router();

// express router method to create route for getting all users
router.route("/").get(getUsers);

// express router method to create route for getting users by id
router.route("/:id").get(getUserById);

// router.route("/login").get(getUsers);

export default router;

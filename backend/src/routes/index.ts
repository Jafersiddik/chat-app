import { Router } from "express";
const router = Router();
import * as indexController from "../controllers/index.controller"
import { isAuthenticate } from "../middleware/auth";

router.get(
    '/users',
    isAuthenticate,
    indexController.userlist
)

router.get(
    '/messages/:receiverId',
    isAuthenticate,
    indexController.messageList
)

router.post(
    '/logout',
    indexController.logout
)

export default router;
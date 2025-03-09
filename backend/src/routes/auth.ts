import { Router } from "express";
const router = Router();
import * as authController from "../controllers/auth.controller"
import {singnInValidator,singnUpValidator} from "../utils/validation/auth.validation"

router.post(
    '/signin',
    singnInValidator,
    authController.signin
)

router.post(
    '/sign-up',
    singnUpValidator,
    authController.signup
)

export default router;
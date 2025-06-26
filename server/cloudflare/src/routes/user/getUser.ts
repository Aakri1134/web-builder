import { Hono } from "hono";
import { Env } from "../..";
import userInputValidation from "../../middlewares/auth/userInputValidation";
import { jwtVerification } from "../../middlewares/user/jwtVerification";
import { getUserMiddleware } from "../../middlewares/auth/getUser";

export const getUser = new Hono<Env>()

getUser.get("/", userInputValidation, jwtVerification, getUserMiddleware,async (c) => {

    

    return c.json({
        message : "User"
    })
})
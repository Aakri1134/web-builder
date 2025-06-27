import { Hono } from "hono";
import { Env } from "../..";
import userInputValidation from "../../middlewares/auth/userInputValidation";
import { jwtVerification } from "../../middlewares/user/jwtVerification";
import { getUserMiddleware } from "../../middlewares/auth/getUser";
import { midIPRateLimiting } from "../../middlewares/auth/ipratelimiting";

export const getUser = new Hono<Env>()

getUser.get("/", midIPRateLimiting, userInputValidation, jwtVerification, getUserMiddleware,async (c) => {

    const user = c.get("user")
    const {password, previousPassword, emailVerified, ...res} = user
    return c.json({
        success : true,
        data : res
    })
})
import { Hono } from "hono";

export const auth = new Hono<Env>()

auth.get("/login", (c) => {
    return c.text("Hello from auth/login")
})


auth.post("/signup", async c => {
    const {username, email, password} = await c.req.json()

    return c.json({
        username,
        email,
        password
    })
    
})
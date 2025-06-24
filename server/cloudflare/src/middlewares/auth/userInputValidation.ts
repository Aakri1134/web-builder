import { createMiddleware } from "hono/factory"

const userInputValidation = createMiddleware(async (c, next) => {
  const {username, email, password} = await c.req.json()
      // input validation
    if(username && username.length <= 8){
      return c.json({
        error : "Invalid Username"
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email && !emailRegex.test(email)) {
      return c.json({
      error: "Invalid Email"
      }, 400)
    }

    // Password Validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[\w@$!%*?&]{8,}$/;
    if(password && !passwordRegex.test(password)){
      return c.json({
        error : "Invalid Password"
      })
    }

    await next()
})

export default userInputValidation
import { Hono } from "hono";
import { signUpWithUsernameAndPassword } from "../contoller/authentication";

export const hono = new Hono();
hono.post("/authentication/sign-up", async (context) => 
    {
    const { username, password } = await context.req.json();
    try{
        const result = await signUpWithUsernameAndPassword({ username, password });

        return context.json(
            {
                data: result,

            },
    );
} catch (e) {
    if (e instanceof Error && e.message === "CONFLICTING_USERNAME") {
        return context.json(
            {
                message: "Username already exists",
            },
            409
        );
    }
    if (e instanceof Error && e.message === "UNKNOWN") {
        return context.json(
            {
                message: "Unknown error",
            },
            500
        );
}
}});


hono.get("/health", (context) => {
  return context.json(
    {
      message: "All Ok",
    },
    200
  );
});
import { Hono } from "hono";
import { authenticationRoutes } from "./authentication-routes";
import { prismaClient } from "../extras/prisma";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../../environment";
import { usersRoutes } from "./users-routes";

export const allRoutes = new Hono();

allRoutes.use(async (context, next) => {
  console.log("HTTP METHOD", context.req.method);
  console.log("URL", context.req.url);
  console.log("HEADERS", context.req.header());

  await next();
});

allRoutes.route("/authentication", authenticationRoutes);
allRoutes.route("/users", usersRoutes);


allRoutes.get("/health", (context) => {
  return context.json(
    {
      message: "All Ok",
    },
    200
  );
});
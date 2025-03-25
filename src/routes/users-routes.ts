import { Hono } from "hono" ;
export const usersRoutes = new Hono();
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../../environment";
import { prismaClient } from "../extras/prisma";

usersRoutes.get(
    "/",
    async (context, next) => {
      const token = context.req.header("token");
  
      if (!token) {
        return context.json(
          {
            message: "Missing Token",
          },
          401
        );
      }
  
      try {
        const verified = jwt.verify(token, jwtSecretKey);
  
        await next();
      } catch (e) {
        return context.json(
          {
            message: "Missing Token",
          },
          401
        );
      }
    },
    async (context) => {
      const users = await prismaClient.user.findMany();
  
      return context.json(users, 200);
    }
  );
  
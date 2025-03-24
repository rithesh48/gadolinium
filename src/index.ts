import "dotenv/config";
import jwt from "jsonwebtoken";
const jwtSecretkey=process.env.JWT_SECRET_KEY || process.exit(1);
console.log("JWT Secret Key",jwtSecretkey);
const payload: jwt.JwtPayload = {
  iss: "https://github.com/rithesh48",
  sub: "rithesh48",
};
const secretKey =  "HelloWorld";
const token = jwt.sign(payload, secretKey,{
  algorithm: "HS256",
  expiresIn: "7d",
});
console.log("Token",token);
try{
  const decoded = jwt.verify(token, secretKey, { algorithms: ["HS256"] });
  console.log("Decoded",decoded);
} catch (error) {
  console.error("Error decoding token", error);
}
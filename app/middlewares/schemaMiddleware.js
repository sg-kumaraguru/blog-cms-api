import {registerSchema, loginSchema} from "../schemas/authSchema.js"

export function validateSchema(schema) {
 return function (req,res,next) {
 try {
  schema.parse(req.body);
  next();
 } catch (err) {
  res.status(400).json({error:"invalid data"})
 }
 }
}

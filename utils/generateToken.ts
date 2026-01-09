import jwt from "jsonwebtoken";
export default function generateToken(id: string, role: string): string {
  const token = jwt.sign({ id, role }, process.env.JWT!, { expiresIn: "15d" });
  return token;
}

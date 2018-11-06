import bcrypt from "bcryptjs";
import { MD5 } from "crypto-js";

const salt = "$2a$10$qpTMGcofya6RTNnt.qLmJu";

export async function generate(str1: string, str2: string, amount = 10) {
  const hash = await bcrypt.hash(str1 + str2, salt);
  const result = MD5(hash).toString();
  return result.slice(0, amount);
}

export default generate;

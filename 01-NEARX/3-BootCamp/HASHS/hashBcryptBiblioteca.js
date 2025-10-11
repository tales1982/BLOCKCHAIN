import bcrypt from "bcrypt";

const hash = await bcrypt.hash("senha123", 15);
console.log(hash);

const ok = await bcrypt.compare("senha123", hash);// (.compare) return Bool
console.log(ok); // true ou false

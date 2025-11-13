import { createHash } from "crypto";

const hash = createHash("sha256")
  .update("mensagem secreta.")
  .digest("hex");

console.log(hash);

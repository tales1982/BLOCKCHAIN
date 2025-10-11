import SHA256 from "crypto-js/sha256.js";

const hash = SHA256("mensagem secreta").toString();
console.log(hash);
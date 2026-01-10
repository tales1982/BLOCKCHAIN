import { keccak256, toUtf8Bytes } from "ethers";

const hash = keccak256(toUtf8Bytes("meus dados"));
console.log(hash);

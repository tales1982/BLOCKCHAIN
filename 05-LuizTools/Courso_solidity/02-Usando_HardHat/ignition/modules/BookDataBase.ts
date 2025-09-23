// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


//Depoloy do meu contrato na rede.

const BookDataBaseModule = buildModule("BookDataBaseModule", (m) => {

  const bookDatabase = m.contract("BookDatabase", [], {
  });

  return { bookDatabase };
});

export default BookDataBaseModule;

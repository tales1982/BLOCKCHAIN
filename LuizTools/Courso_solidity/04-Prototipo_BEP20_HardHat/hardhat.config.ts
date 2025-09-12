import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv"
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  //configurando rede local
  defaultNetwork: "local",
  networks: {
    local: {
      url: "http://127.0.0.1:8545", //Obs e o mesmo que adicionou na metamask
      chainId: 31337, //Obs e o mesmo que adicionou na metamask
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
      },
    },
    bsctest: {
      url: process.env.BSC_URL,
      chainId: 97,
      accounts: {
        mnemonic: process.env.SECRET,
      },
    },
  },
  etherscan: {
    apiKey: process.env.API_KEY,
  },
};
export default config;
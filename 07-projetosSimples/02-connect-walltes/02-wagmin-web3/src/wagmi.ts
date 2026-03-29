import { http, createConfig } from "wagmi";
import { mainnet, sepolia, } from "wagmi/chains";
import { injected } from "wagmi/connectors";

const URL_RPC_MAINET = "https://eth-mainnet.g.alchemy.com/v2/2PIxxPehRuhHWjmtcGIacexP_9bbq84v";
const URL_RPC_SEPOLIA = "https://eth-sepolia.g.alchemy.com/v2/2PIxxPehRuhHWjmtcGIacexP_9bbq84v";

export const config = createConfig({
    chains: [mainnet, sepolia], // adcionamos as redes que vai ser usada
    connectors: [injected() ],//Aqui enjetamos a Metamask
    transports: {
        [mainnet.id]: http(URL_RPC_MAINET),//Aqui ejeto o rpc por .env
        [sepolia.id]: http(URL_RPC_SEPOLIA),
    },
})
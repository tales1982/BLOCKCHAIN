import { ethers } from "ethers";
import 'dotenv/config';


const RPC_URL = process.env.RPC_URL;
const ADDR = process.env.ADDR;
const PK = process.env.PRIVATE_KEY;
const CLIENT_A = process.env.CLIENT_A;
const CLIENT_B = process.env.CLIENT_B;



const abi = [
    {
        "type": "constructor",
        "inputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "addBoocks",
        "inputs": [
            {
                "name": "_title",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_rentalPrice",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "books",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "id",
                "type": "uint8",
                "internalType": "uint8"
            },
            {
                "name": "title",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "rentalPrice",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "available",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getBoocks",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct Boocks[]",
                "components": [
                    {
                        "name": "id",
                        "type": "uint8",
                        "internalType": "uint8"
                    },
                    {
                        "name": "title",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "rentalPrice",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "available",
                        "type": "bool",
                        "internalType": "bool"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getBooksLength",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "rentBook",
        "inputs": [
            {
                "name": "bookId",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "renterOf",
        "inputs": [
            {
                "name": "",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "returnBool",
        "inputs": [
            {
                "name": "_bookId",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    }
]


const provider = new ethers.JsonRpcProvider(RPC_URL);
const signer = new ethers.Wallet(PK, provider);
const signerClientA = new ethers.Wallet(CLIENT_A, provider);
const signerClientB = new ethers.Wallet(CLIENT_B, provider);

const contract = new ethers.Contract(ADDR, abi, signer);
const contractClientA = new ethers.Contract(ADDR, abi, signerClientA);


try {
  // 1) Quantos livros existem (não “alugados”)
  const before = await contract.getBooksLength();
  console.log("Total de livros cadastrados:", before.toString());

  // 2) Add um novo livro (só o owner pode)
  const txAdd = await contract.addBoocks("O Senhor dos Aneis", ethers.parseEther("1"));
  console.log("⛓️  Tx add:", txAdd.hash);
  await txAdd.wait();

  const after = await contract.getBooksLength();
  console.log("Total após adicionar:", after.toString()); // deve ser 6

  // 3) Descobrir o preço do livro id=6 (index = 5)
  const book6 = await contract.books(5);
  console.log("Livro 6:", {
    id: Number(book6.id),
    title: book6.title,
    priceETH: ethers.formatEther(book6.rentalPrice),
    available: book6.available,
  });

  // 4) Alugar com o cliente A enviando ETH suficiente
  //    PRECISA passar { value: rentalPrice }
  const txRent = await contractClientA.rentBook(6, { value: book6.rentalPrice });
  console.log("⛓️  Tx rent:", txRent.hash);
  await txRent.wait();

  // 5) Confirmar que ficou indisponível e quem alugou
  const book6After = await contract.books(5);
  console.log("Disponível após aluguel?", book6After.available); // false

  // Se tiver getter do renter:
  // const renter = await contract.renterOf(6);
  // console.log("Renter do livro 6:", renter);

} catch (e) {
  console.error("❌ Falhou:", e.shortMessage ?? e.message);
}

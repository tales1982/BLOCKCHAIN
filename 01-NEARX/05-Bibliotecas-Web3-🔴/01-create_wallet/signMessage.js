import { Web3 } from "web3";
import readline from "readline";

const web3 = new Web3();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to sign a message
const signMessage = async () => {
  rl.question("Enter the message to sign: ", async (message) => {
    rl.close();

    // Create Account
    const account = web3.eth.accounts.wallet.create(1)[0];
    console.log("Account:", account);

    // Sign the message
    const signature = await web3.eth.accounts.sign(message, account.privateKey);
    console.log("Signature:", signature.signature);

    // Verify the signature
    const verify = await web3.eth.accounts.recover("outra messagem", signature.signature);
    console.log("Verification:", verify === account.address ? "Success" : "Failed");
  });
};

// Call the function to sign a message
signMessage();
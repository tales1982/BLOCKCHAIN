// src/app/api/contract/route.js
import contractJson from '../../../artifacts/contracts/SimpleContract.sol/SimpleContract.json';

export async function GET() {
  return new Response(
    JSON.stringify({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: contractJson.abi,
    }),
    { status: 200 }
  );
}
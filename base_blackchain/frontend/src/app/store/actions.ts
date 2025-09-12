// frontend/store/actions.ts

import axios from "axios";
import { BrowserProvider, TypedDataField } from "ethers";
import { AppDispatch } from "./index";

// Tipos para resposta da API
export interface DocumentResponse {
  id: number;
  hash: string;
  txHash: string;
  agreementTx?: string;
}

// Action para upload do PDF e registro on-chain
type UploadDocument = (file: File) => (dispatch: AppDispatch) => Promise<void>;
export const uploadDocument: UploadDocument = (file) => async (dispatch) => {
  dispatch({ type: "UPLOAD_REQUEST" });
  try {
    const formData = new FormData();
    formData.append("pdf", file);

    // Usa a variável de ambiente para definir o endpoint do backend
    const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
    const { data } = await axios.post<DocumentResponse>(
      `${base}/api/documents`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    dispatch({ type: "UPLOAD_SUCCESS", payload: data });
  } catch (error: any) {
    dispatch({ type: "UPLOAD_FAILURE", payload: error.message });
  }
};

// Action para assinatura EIP-712 e confirmação on-chain
type SignAgreement = (
  docHash: string
) => (dispatch: AppDispatch) => Promise<void>;
export const signAgreement: SignAgreement = (docHash) => async (dispatch) => {
  dispatch({ type: "SIGN_REQUEST" });
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask não detectado");
    }
    const provider = new BrowserProvider(window.ethereum as any);
    const signer = await provider.getSigner();
    const network = await provider.getNetwork();

    // Parâmetros EIP-712
    const domain = {
      name: "DocumentRegistry",
      version: "1",
      chainId: network.chainId,
      verifyingContract: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
    };
    const types: Record<string, TypedDataField[]> = {
      Agreement: [{ name: "docHash", type: "bytes32" }],
    };
    const message = { docHash };

    // Solicita assinatura ao usuário
    const signature = await signer.signTypedData(domain, types, message);
    // Usa a variável de ambiente para definir o endpoint do backend
    const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
    const { data } = await axios.post<{ txHash: string }>(
      `${base}/api/agreements`,
      { docHash, signature }
    );
    dispatch({ type: "SIGN_SUCCESS", payload: data });
  } catch (error: any) {
    dispatch({ type: "SIGN_FAILURE", payload: error.message });
  }
};

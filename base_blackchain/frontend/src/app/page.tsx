"use client";

// src/app/page.tsx
"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { RootState, AppDispatch } from './store';            // <-- aqui
import { uploadDocument, signAgreement } from './store/actions';    // <-- e aqui


function Home() {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.loading);
  const document = useSelector((state: RootState) => state.document);
  const error = useSelector((state: RootState) => state.error);

  const handleUpload = (e: FormEvent) => {
    e.preventDefault();
    if (file) {
      dispatch(uploadDocument(file));
    }
  };

  const handleSign = () => {
    if (document?.hash) {
      dispatch(signAgreement(`0x${document.hash}`));
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Registro de Documentos</h1>
      <form onSubmit={handleUpload} className="mb-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files && files.length) {
              setFile(files[0]);
            }
          }}
          className="mb-2"
        />
        <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-blue-500 text-white">
          {loading ? 'Enviando...' : 'Enviar PDF'}
        </button>
      </form>

      {error && <p className="text-red-500">Erro: {error}</p>}

      {document && (
        <div className="border p-4 rounded">
          <p><strong>ID:</strong> {document.id}</p>
          <p><strong>Hash:</strong> {document.hash}</p>
          <p><strong>Transação:</strong> {document.txHash}</p>
          <button
            onClick={handleSign}
            disabled={!!document.agreementTx || loading}
            className="mt-2 px-4 py-2 rounded bg-green-500 text-white"
          >
            {document.agreementTx ? 'Assinado' : 'Assinar Termo de Aceite'}
          </button>
          {document.agreementTx && <p className="mt-2">Tx Assinatura: {document.agreementTx}</p>}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

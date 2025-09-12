// frontend/store/reducer.ts
import { AnyAction } from '@reduxjs/toolkit';
import { DocumentResponse } from './actions';

export interface DocumentState {
  loading: boolean;
  document: DocumentResponse | null;
  error: string | null;
}

const initialState: DocumentState = {
  loading: false,
  document: null,
  error: null,
};

export default function reducer(
  state: DocumentState = initialState,
  action: AnyAction
): DocumentState {
  switch (action.type) {
    case 'UPLOAD_REQUEST':
    case 'SIGN_REQUEST':
      return { ...state, loading: true, error: null };

    case 'UPLOAD_SUCCESS':
      // action.payload: DocumentResponse
      return { ...state, loading: false, document: action.payload };

    case 'SIGN_SUCCESS':
      // action.payload: { txHash: string }
      return {
        ...state,
        loading: false,
        document: state.document
          ? { ...state.document, agreementTx: action.payload.txHash }
          : null,
      };

    case 'UPLOAD_FAILURE':
    case 'SIGN_FAILURE':
      // action.payload: error message
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

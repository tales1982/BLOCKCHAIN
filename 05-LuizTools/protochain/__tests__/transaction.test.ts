import Transaction from "../src/lib/transaction";
import TransactionInput from "../src/lib/transactionInput";
import TransactionOutput from "../src/lib/transactionOutput";
import TransactionType from "../src/lib/transactionType";
import Wallet from "../src/lib/wallet";

jest.mock("../src/lib/transactionInput");
jest.mock("../src/lib/transactionOutput");

describe("Transaction tests", () => {
  const exampleDifficulty: number = 1;
  const exampleFee: number = 1;
  const exampleTx: string = "021cdc2ee8bb048e393633bbe71a417743ea1adeb1c6fc142af47f77dc768ee75e";
  let alice: Wallet;
  let bob: Wallet;

  beforeAll(() => {
    alice = new Wallet();
    bob = new Wallet();
  });


  test("Should be valid (REGULAR default)", () => {
    const tx = new Transaction({
      txInputs: [new TransactionInput()],
      txOutputs: [new TransactionOutput()],
    } as Transaction);

    const valid = tx.isValid(exampleDifficulty, exampleFee);
    console.log(valid.success);
    expect(valid.success).toBeTruthy();
  });

  test("Should NOT be valid (input < outputs)", () => {
    const tx = new Transaction({
      txInputs: [
        new TransactionInput({
          amount: 1,
        } as TransactionInput),
      ],
      txOutputs: [
        new TransactionOutput({
          amount: 2,
        } as TransactionOutput),
      ],
    } as Transaction);

    const valid = tx.isValid(exampleDifficulty, exampleFee);
    console.log(valid.success);
    expect(valid.success).toBeFalsy();
  });

  test("Should NOT be valid (txo hash != tx hash)", () => {
    const tx = new Transaction({
      txInputs: [new TransactionInput()],
      txOutputs: [new TransactionOutput()],
    } as Transaction);

    tx.txOutputs[0].tx = "teste";

    tx.hash = tx.getHash();

    const valid = tx.isValid(exampleDifficulty, exampleFee);
    console.log(valid.success);
    expect(valid.success).toBeFalsy();
  });


  test("Should NOT be valid (invalid hash)", () => {
    const tx = new Transaction({
      txInputs: [new TransactionInput()],
      txOutputs: [new TransactionOutput()],
      type: TransactionType.REGULAR,
      timestamp: Date.now(),
      hash: "abc",
    } as Transaction);

    const valid = tx.isValid(exampleDifficulty, exampleFee);
    expect(valid.success).toBeFalsy();
  });

  test("Should be valid (FEE)", () => {
    const tx = new Transaction({
      txOutputs: [new TransactionOutput()],
      type: TransactionType.FEE,
    } as Transaction);

    tx.txInputs = undefined;
    tx.hash = tx.getHash();

    const valid = tx.isValid(exampleDifficulty, exampleFee);
    console.log(valid.success);
    expect(valid.success).toBeTruthy();
  });

  test("Should NOT be valid (invalid to)", () => {
    const tx = new Transaction();
    const valid = tx.isValid(exampleDifficulty, exampleFee);
    expect(valid.success).toBeFalsy();
  });

  test("Should NOT be valid (invalid txInput)", () => {
    const tx = new Transaction({
      txOutputs: [new TransactionOutput()],
      txInputs: [
        new TransactionInput({
          amount: -10,
          fromAddress: "carteiraFrom",
          signature: "abc",
        } as TransactionInput),
      ],
    } as Transaction);

    const valid = tx.isValid(exampleDifficulty, exampleFee);
    console.log(valid.success);
    expect(valid.success).toBeFalsy();
  });

  test('Should fet fee', () => {
    const txIn = new TransactionInput({
      amount: 11,
      fromAddress: alice.publicKey,
      previousTx: exampleTx,
    }as TransactionInput)
    txIn.sign(alice.privateKey);

    const txOut = new TransactionOutput({
      amount: 10,
      toAddress: bob.publicKey
    }as TransactionOutput)

    const tx = new Transaction({
      txInputs: [txIn],
      txOutputs: [txOut]
    }as Transaction)

    const result = tx.getFee();
    console.log(result);
    expect(result).toBeGreaterThan(0);
  })
  
test('Should get zero fee', () => {
  const tx = new Transaction();
  tx.txInputs = undefined;
  const result = tx.getFee();
  expect(result).toEqual(0);
})

test('Should create from reward', () => {
  const tx = Transaction.fromReward({
    amount: 10,
    toAddress: alice.publicKey,
    tx: exampleTx
  }as TransactionOutput);


  const result = tx.isValid(exampleDifficulty, exampleFee);
  expect(result.success).toBeTruthy()
})

test('Should NOT be valid (fee excess)', () => {
  const txOut = new TransactionOutput({
    amount: Number.MAX_VALUE,
    toAddress: bob.publicKey
  }as TransactionOutput)

  const tx = new Transaction({
    type:TransactionType.FEE,
    txOutputs: [txOut]
  }as Transaction)

  const result = tx.isValid(exampleDifficulty, exampleFee);
  expect(result.success).toBeFalsy();

})

});

import {
  clusterApiUrl,
  Connection,
  Keypair,
  Transaction,
  SystemProgram,
  PublicKey
} from "@solana/web3.js";
import {
  createInitializeMintInstruction,
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  getMinimumBalanceForRentExemptMint,
  mintToChecked,
  createMint,
  createMintToCheckedInstruction,
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount
} from "@solana/spl-token";
import * as bs58 from "bs58";
import { ASSOCIATED_TOKEN_PROGRAM_ID, Token } from "@solana/spl-token";

// Function to create a new token mint
export async function createTokenMint( ) {
  const connection = new Connection(clusterApiUrl("devnet"));

  // Replace these with your fee payer and authority keypairs
  const feePayer = Keypair.fromSecretKey(bs58.decode(process.env.NEXT_PUBLIC_SECRET_KEY));
  const mintAuthority = Keypair.fromSecretKey(bs58.decode(process.env.NEXT_PUBLIC_SECRET_KEY));

  // 1) use build-in function
  let mintPubkey = await createMint(
    connection,
    feePayer,
    mintAuthority.publicKey,
    mintAuthority.publicKey, // Set to null if you want to disable freeze authority
    8 // decimals
  );

  return mintPubkey.toBase58();
}

// Function to mint tokens
export async function mintTokens( mintaddress , receiveraddress , amount) {
  const connection = new Connection(clusterApiUrl("devnet"));

  // Replace these with your fee payer and authority keypairs
  const feePayer = Keypair.fromSecretKey(bs58.decode(process.env.NEXT_PUBLIC_SECRET_KEY));
  const mintAuthority = Keypair.fromSecretKey(bs58.decode(process.env.NEXT_PUBLIC_SECRET_KEY));

  const mintpubk = new PublicKey(mintaddress); // "Dz5rcnmA9zy6dAbDvnadBHxn9vbXqM1bEKt2xekcoQ6t"
  const reciever = new PublicKey(receiveraddress); // "4hWw4iKFjgbM2CrWmMCtomX4zaaugJiQWQxDSaYictT1"

  const ata = await getOrCreateAssociatedTokenAccount(
    connection,
    feePayer,
    mintpubk,
    feePayer.publicKey,
    false,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID);

  console.log(ata,"ata",at , at.address);
  let tx = new Transaction().add(
    createMintToCheckedInstruction(
      mintpubk, // mint
      ata.address, // receiver (should be a token account)
      feePayer.publicKey, // mint authority
      amount, // 100e8 amount. if your decimals is 8, you mint 10^8 for 1 token.
      8 // decimals
      // [signer1, signer2 ...], // only multisig account will use
    )
  );

  const send = await connection.sendTransaction(tx, [
    feePayer,
    mintAuthority/* fee payer + mint authority */,
  ], { skipPreflight: true }); // Set skipPreflight to true

  console.log(send);
}
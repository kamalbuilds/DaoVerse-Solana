// utils/minttoken.js
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
  } from "@solana/spl-token";
  import * as bs58 from "bs58";
  
  // Function to create a new token mint
  export async function createTokenMint() {
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
  export async function mintTokens(mintPubkey, receiverPubkey) {
    const connection = new Connection(clusterApiUrl("devnet"));
  
    // Replace these with your fee payer and authority keypairs
    const feePayer = Keypair.fromSecretKey(bs58.decode(process.env.NEXT_PUBLIC_SECRET_KEY));
    const mintAuthority = Keypair.fromSecretKey(bs58.decode(process.env.NEXT_PUBLIC_SECRET_KEY));
  
    const mintpubk = new PublicKey(mintPubkey); // "5UhNnBTHPN5YBFQFTaJR9mZ4Ls9FXk9TsNquVpXifL8D"
    const reciever = new PublicKey(receiverPubkey); // "ApHZ4DtDyVPYP84XnPgTHpYTqEg5o67UmNF9jfU3iX7"
    // 1) use build-in function
    let txhash = await mintToChecked(
      connection,
      feePayer,
      mintpubk,
      reciever,
      mintAuthority,
      1e8, // amount
      8 // decimals
    );
  
    return txhash;
  }
  
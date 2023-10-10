
import * as multisig from "@sqds/multisig";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { connection } from "../pages/api/utils/constants";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { SystemProgram } from "@solana/web3.js";
// Function to create a new multisig


// Function to create a transaction proposal
// async function createTransactionProposal() {
//   const creator = Keypair.generate();
//   const [vaultPda, vaultBump] = multisig.getVaultPda({
//     multisigPda,
//     index: 0,
//   });

//   const instruction = SystemProgram.transfer(
//     vaultPda,
//     creator.publicKey,
//     1 * LAMPORTS_PER_SOL
//   );

//   const transferMessage = new TransactionMessage({
//     payerKey: vaultPda,
//     recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
//     instructions: [instruction],
//   });

//   const transactionIndex = 1n;
//   const signature1 = await multisig.rpc.vaultTransactionCreate({
//     connection,
//     feePayer: creator,
//     multisigPda,
//     transactionIndex,
//     creator: creator.publicKey,
//     vaultIndex: 0,
//     ephemeralSigners: 0,
//     transactionMessage: transferMessage,
//     memo: "Transfer 0.1 SOL to creator",
//   });

//   console.log("Transaction created: ", signature1);

//   // Add code to create a proposal here
// }

// // Function to vote on a proposal
// async function voteOnProposal() {
//   const creator = Keypair.generate();
//   const secondMember = Keypair.generate();

//   const transactionIndex = 1n;

//   multisig.rpc.proposalApprove({
//     connection,
//     feePayer: creator,
//     multisigPda,
//     transactionIndex,
//     member: creator.publicKey,
//   });

//   multisig.rpc.proposalApprove({
//     connection,
//     feePayer: creator,
//     multisigPda,
//     transactionIndex,
//     member: secondMember.publicKey,
//     signers: [creator, secondMember],
//   });
// }

// // Function to execute a proposal
// async function executeProposal() {
//   const creator = Keypair.generate();
//   const transactionIndex = 1n;

//   const [proposalPda] = multisig.getProposalPda({
//     multisigPda,
//     transactionIndex,
//   });

//   const signature = await multisig.rpc.vaultTransactionExecute({
//     connection,
//     feePayer: creator,
//     multisigPda,
//     transactionIndex,
//     member: creator.publicKey,
//     signers: [creator],
//   });

//   console.log("Transaction executed: ", signature);
// }



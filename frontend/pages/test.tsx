
// @ts-nocheck
import { useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { createTokenMint } from "../utils/minttoken";
import { SystemProgram } from "@solana/web3.js";
// statrt 
// @ts-nocheck
import * as multisig from "@sqds/multisig";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { connection } from "../pages/api/utils/constants";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import createMessage from "./api/createMessage";
import updateMessage from "./api/updateMessage";
// import { Permissions , Permission } from "@sqds/multisig/lib/types";
// import { retrieveMultisig } from "../utils/retrievemultisig";
// Function to create a new multisig
// async function createMultisig() {
//   const creator = Keypair.fromSecretKey(bs58.decode(process.env.NEXT_PUBLIC_SECRET_KEY));
//   const secondMember = Keypair.generate();

//   const createKey = Keypair.generate();
//   const publiccreateKey = createKey.publicKey;
//   console.log(publiccreateKey.toBase58() , "publiccreateKey" , createKey.secretKey.toString(), "secretkey");
//   const [multisigPda] = multisig.getMultisigPda({
//     createKey : publiccreateKey,
//   });

//   console.log("multisigpda" , multisigPda.toBase58());
//   console.log(createKey , "createkey" , multisigPda , "multisigPda" , creator , "creator" , secondMember , "secondMember"
//   )

//   const signature = await multisig.rpc.multisigCreate({
//     connection,
//     createKey,
//     creator,
//     multisigPda,
//     configAuthority: null,
//     timeLock: 0,
//     members: [
//       {
//         key: creator.publicKey,
//         permissions: Permissions.all(),
//       },
//       {
//         key: secondMember.publicKey,
//         permissions: Permissions.fromPermissions([Permission.Vote]),
//       },
//     ],
//     threshold: 2,
//   });

//   console.log("Multisig created: ", signature);
// }

// // Function to create a transaction proposal
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

// // // Function to vote on a proposal
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

// // // Function to execute a proposal
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

// retrieveMultisig("4XApq8oGapFGtELNounHtUTQDiuDY1tRZNFydSqAfcNZ");
// end

// async function lo(){
//   const createtok = await createTokenMint();
//   console.log(createtok,"cere")
//   // mintTokens(createtok,"ApHZ4DtDyVPYP84XnPgTHpYTqEg5o67UmNF9jfU3iX7" )
// }
// lo();
// mintTokens();

export default function Home() {
  const [messageAccount, _] = useState(Keypair.generate());
  const [message, setMessage] = useState("");
  const [messageAuthor, setMessageAuthor] = useState("");
  const [messageTime, setMessageTime] = useState(0);
  const [inputtedMessage, setInputtedMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const wallet = useAnchorWallet();

  return (
    <div>

      <div >
        <h1>
          Hello Solana ✨
        </h1>

        {wallet && (
          <div>
            <input
              placeholder="Write Your Message!"
              onChange={(e) => setInputtedMessage(e.target.value)}
              value={inputtedMessage}
            />
            <button
              disabled={!inputtedMessage}
              onClick={async () => {
                setLoading(true);
                const deployedMessage = message
                  ? await updateMessage(inputtedMessage, wallet, messageAccount)
                  : await createMessage(
                      inputtedMessage,
                      wallet,
                      messageAccount
                    );

                if (deployedMessage) {
                  setMessage(deployedMessage.content.toString());
                  setMessageAuthor(deployedMessage.author.toString());
                  setMessageTime(deployedMessage.timestamp.toNumber() * 1000);
                  setInputtedMessage("");
                }
                setLoading(false);
              }}
            >
              {message ? "Update the Message!" : "Create a Message!"}
            </button>
          </div>
        )}

        {loading ? (
          <div >
            <h2> Loading</h2>
            <div />
          </div>
        ) : (
          wallet &&
          message && (
            <div>
              <h2>Current Message: {message}</h2>
              <h2>
                Message Author: {messageAuthor.substring(0, 4)}
                ...
                {messageAuthor.slice(-4)}
              </h2>
              <h2>Time Published: {new Date(messageTime).toLocaleString()}</h2>
            </div>
          )
        )}
      </div>
      {/* <button onClick={createMultisig}>Create Multisig</button> */}
    </div>
  );
}

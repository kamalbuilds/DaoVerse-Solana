import { useState } from "react"; // Import useState
import { Button } from "../primitives/Button";
import { Container } from "../primitives/Container";
import { Input } from "../primitives/Input";
import { Tooltip } from "@radix-ui/react-tooltip";
import { useWallet } from "@solana/wallet-adapter-react";
import * as multisig from "@sqds/multisig";
import { Keypair, LAMPORTS_PER_SOL, sendAndConfirmRawTransaction } from "@solana/web3.js";
import { connection } from "./api/utils/constants";
// Function to create a new multisig
import { Wallet } from "@project-serum/anchor";
import { PublicKey , sendAndConfirmTransaction } from "@solana/web3.js";
import { Transaction } from "@solana/web3.js";
import { retrieveMultisig } from "../utils/retrievemultisig";
import { toast} from "react-hot-toast";

export default function Index() {
  const { Permissions } = multisig.types; 
  const { multisigCreate } = multisig.instructions;
  const wallet = useWallet();
  const [formData, setFormData] = useState({
    daoName: "",
    nftCollectionAddress: "",
    walletAddresses: "",
    approvalThreshold: "",
  });
  
  const handleInputChange = (e : any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // @ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    toast.success("Creating DAO");
    const latestBlockhash = await connection.getLatestBlockhash();
    const blockhash = latestBlockhash.blockhash ; // Provide the blockhash
    const createKey = Keypair.generate();
    const pkey = createKey.publicKey;
    toast.success(pkey.toBase58());
    const [multisigPda] = multisig.getMultisigPda({
      createKey : pkey,
    });
    const creator = wallet.publicKey; // Provide the creator's public key
    const c = new PublicKey("4hWw4iKFjgbM2CrWmMCtomX4zaaugJiQWQxDSaYictT1");
    const configAuthority = null; // Provide the configAuthority's public key if applicable
    const threshold = parseInt(formData.approvalThreshold, 10);
    const members = [ {
      // Members Public Key
      key: creator,
      // Members permissions inside the multisig
      permissions: Permissions.all(),
   } ]; // Convert wallet addresses from formData.walletAddresses into an array of Members
    const timeLock = 0; 
  
    console.log(     
      "blockhash",
      blockhash,
      "createkey pkey",
      pkey,
      "creator",
      creator,
      "multisigPda",
      multisigPda,
      "configAuthority",
      configAuthority,
      "threshold ",   
      threshold,
      "timelock",
      timeLock,
      formData.daoName);
    // Create the unsigned transaction
    
    const unsignedTransaction = multisigCreate({
      createKey: pkey,
      creator: c,
      multisigPda,
      configAuthority: configAuthority,
      threshold : 1,
      members : members as any,
      timeLock,
      memo: formData.daoName, // Use the DAO name as the memo, or specify another memo
    });
    
    const pkeyinstring = pkey.toBase58();

    console.log(unsignedTransaction , "unsignedTransaction" , pkeyinstring , "pkeyinstring" , c , "c" , creator , "creator" , multisigPda , "multisigPda" , configAuthority , "configAuthority" , threshold , "threshold" , members , "members" , timeLock , "timeLock" , formData.daoName , "formData.daoName")

    // sign your transaction with the required `Signers`
      
        // Sign the transaction with the creator's key and wallet
        const transaction = new Transaction().add(unsignedTransaction);
        transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
        const signedbycreatekey = transaction.sign(createKey);
        // @ts-ignore
        const signedTransaction = await wallet.signTransaction(transaction);
    
        console.log(signedTransaction , "signedTransaction", signedbycreatekey , transaction);
        // Create a transaction object and add the signed transaction
    
        // Send the transaction to the network
        try {
          const sig = await sendAndConfirmRawTransaction(connection, signedTransaction.serialize());
          // const signature = await sendAndConfirmTransaction(connection, transaction, [wallet.publicKey, createKey]);
          console.log("Transaction confirmed. Signature:", sig);
        } catch (error) {
          console.error("Error sending transaction:", error);
        }
      };
  
  return (
    <>
      <Container className="py-6">
        <form onSubmit={handleSubmit}>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Let's get started.</h1>
            <p className="text-gray-500">
              What is the name of your DAO? It's best to choose a descriptive, memorable name for you and your members.
            </p>
            <Input
              type="text"
              name="daoName"
              placeholder="DAO Name"
              className="mt-4"
              value={formData.daoName}
              onChange={handleInputChange}
            />
          </div>

          <div className="text-center mt-12">
            <h1 className="text-3xl font-bold mb-4">NFT Collection Address</h1>
            <p className="text-gray-500">should be metaplex supported</p>
            <Input
              type="text"
              name="nftCollectionAddress"
              placeholder="9WzDXwBjfiwHjdi..."
              className="mt-4"
              value={formData.nftCollectionAddress}
              onChange={handleInputChange}
            />
          </div>

          <div className="text-center mt-12">
            <h1 className="text-3xl font-bold mb-4">Lets setup the Permission for your Members</h1>
            <p className="text-gray-500">Add Solana wallet addresses, separated by a comma or line-break.</p>
            <Input
              type="text"
              name="walletAddresses"
              placeholder="9WzDXwBjf8iwHjdi..."
              className="mt-4"
              value={formData.walletAddresses}
              onChange={handleInputChange}
            />
          </div>

          <div className="text-center mt-12">
            <h1 className="text-3xl font-bold mb-4">Next, set your Dao's approval threshold.</h1>
            <p className="text-gray-500">Adjust the percentage to determine votes needed to pass a proposal.</p>
            <Input
              type="number"
              name="approvalThreshold"
              placeholder="60"
              className="mt-4"
              value={formData.approvalThreshold}
              onChange={handleInputChange}
            />
          </div>

          <div className="text-center mt-12">
            <Button type="submit" className="px-8 py-2 bg-blue-500 text-white" >
              Create DAO
            </Button>
          </div>

        </form>
        <Button className="px-8 py-2 bg-blue-500 text-white my-4" onClick={async () => retrieveMultisig("Aw1osme4xdCD2wtkypMCtnbkoBH67jebuyu83dXKk6uZ")} >
              Retrieve DAO
        </Button>
      </Container>
    </>
  );
}

import { GetServerSideProps } from "next";
import { DASHBOARD_URL } from "../constants";
import { MarketingLayout } from "../layouts/Marketing";
import * as Server from "../lib/server";
import { useState } from "react"; // Import useState
import { Button } from "../primitives/Button";
import { Container } from "../primitives/Container";
import { Input } from "../primitives/Input";
import { Tooltip } from "@radix-ui/react-tooltip";
import { useWallet } from "@solana/wallet-adapter-react";
import * as multisig from "@sqds/multisig";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { connection } from "../pages/api/utils/constants";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
// Function to create a new multisig
import { Permissions , Permission  } from "@sqds/multisig/lib/types";
import { Wallet } from "@project-serum/anchor";

export default function Index() {
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

  };

  async function createMultisig() {
    // @ts-ignore
    const creator = Keypair.fromSecretKey(bs58.decode(process.env.NEXT_PUBLIC_SECRET_KEY));
    console.log("wallet the creator", creator);
    const secondMember = Keypair.generate();
  
    const createKey = Keypair.generate();
    const publiccreatekey= createKey.publicKey;
    const [multisigPda] = multisig.getMultisigPda({
      createKey : publiccreatekey,
    });
    
    const signature = await multisig.rpc.multisigCreate({
      connection,
      createKey,
      creator,
      multisigPda,
      configAuthority: null,
      timeLock: 0,
      members: [
        {
          key: creator.publicKey,
          permissions: Permissions.all(),
        }
      ],
      threshold: 1,
    });
  
    console.log("Multisig created: ", signature);
  }

  return (
    <MarketingLayout>
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
            <Button type="submit" className="px-8 py-2 bg-blue-500 text-white" onClick={() => createMultisig()}>
              Create DAO
            </Button>
          </div>
        </form>
      </Container>
    </MarketingLayout>
  );
}

// If logged in, redirect to dashboard
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await Server.getServerSession(req, res);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: DASHBOARD_URL,
      },
    };
  }

  return {
    props: {},
  };
};


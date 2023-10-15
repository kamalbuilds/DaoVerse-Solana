import { GetServerSideProps } from "next";
import { DASHBOARD_URL } from "../constants";
import { MarketingLayout } from "../layouts/Marketing";
import * as Server from "../lib/server";
import { useState } from "react"; // Import useState
import { Button } from "../primitives/Button";
import { Container } from "../primitives/Container";
import { Input } from "../primitives/Input";
import { Tooltip } from "@radix-ui/react-tooltip";
import { createMultisig } from "../utils/createmultisig";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Index() {
  const wallet = useWallet();
  const [formData, setFormData] = useState({
    daoName: "",
    nftCollectionAddress: "",
    walletAddresses: "",
    approvalThreshold: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  };

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
            <Button type="submit" className="px-8 py-2 bg-blue-500 text-white" onClick={() => createMultisig(wallet)}>
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


import { GetServerSideProps } from "next";
import { DASHBOARD_URL } from "../constants";
import { MarketingLayout } from "../layouts/Marketing";
import * as Server from "../lib/server";
import { Button } from "../primitives/Button";
import { Container } from "../primitives/Container";
import { Input } from "../primitives/Input";
import { Tooltip } from "@radix-ui/react-tooltip";

export default function Index() {
  return (
    <MarketingLayout>
      <Container className="py-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Let's get started.</h1>
          <p className="text-gray-500">
            What is the name of your DAO? It's best to choose a descriptive, memorable name for you and your members.
          </p>
          <Input placeholder="Your Wallet Name" className="mt-4" />
        </div>

        <div className="text-center mt-12">
          <h1 className="text-3xl font-bold mb-4">Next, invite members with their Solana Wallet Address.</h1>
          <p className="text-gray-500">Add Solana wallet addresses, separated by a comma or line-break.</p>
          <Input placeholder="9WzDXwBjf8iwHjdi..." className="mt-4" />
        </div>

        <div className="text-center mt-12">
          <h1 className="text-3xl font-bold mb-4">Next, set your Dao's approval threshold.</h1>
          <p className="text-gray-500">Adjust the percentage to determine votes needed to pass a proposal.</p>
          <Input placeholder="60" className="mt-4" />
        </div>

        <div className="text-center mt-12">
          <Button onClick={() => null} className="px-8 py-2 bg-blue-500 text-white">
            Create DAO
          </Button>
        </div>
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

// @ts-nocheck
import { GetServerSideProps } from "next";
import { DASHBOARD_URL } from "../constants";
import * as Server from "../lib/server";
import { useState } from "react";
import { Button } from "../primitives/Button";
import { Container } from "../primitives/Container";
import { Input } from "../primitives/Input";
import { Tooltip } from "@radix-ui/react-tooltip";
import { retrieveMultisig } from "../utils/retrievemultisig";

export default function Index() {
  const [createkey, setCreatekey] = useState("");
  const [formRows, setFormRows] = useState([
    {
      walletName: "",
      permission: "",
    },
  ]);

  const addFormRow = () => {
    setFormRows([...formRows, { walletName: "", permission: "" }]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRows = [...formRows];
    updatedRows[index][name] = value;
    setFormRows(updatedRows);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formRows);
  };

  return (
      <Container className="py-6">
        <Input type="text" name="createkey" placeholder="Your CreateKey" className="mt-4" value={createkey} onChange={(e) => setCreatekey(e.target.value)} />
        <Button className="px-8 py-2 bg-blue-500 text-white my-4" onClick={async () => retrieveMultisig(createkey)} >
        {/* Aw1osme4xdCD2wtkypMCtnbkoBH67jebuyu83dXKk6uZ */}
          Retrieve DAO
        </Button>
        <form onSubmit={handleSubmit}>
          {formRows.map((row, index) => (
            <div key={index} className="text-center mt-12">
              <h1 className="text-3xl font-bold mb-4">Manage Members Easily</h1>
              <p className="text-gray-500">
                Wallet address of the person to assign the role ?
              </p>
              <Input
                type="text"
                name="walletName"
                placeholder="Wallet Address"
                className="mt-4"
                value={row.walletName}
                onChange={(e) => handleInputChange(e, index)}
              />

              <h1 className="text-3xl font-bold mt-4 mb-4">Permission that you want to assign</h1>
              <p className="text-gray-500">Should be metaplex supported.</p>
              <Input
                type="text"
                name="permission"
                placeholder="Vote"
                className="mt-4"
                value={row.permission}
                onChange={(e) => handleInputChange(e, index)}
              />
            </div>
          ))}

          <div className="text-center mt-12">
            <Button onClick={addFormRow} className="px-8 py-2 bg-blue-500 text-white">
              + Add Another Row
            </Button>
          </div>

          <div className="text-center mt-12">
            <Button type="submit" className="px-8 py-2 bg-blue-500 text-white">
              Set Permissions
            </Button>
          </div>
        </form>
      </Container>
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
